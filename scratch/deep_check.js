import { getAllPosts, getPostBySlug } from '../lib/blog.js';

console.log('--- Testing getAllPosts ---');
const posts = getAllPosts();
console.log('Total posts found:', posts.length);

const targetSlug = 'ai-cfo-revolution-systematize';
const postInAll = posts.find(p => p.slug === targetSlug);
console.log('Found in getAllPosts:', postInAll ? 'YES' : 'NO');

console.log('--- Testing getPostBySlug ---');
const postBySlug = getPostBySlug(targetSlug);
console.log('Found by getPostBySlug:', postBySlug ? 'YES' : 'NO');

if (postInAll && postBySlug) {
  console.log('Local logic is working perfectly.');
}
