import fs from "fs";
import path from "path";
import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  image?: string;
  premium?: boolean;
}

// Cache bust: force sitemap rebuild — 2026-04-17
const postsDirectory = path.join(process.cwd(), "content", "posts");

function parseFrontmatter(fileContent: string): {
  metadata: Record<string, any>;
  content: string;
} {
  // Enhanced regex: matches '---' at the start of the file, then any content, 
  // then '---' that must be at the start of a line (preceded by a newline).
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\s*/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { metadata: {}, content: fileContent };
  }

  const frontmatter = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const metadata: Record<string, any> = {};

  frontmatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Handle JSON-like arrays for tags
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          // Replace single quotes with double quotes for valid JSON parsing if needed
          const jsonValue = value.replace(/'/g, '"');
          metadata[key] = JSON.parse(jsonValue);
        } catch (e) {
          metadata[key] = value;
        }
      } else {
        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        metadata[key] = value;
      }
    }
  });

  return { metadata, content };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory).filter((f) => {
    const lower = f.toLowerCase();
    return lower.endsWith(".mdx") || lower.endsWith(".md");
  });

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { metadata, content } = parseFrontmatter(fileContent);

    return {
      slug,
      title: metadata.title || slug,
      description: metadata.description || metadata.excerpt || "",
      date: metadata.date || "",
      tags: Array.isArray(metadata.tags)
        ? metadata.tags
        : metadata.tags
          ? metadata.tags.split(",").map((t: string) => t.trim())
          : [],
      content,
      image: metadata.image || "",
      premium: metadata.premium === "true" || metadata.premium === true,
    };
  });

  console.log(`[Blog] Found ${posts.length} posts. Slugs: ${posts.map(p => p.slug).join(", ")}`);

  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  const normalizedSlug = slug.toLowerCase().trim();
  // Handle Hebrew/Encoded slugs
  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

  return posts.find((post) => {
    const postSlug = post.slug.toLowerCase().trim();
    return postSlug === normalizedSlug || postSlug === decodedSlug;
  });
}

export function parseMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}

// Wrap bare URLs in HTML text with <a> tags (handles Quill plain-text URLs)
export function linkify(html: string): string {
  // Split on existing <a> tags to avoid double-wrapping already-linked URLs
  return html.replace(/(<a[\s\S]*?<\/a>)|(<[^>]+>)|(https?:\/\/[^\s<>"')\]]+)/g, (match, anchor, tag, url) => {
    if (anchor || tag) return match; // preserve existing tags as-is
    const display = url.length > 60 ? url.slice(0, 57) + '...' : url;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${display}</a>`;
  });
}

// Keyword → internal URL map for auto-linking in blog content.
// Each term is linked at most once per post to avoid over-optimization.
const INTERNAL_LINK_MAP: Array<{ pattern: RegExp; url: string; label: string }> = [
  { pattern: /\bPower BI\b/g, url: '/services', label: 'Power BI' },
  { pattern: /\bNotebookLM\b/g, url: '/courses/notebook-master', label: 'NotebookLM' },
  { pattern: /קורס AI\b/g, url: '/courses/ai-mastery', label: 'קורס AI' },
  { pattern: /\bייעוץ פיננסי\b/g, url: '/services', label: 'ייעוץ פיננסי' },
  { pattern: /\bאוטומציה פיננסית\b/g, url: '/services', label: 'אוטומציה פיננסית' },
];

// Apply strategic internal links to HTML content — skips already-linked text.
// Max 1 auto-link per keyword per call (capped to avoid over-optimization).
export function addInternalLinks(html: string): string {
  let result = html;
  for (const { pattern, url, label } of INTERNAL_LINK_MAP) {
    let linked = false;
    // Reset lastIndex for global regex
    pattern.lastIndex = 0;
    result = result.replace(/(<a[\s\S]*?<\/a>)|(<[^>]+>)|([^<]+)/g, (segment, anchor, tag, text) => {
      if (anchor || tag) return segment; // preserve existing markup
      if (!linked) {
        const replaced = text.replace(pattern, (match: string) => {
          if (linked) return match;
          linked = true;
          return `<a href="${url}">${label || match}</a>`;
        });
        pattern.lastIndex = 0;
        return replaced;
      }
      return segment;
    });
  }
  return result;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}
