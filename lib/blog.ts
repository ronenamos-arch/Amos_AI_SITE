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

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

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

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  // Decode slug to handle Hebrew characters from the URL
  const decodedSlug = decodeURIComponent(slug);
  return posts.find((post) => post.slug === slug || post.slug === decodedSlug);
}

export function parseMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}
