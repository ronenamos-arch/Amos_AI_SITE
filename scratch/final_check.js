const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

function parseFrontmatter(fileContent) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\s*/;
  const match = frontmatterRegex.exec(fileContent);
  const metadata = {};
  if (match) {
    const frontmatter = match[1];
    frontmatter.split('\n').forEach((line) => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        metadata[key] = value;
      }
    });
  }
  return { metadata, content: fileContent.replace(frontmatterRegex, '').trim() };
}

function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.map(filename => {
    const slug = filename.replace(/\.mdx?$/, '');
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { metadata } = parseFrontmatter(fileContent);
    return {
       slug,
       title: metadata.title || slug,
       date: metadata.date || '2000-01-01'
    };
  });
}

function getPostBySlug(slug) {
  const posts = getAllPosts();
  const decodedSlug = decodeURIComponent(slug);
  return posts.find(p => p.slug === slug || p.slug === decodedSlug);
}

const target = 'ai-cfo-revolution-systematize';
console.log('Posts found:', getAllPosts().map(p => p.slug));
console.log('Match Found:', !!getPostBySlug(target));
