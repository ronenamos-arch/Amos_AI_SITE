import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function parseFrontmatter(fileContent) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\s*/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { metadata: {}, content: fileContent };
  }

  const frontmatter = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const metadata = {};

  frontmatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          const jsonValue = value.replace(/'/g, '"');
          metadata[key] = JSON.parse(jsonValue);
        } catch (e) {
          metadata[key] = value;
        }
      } else {
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

function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    console.error("Directory not found:", postsDirectory);
    return [];
  }

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  console.log("Found files:", files);

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { metadata, content } = parseFrontmatter(fileContent);

    return {
      slug,
      title: metadata.title || slug,
      date: metadata.date || "",
    };
  });

  return posts;
}

const posts = getAllPosts();
const target = posts.find(p => p.slug === "ai-cfo-revolution-systematize");
console.log("Target Post:", target);
if (!target) {
  console.log("Post not found in parsed list!");
  // Check if it's in the files list at least
  const files = fs.readdirSync(postsDirectory);
  console.log("Is file in list?", files.includes("ai-cfo-revolution-systematize.md"));
}
