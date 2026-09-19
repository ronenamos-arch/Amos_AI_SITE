#!/usr/bin/env python3
"""
Google Search Console (GSC) Client Utility for ronenamoscpa.co.il
Uses service account credentials from gsc-credentials.json.
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from google.oauth2 import service_account
from googleapiclient.discovery import build

DEFAULT_CREDS_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "gsc-credentials.json")
DEFAULT_SITE_URL = "sc-domain:ronenamoscpa.co.il"
SCOPES = ["https://www.googleapis.com/auth/webmasters"]


def get_service(creds_path: str = DEFAULT_CREDS_PATH):
    if not os.path.exists(creds_path):
        raise FileNotFoundError(f"Credentials file not found at: {creds_path}")
    creds = service_account.Credentials.from_service_account_file(creds_path, scopes=SCOPES)
    return build("searchconsole", "v1", credentials=creds)


def cmd_sites(service):
    """List all sites managed by this service account."""
    sites = service.sites().list().execute()
    entries = sites.get("siteEntry", [])
    print(f"\n--- Managed Sites ({len(entries)}) ---")
    for s in entries:
        print(f"  • {s.get('siteUrl')} (Permission: {s.get('permissionLevel')})")
    print()


def cmd_sitemaps(service, site_url: str):
    """List submitted sitemaps."""
    sitemaps = service.sitemaps().list(siteUrl=site_url).execute()
    items = sitemaps.get("sitemap", [])
    print(f"\n--- Sitemaps for {site_url} ({len(items)}) ---")
    for sm in items:
        print(f"  Path: {sm.get('path')}")
        print(f"  Last Downloaded: {sm.get('lastDownloaded')}")
        print(f"  Errors: {sm.get('errors', 0)}, Warnings: {sm.get('warnings', 0)}")
        for content in sm.get("contents", []):
            print(f"    - Type: {content.get('type')}, Submitted: {content.get('submitted')}, Indexed: {content.get('indexed')}")
    print()


def cmd_submit_sitemap(service, site_url: str, sitemap_url: str):
    """Submit a sitemap to Search Console."""
    print(f"Submitting sitemap: {sitemap_url} to {site_url}...")
    service.sitemaps().submit(siteUrl=site_url, feedpath=sitemap_url).execute()
    print("Sitemap successfully submitted!")


def cmd_inspect(service, site_url: str, inspection_url: str):
    """Inspect a URL index status."""
    print(f"\n--- Inspecting URL: {inspection_url} ---")
    req = {
        "inspectionUrl": inspection_url,
        "siteUrl": site_url
    }
    res = service.urlInspection().index().inspect(body=req).execute()
    status = res.get("inspectionResult", {}).get("indexStatusResult", {})
    print(f"  Verdict: {status.get('verdict')}")
    print(f"  Coverage State: {status.get('coverageState')}")
    print(f"  Robots.txt: {status.get('robotsTxtState')}")
    print(f"  Indexing Allowed: {status.get('indexingState')}")
    print(f"  Last Crawl Time: {status.get('lastCrawlTime')}")
    print(f"  Page Fetch State: {status.get('pageFetchState')}")
    print(f"  Google Canonical: {status.get('googleCanonical')}")
    print(f"  User Canonical: {status.get('userCanonical')}")
    print(f"  Crawled As: {status.get('crawledAs')}")
    print()


def cmd_performance(service, site_url: str, days: int = 28, dimension: str = "query", limit: int = 10):
    """Query Search Console analytics."""
    end_date = datetime.now(timezone.utc).date() - timedelta(days=2) # GSC has ~2-3 days latency
    start_date = end_date - timedelta(days=days)
    
    start_str = start_date.strftime("%Y-%m-%d")
    end_str = end_date.strftime("%Y-%m-%d")
    
    print(f"\n--- Search Performance ({start_str} to {end_str}) [by {dimension}] ---")
    req = {
        "startDate": start_str,
        "endDate": end_str,
        "dimensions": [dimension],
        "rowLimit": limit
    }
    res = service.searchanalytics().query(siteUrl=site_url, body=req).execute()
    rows = res.get("rows", [])
    if not rows:
        print("  No search data found for the given range.")
        return

    print(f"{'Key':<50} | {'Clicks':<8} | {'Impressions':<12} | {'CTR (%)':<8} | {'Avg Pos':<8}")
    print("-" * 95)
    for r in rows:
        key = r.get("keys", [""])[0]
        clicks = r.get("clicks", 0)
        impressions = r.get("impressions", 0)
        ctr = f"{r.get('ctr', 0) * 100:.1f}%"
        pos = f"{r.get('position', 0):.1f}"
        print(f"{key:<50} | {clicks:<8} | {impressions:<12} | {ctr:<8} | {pos:<8}")
    print()


def main():
    parser = argparse.ArgumentParser(description="Google Search Console CLI for ronenamoscpa.co.il")
    parser.add_argument("--site", default=DEFAULT_SITE_URL, help=f"GSC site URL (default: {DEFAULT_SITE_URL})")
    parser.add_argument("--creds", default=DEFAULT_CREDS_PATH, help="Path to service account json credentials")
    
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    subparsers.add_parser("sites", help="List all accessible sites")
    subparsers.add_parser("sitemaps", help="List submitted sitemaps")
    
    submit_sm = subparsers.add_parser("submit-sitemap", help="Submit a sitemap")
    submit_sm.add_argument("sitemap_url", help="Full sitemap URL (e.g., https://www.ronenamoscpa.co.il/sitemap.xml)")
    
    inspect = subparsers.add_parser("inspect", help="Inspect a specific URL")
    inspect.add_argument("url", help="Full URL to inspect")
    
    queries = subparsers.add_parser("queries", help="List top search queries")
    queries.add_argument("--days", type=int, default=28, help="Number of days to look back (default: 28)")
    queries.add_argument("--limit", type=int, default=15, help="Number of rows to return (default: 15)")
    
    pages = subparsers.add_parser("pages", help="List top pages by traffic")
    pages.add_argument("--days", type=int, default=28, help="Number of days to look back (default: 28)")
    pages.add_argument("--limit", type=int, default=15, help="Number of rows to return (default: 15)")

    args = parser.parse_args()
    if not args.command:
        parser.print_help()
        sys.exit(1)

    try:
        service = get_service(args.creds)
        if args.command == "sites":
            cmd_sites(service)
        elif args.command == "sitemaps":
            cmd_sitemaps(service, args.site)
        elif args.command == "submit-sitemap":
            cmd_submit_sitemap(service, args.site, args.sitemap_url)
        elif args.command == "inspect":
            cmd_inspect(service, args.site, args.url)
        elif args.command == "queries":
            cmd_performance(service, args.site, days=args.days, dimension="query", limit=args.limit)
        elif args.command == "pages":
            cmd_performance(service, args.site, days=args.days, dimension="page", limit=args.limit)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
