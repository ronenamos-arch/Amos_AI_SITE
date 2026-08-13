import type { NextConfig } from "next";

// Long-lived asset caching is only safe once filenames are content-hashed, which
// happens at build time. In dev, `/_next/static/chunks/app/**.js` are stable,
// mutable URLs — marking them `immutable` makes the browser pin the first chunk
// it ever saw and never revalidate, so edits stop reaching the page.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Allow the preview-email API to be embedded in the admin iframe
        source: "/api/admin/preview-email",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      ...(isProd
        ? [
            {
              source: "/_next/static/(.*)",
              headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
              ],
            },
            {
              source: "/images/(.*)",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=86400, stale-while-revalidate=604800",
                },
              ],
            },
          ]
        : []),
    ];
  },
  async redirects() {
    return [
      // /pricing was retired when subscribe CTAs started going straight to
      // PayPal. It cannot simply 404: 12 published blog posts link to it in
      // their body copy, and the URL is indexed. Point it at the sales page.
      {
        source: "/pricing",
        destination: "/",
        permanent: true,
      },
      // The redesign lived at /preview-home before becoming the homepage;
      // paywall emails and shared links from that period still point there.
      {
        source: "/preview-home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/resources/python_can_do_whaaat_cfo_pl_terminal%20(4).html",
        destination: "/resources/python-cfo",
        permanent: true,
      },
      {
        source: "/resources/skills-he.html",
        destination: "/resources/ai-skills",
        permanent: true,
      },
      {
        source: "/resources/One_pager/102-Prompt.html",
        destination: "/resources/102-prompt",
        permanent: true,
      },
      {
        source: "/resources/One_pager/price-framework.html",
        destination: "/resources/price-framework",
        permanent: true,
      },
      {
        source: "/resources/colab-he-ronen.html",
        destination: "/resources/colab-he",
        permanent: true,
      },
    ];
  },
  async redirects() {
    return [
      // /pricing was retired when subscribe CTAs started going straight to
      // PayPal. It cannot simply 404: 12 published blog posts link to it in
      // their body copy, and the URL is indexed. Point it at the sales page.
      {
        source: "/pricing",
        destination: "/",
        permanent: true,
      },
      // The redesign lived at /preview-home before becoming the homepage;
      // paywall emails and shared links from that period still point there.
      {
        source: "/preview-home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/resources/python_can_do_whaaat_cfo_pl_terminal%20(4).html",
        destination: "/resources/python-cfo",
        permanent: true,
      },
      {
        source: "/resources/skills-he.html",
        destination: "/resources/ai-skills",
        permanent: true,
      },
      {
        source: "/resources/One_pager/102-Prompt.html",
        destination: "/resources/102-prompt",
        permanent: true,
      },
      {
        source: "/resources/One_pager/price-framework.html",
        destination: "/resources/price-framework",
        permanent: true,
      },
      {
        source: "/resources/colab-he-ronen.html",
        destination: "/resources/colab-he",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
