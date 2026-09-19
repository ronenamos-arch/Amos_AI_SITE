#!/usr/bin/env python3
"""
SEO & GEO (Generative Engine Optimization) Auditor for ronenamoscpa.co.il
Runs fast, deterministic checks at 0 token cost before publishing.
"""

import argparse
import glob
import json
import os
import re
import sys
import urllib.parse
from dataclasses import dataclass, field
from typing import List, Optional

SITE_DOMAIN = "https://www.ronenamoscpa.co.il"
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LLMS_TXT_PATH = os.path.join(REPO_ROOT, "public", "llms.txt")
POSTS_DIR = os.path.join(REPO_ROOT, "content", "posts")


@dataclass
class AuditResult:
    target: str
    title: str = ""
    slug: str = ""
    word_count: int = 0
    passed: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)
    errors: List[str] = field(default_factory=list)
    geo_score: int = 100
    seo_score: int = 100

    @property
    def total_score(self) -> int:
        return int((self.seo_score * 0.5) + (self.geo_score * 0.5))


def parse_frontmatter(content: str):
    """Extract YAML frontmatter and markdown body."""
    meta = {}
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            raw_meta = parts[1]
            body = parts[2]
            for line in raw_meta.split("\n"):
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if ":" in line:
                    k, v = line.split(":", 1)
                    k = k.strip()
                    v = v.strip().strip('"').strip("'")
                    meta[k] = v
    return meta, body


def audit_post(file_path: str, target_keyword: Optional[str] = None) -> AuditResult:
    filename = os.path.basename(file_path)
    slug = os.path.splitext(filename)[0]
    
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()

    meta, body = parse_frontmatter(content)
    title = meta.get("title") or meta.get("meta_title") or slug
    excerpt = meta.get("excerpt") or meta.get("description") or ""

    result = AuditResult(target=filename, title=title, slug=slug)

    # 1. Word Count
    words = re.findall(r'[\w\u0590-\u05FF]+', body)
    result.word_count = len(words)
    if result.word_count < 300:
        result.errors.append(f"Content is very short ({result.word_count} words). Minimum 500+ recommended.")
        result.seo_score -= 20
    elif result.word_count < 600:
        result.warnings.append(f"Content length is {result.word_count} words (600+ recommended for in-depth authority).")
        result.seo_score -= 5
    else:
        result.passed.append(f"Comprehensive length ({result.word_count} words).")

    # 2. Title Checks (SEO)
    title_len = len(title)
    if title_len > 65:
        result.warnings.append(f"Title is {title_len} chars (recommend <= 60 chars to prevent SERP truncation).")
        result.seo_score -= 10
    elif title_len < 20:
        result.warnings.append(f"Title is very short ({title_len} chars).")
        result.seo_score -= 5
    else:
        result.passed.append(f"Title length is optimal ({title_len} chars).")

    if "| רונן עמוס" in title:
        result.warnings.append("Title manually contains '| רונן עמוס'. The layout template may duplicate this suffix.")
        result.seo_score -= 5

    # 3. Target Keyword Analysis (if provided or extracted from title)
    kw = target_keyword
    if not kw and title:
        # Pick primary 2-3 words from title as fallback keyword candidate
        title_words = [w for w in title.split() if len(w) > 2 and w not in ["את", "של", "על", "עם", "כיצד", "איך", "למה", "ב-5", "דקות"]]
        if len(title_words) >= 2:
            kw = " ".join(title_words[:2])

    if kw:
        kw_clean = kw.strip().lower()
        body_lower = body.lower()
        title_lower = title.lower()

        # Keyword in Title
        if kw_clean in title_lower:
            result.passed.append(f"Target keyword '{kw}' found in Title.")
        else:
            result.warnings.append(f"Target keyword '{kw}' is NOT in Title.")
            result.seo_score -= 10

        # Keyword in first 150 words
        first_150_words = " ".join(words[:150]).lower()
        if kw_clean in first_150_words:
            result.passed.append(f"Target keyword '{kw}' found in first 150 words.")
        else:
            result.warnings.append(f"Target keyword '{kw}' missing from introductory paragraph (first 150 words).")
            result.seo_score -= 10

        # Keyword in Headings
        h2_headings = re.findall(r'^##\s+(.+)$', body, re.MULTILINE)
        if any(kw_clean in h.lower() for h in h2_headings):
            result.passed.append(f"Target keyword '{kw}' found in H2 heading.")
        else:
            result.warnings.append(f"Consider including target keyword '{kw}' or variation in at least one H2 heading.")
            result.seo_score -= 5

    # 4. Meta Excerpt / Description
    excerpt_clean = re.sub(r'[=\-#]+', '', excerpt).strip()
    if not excerpt_clean:
        result.errors.append("Missing meta excerpt / description.")
        result.seo_score -= 15
    elif len(excerpt_clean) < 80:
        result.warnings.append(f"Excerpt is short ({len(excerpt_clean)} chars). Aim for 120-160 chars.")
        result.seo_score -= 5
    elif len(excerpt_clean) > 175:
        result.warnings.append(f"Excerpt is {len(excerpt_clean)} chars (will truncate on Google SERP; target 120-160).")
        result.seo_score -= 5
    else:
        result.passed.append(f"Excerpt length is optimal ({len(excerpt_clean)} chars).")

    if "====" in excerpt or "----" in excerpt:
        result.warnings.append("Excerpt contains raw markdown underline artifact ('===='). Clean it in frontmatter.")
        result.seo_score -= 5

    # 5. Heading Structure
    h1_in_body = re.findall(r'^#\s+(.+)$', body, re.MULTILINE)
    if len(h1_in_body) > 1:
        result.errors.append(f"Multiple H1 tags ({len(h1_in_body)}) found in body. Use only one H1 per page.")
        result.seo_score -= 15
    elif len(h1_in_body) == 0 and not meta.get("title"):
        result.errors.append("No H1 heading found in frontmatter or body.")
        result.seo_score -= 15
    else:
        result.passed.append("Single H1 hierarchy validated.")

    # 6. Image Alt Tags
    images = re.findall(r'!\[(.*?)\]\((.*?)\)', body)
    if images:
        empty_alts = [img[1] for img in images if not img[0].strip()]
        if empty_alts:
            result.warnings.append(f"{len(empty_alts)} of {len(images)} images have empty alt text.")
            result.seo_score -= 10
        else:
            result.passed.append(f"All {len(images)} images have descriptive alt text.")

    # 7. Internal Links
    internal_links = re.findall(r'\[.*?\]\((/(?:services|courses|guides|blog|about|contact)[^\)]*)\)', body)
    if len(internal_links) >= 2:
        result.passed.append(f"Strong internal linking ({len(internal_links)} links to services/courses/guides/blog).")
    elif len(internal_links) == 1:
        result.warnings.append("Only 1 internal link found. Recommend 2-3 links to relevant services/courses/guides.")
        result.seo_score -= 5
    else:
        result.warnings.append("No internal links found in body (e.g. /services, /courses/ai-mastery, /guides).")
        result.seo_score -= 10

    # ==================== GEO & CITABILITY CHECKS ====================
    # 8. Zero-Click / Definitional Block (LLMs love direct definitions in the first 2 paragraphs)
    intro_text = "\n".join(body.split("\n\n")[:3])
    has_definition = any(marker in intro_text for marker in [
        "הוא", "היא", "הם", "מוגדר", "המשמעות", "הגדרה", "היתרון המרכזי", "במדריך זה", "שלבים", "כלל", "is a", "refers to"
    ])
    if has_definition:
        result.passed.append("GEO: Direct definition / zero-click summary found in opening paragraphs.")
    else:
        result.warnings.append("GEO: Opening paragraphs lack a clear definition or structured summary for AI citation.")
        result.geo_score -= 15

    # 9. Structured Lists / Bullet Points (High citation probability in ChatGPT/Gemini/Perplexity)
    bullet_items = re.findall(r'^\s*[-*•]\s+.+$', body, re.MULTILINE)
    numbered_items = re.findall(r'^\s*\d+\.\s+.+$', body, re.MULTILINE)
    total_list_items = len(bullet_items) + len(numbered_items)
    if total_list_items >= 5:
        result.passed.append(f"GEO: High structured list density ({total_list_items} bullet/numbered items).")
    elif total_list_items >= 1:
        result.passed.append(f"GEO: Has structured lists ({total_list_items} items).")
    else:
        result.warnings.append("GEO: No bullet points or numbered lists found. LLMs heavily prefer structured lists for citations.")
        result.geo_score -= 15

    # 10. Quantitative Data & Statistics Density (LLMs prioritize citing specific facts & metrics)
    numbers_and_stats = re.findall(r'(?:\d+(?:\.\d+)?%|\b\d{1,3}(?:,\d{3})*\s*(?:ש"ח|₪|\$|שעות|דקות|ימים|חודשים|שבועות))', body)
    if len(numbers_and_stats) >= 3:
        result.passed.append(f"GEO: Strong data/metrics density ({len(numbers_and_stats)} stats/figures for AI citation).")
    else:
        result.warnings.append("GEO: Low statistics/metrics density. Adding concrete metrics (e.g. 70%, 15 שעות, 10,000 ₪) increases AI citation rate.")
        result.geo_score -= 10

    # 11. E-E-A-T Author & Credential Authority
    has_eeat = any(term in (content + " " + title) for term in [
        "רונן עמוס", "רואה חשבון", "CPA", "Power BI", "FP&A", "סמנכ\"ל כספים", "CFO", "מומחה"
    ])
    if has_eeat:
        result.passed.append("GEO: E-E-A-T credentials and author authority signals verified.")
    else:
        result.warnings.append("GEO: Missing explicit author/CPA authority references in text.")
        result.geo_score -= 10

    # 12. llms.txt Sync Check
    if os.path.exists(LLMS_TXT_PATH):
        with open(LLMS_TXT_PATH, "r", encoding="utf-8", errors="replace") as f_llm:
            llms_content = f_llm.read()
        encoded_slug = urllib.parse.quote(slug)
        if slug in llms_content or encoded_slug in llms_content:
            result.passed.append("GEO: Article registered in public/llms.txt.")
        else:
            result.warnings.append(f"GEO: Slug '{slug}' is NOT yet registered in public/llms.txt.")
            result.geo_score -= 10
    else:
        result.warnings.append("public/llms.txt not found.")

    # Clamp scores
    result.seo_score = max(0, min(100, result.seo_score))
    result.geo_score = max(0, min(100, result.geo_score))

    return result


def sync_to_llms_txt(title: str, slug: str, summary: str):
    """Safely append or update an entry in public/llms.txt."""
    if not os.path.exists(LLMS_TXT_PATH):
        print(f"Error: {LLMS_TXT_PATH} does not exist.")
        return False

    encoded_slug = urllib.parse.quote(slug)
    with open(LLMS_TXT_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    if slug in content or encoded_slug in content:
        print(f"✓ '{slug}' already exists in public/llms.txt")
        return True

    new_entry = f"- [{title}]({SITE_DOMAIN}/blog/{encoded_slug}): {summary.strip()}\n"
    
    # Place under '## Blog — Featured Articles' or at end
    if "## Blog — Featured Articles" in content:
        parts = content.split("## Blog — Featured Articles", 1)
        updated = parts[0] + "## Blog — Featured Articles\n\n" + new_entry + parts[1].lstrip("\n")
    else:
        updated = content + "\n\n## Blog\n\n" + new_entry

    with open(LLMS_TXT_PATH, "w", encoding="utf-8") as f:
        f.write(updated)

    print(f"✓ Added '{title}' to public/llms.txt")
    return True


def print_cli_report(res: AuditResult, compact: bool = False):
    if compact:
        status_icon = "🟢" if res.total_score >= 85 else ("🟡" if res.total_score >= 70 else "🔴")
        print(f"{status_icon} [{res.target}] Total: {res.total_score}/100 (SEO: {res.seo_score}, GEO: {res.geo_score}) | {len(res.errors)} Errors, {len(res.warnings)} Warns")
        for err in res.errors:
            print(f"   ❌ ERROR: {err}")
        for warn in res.warnings:
            print(f"   ⚠️ WARN: {warn}")
        return

    print("\n" + "=" * 70)
    print(f"🔍 SEO & GEO AUDIT REPORT: {res.target}")
    print(f"📌 Title: {res.title}")
    print(f"📊 Overall Score: {res.total_score}/100  |  Traditional SEO: {res.seo_score}/100  |  GEO (AI Search): {res.geo_score}/100")
    print("=" * 70)

    if res.errors:
        print("\n❌ CRITICAL ISSUES (Must fix before publish):")
        for err in res.errors:
            print(f"  • {err}")

    if res.warnings:
        print("\n⚠️ IMPROVEMENT OPPORTUNITIES (GEO & SEO Optimization):")
        for warn in res.warnings:
            print(f"  • {warn}")

    if res.passed:
        print("\n✅ PASSED CHECKS:")
        for ok in res.passed:
            print(f"  • {ok}")

    print("\n" + "-" * 70)
    if res.total_score >= 85 and not res.errors:
        print("🚀 STATUS: READY TO PUBLISH WITH HIGH RANKING POTENTIAL")
    else:
        print("🔧 STATUS: ACTION RECOMMENDED BEFORE PUBLISHING")
    print("-" * 70 + "\n")


def main():
    parser = argparse.ArgumentParser(description="Deterministic SEO & GEO Auditor for ronenamoscpa.co.il")
    parser.add_argument("path", nargs="?", help="Path to markdown file or article to audit")
    parser.add_argument("--all", action="store_true", help="Audit all posts in content/posts/")
    parser.add_argument("--keyword", help="Target Hebrew focus keyword (e.g. 'רואה חשבון AI')")
    parser.add_argument("--compact", action="store_true", help="Compact 1-line output for minimal token consumption")
    parser.add_argument("--json", action="store_true", help="Output raw JSON format")
    parser.add_argument("--sync-llms", action="store_true", help="Auto-add audited post to public/llms.txt if missing")

    args = parser.parse_args()

    if args.all:
        files = glob.glob(os.path.join(POSTS_DIR, "*.md"))
        results = [audit_post(f) for f in files]
        if args.json:
            print(json.dumps([r.__dict__ for r in results], indent=2, ensure_ascii=False))
            return
        
        avg_score = sum(r.total_score for r in results) // max(1, len(results))
        print(f"\nAudited {len(results)} posts. Average Total Score: {avg_score}/100\n")
        for r in sorted(results, key=lambda x: x.total_score):
            print_cli_report(r, compact=True)
        return

    if not args.path:
        parser.print_help()
        sys.exit(1)

    target_path = args.path
    if not os.path.isabs(target_path):
        if not os.path.exists(target_path) and os.path.exists(os.path.join(POSTS_DIR, target_path)):
            target_path = os.path.join(POSTS_DIR, target_path)

    if not os.path.exists(target_path):
        print(f"Error: File not found at {target_path}", file=sys.stderr)
        sys.exit(1)

    result = audit_post(target_path, target_keyword=args.keyword)

    if args.sync_llms and result.title and result.slug:
        meta, _ = parse_frontmatter(open(target_path, "r", encoding="utf-8").read())
        desc = meta.get("excerpt") or meta.get("description") or result.title
        sync_to_llms_txt(result.title, result.slug, desc)

    if args.json:
        print(json.dumps(result.__dict__, indent=2, ensure_ascii=False))
    else:
        print_cli_report(result, compact=args.compact)


if __name__ == "__main__":
    main()
