import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const userDir = 'C:/Users/Ronen/.gemini/antigravity/brain/567722c6-0d20-4c43-901d-d2c86c12d34e/.user_uploaded';
const blogDir = path.resolve('public/images/blog');

const images = [
  {
    src: 'media_1792768897649_891e3e51.jpg',
    dest: 'claude-ar-inbox-automation-header.jpg',
    width: 1200,
    quality: 85
  },
  {
    src: 'media_1792768897649_891e3e51.jpg',
    dest: 'claude-ar-inbox-automation-header.png',
    width: 1200,
    quality: 85
  },
  {
    src: 'media_1792768430749_171bee5b.png',
    dest: 'claude-ar-inbox-automation-layers.png',
    width: 1200,
    quality: 85
  },
  {
    src: 'media_1792768438878_3974fe6c.png',
    dest: 'claude-ar-inbox-automation-flow.png',
    width: 1200,
    quality: 85
  },
  {
    src: 'media_1792768424196_b98b0833.png',
    dest: 'claude-ar-inbox-automation-sheet.png',
    width: 1200,
    quality: 85
  },
  {
    src: 'media_1792768720072_a3f428a3.png',
    dest: 'claude-ar-inbox-automation-trigger.png',
    width: 1200,
    quality: 85
  }
];

async function processImages() {
  for (const img of images) {
    const srcPath = path.join(userDir, img.src);
    const destPath = path.join(blogDir, img.dest);
    
    const pipeline = sharp(srcPath).resize({ width: img.width, withoutEnlargement: true });
    
    if (img.dest.endsWith('.jpg') || img.dest.endsWith('.jpeg')) {
      await pipeline.jpeg({ quality: img.quality }).toFile(destPath);
    } else {
      await pipeline.png({ quality: img.quality, compressionLevel: 8 }).toFile(destPath);
    }
    
    const stat = fs.statSync(destPath);
    console.log(`Saved ${img.dest} (${Math.round(stat.size / 1024)} KB)`);
  }
}

processImages().catch(console.error);
