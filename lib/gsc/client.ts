import { getValidAccessToken } from '@/lib/gsc/oauth';

interface PerformanceData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SearchQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface CrawlStats {
  totalUrls: number;
  accessibleUrls: number;
  notFoundUrls: number;
  notAccessibleUrls: number;
  notIndexedUrls: number;
  indexedUrls: number;
  lastCrawl: string;
}

const GSC_API_BASE = 'https://www.googleapis.com/webmasters/v3';

export class GSCClient {
  constructor(private userId: string) {}

  private async makeRequest<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const accessToken = await getValidAccessToken(this.userId);
    const url = `${GSC_API_BASE}${path}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`GSC API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get performance data from GSC for a date range
   */
  async getPerformance(
    siteUrl: string,
    startDate: string,
    endDate: string
  ): Promise<PerformanceData> {
    interface GSCResponse {
      rows?: Array<{
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
      }>;
    }

    const data = await this.makeRequest<GSCResponse>(
      `/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: [],
          rowLimit: 1,
        }),
      }
    );

    const row = data.rows?.[0];
    if (!row) {
      return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    }

    return {
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: Number((row.ctr * 100).toFixed(2)), // Convert to percentage
      position: Number(row.position.toFixed(2)),
    };
  }

  /**
   * Get top search queries
   */
  async getTopQueries(
    siteUrl: string,
    startDate: string,
    endDate: string,
    limit: number = 10
  ): Promise<SearchQuery[]> {
    interface GSCQueryResponse {
      rows?: Array<{
        keys: string[];
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
      }>;
    }

    const data = await this.makeRequest<GSCQueryResponse>(
      `/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ['query'],
          rowLimit: limit,
        }),
      }
    );

    return (data.rows || []).map((row) => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: Number((row.ctr * 100).toFixed(2)),
      position: Number(row.position.toFixed(2)),
    }));
  }

  /**
   * Get top pages
   */
  async getTopPages(
    siteUrl: string,
    startDate: string,
    endDate: string,
    limit: number = 10
  ): Promise<
    Array<{
      page: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>
  > {
    interface GSCPageResponse {
      rows?: Array<{
        keys: string[];
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
      }>;
    }

    const data = await this.makeRequest<GSCPageResponse>(
      `/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ['page'],
          rowLimit: limit,
        }),
      }
    );

    return (data.rows || []).map((row) => ({
      page: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: Number((row.ctr * 100).toFixed(2)),
      position: Number(row.position.toFixed(2)),
    }));
  }

  /**
   * Submit a URL for indexing
   */
  async submitUrlForIndexing(siteUrl: string, url: string): Promise<void> {
    await this.makeRequest(
      `/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        body: JSON.stringify({
          url,
        }),
      }
    );
  }

  /**
   * Get indexed pages (from sitemap)
   */
  async getIndexStatus(
    siteUrl: string
  ): Promise<{
    indexed: number;
    submitted: number;
  }> {
    interface GSCIndexResponse {
      sitemaps?: Array<{
        type: string;
        contents?: Array<{
          indexed?: string;
          submitted?: string;
        }>;
      }>;
    }

    const data = await this.makeRequest<GSCIndexResponse>(
      `/sites/${encodeURIComponent(siteUrl)}/sitemaps`
    );

    let indexed = 0;
    let submitted = 0;

    data.sitemaps?.forEach((sitemap) => {
      sitemap.contents?.forEach((content) => {
        indexed += parseInt(content.indexed || '0', 10);
        submitted += parseInt(content.submitted || '0', 10);
      });
    });

    return { indexed, submitted };
  }
}
