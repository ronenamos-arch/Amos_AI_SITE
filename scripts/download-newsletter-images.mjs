import https from 'https';
import fs from 'fs';
import path from 'path';

const urls = [
  { name: '00-newsletter-header.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/3giHUnkDLLb6ECTB9f7vEq' },
  { name: '01-chatgpt-skills-concept.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/wzDyQbq6B7BzwiUpZWw8S9/email' },
  { name: '02-data-cleaning-skill.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/iwKy7nH2By91DyFhJDDeP2/email' },
  { name: '03-branding-skill-prompt.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/2f4NYLMT7FZraRXYroD4Q1/email' },
  { name: '04-branding-applied.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/jSrceZjNcKGzfEPJM5aafF/email' },
  { name: '05-dashboard-builder.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/7k8b4x1G7FS24X9sj4GS3x/email' },
  { name: '06-dashboard-result.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/hxujRpArGj6UafeHmAawfo/email' },
  { name: '07-boardroom-deck-prompt.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/cdpNZ4csp8t3mdZpZVfZbB/email' },
  { name: '08-boardroom-deck-result.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/jkXzRV7DjgF4AUiVvfuTQN/email' },
  { name: '09-super-skill-chain.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/tYcr395uJYismZjzVVxP28/email' },
  { name: '10-super-skill-summary.png', url: 'https://embed.filekitcdn.com/e/n8sZDoffxEwu2ino3oy1KE/8BKBeQ8Bt9ZaUWp1Bnvdn7/email' }
];

const destDir = path.resolve('public/images/blog/chatgpt-skills-finance');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function download(item) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(destDir, item.name);
    const file = fs.createWriteStream(filePath);
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
          res2.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Saved ${item.name} (${fs.statSync(filePath).size} bytes)`);
            resolve();
          });
        }).on('error', reject);
      } else {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Saved ${item.name} (${fs.statSync(filePath).size} bytes)`);
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function main() {
  console.log('Starting image downloads...');
  for (const item of urls) {
    try {
      await download(item);
    } catch (e) {
      console.error(`Failed ${item.name}:`, e);
    }
  }
  console.log('All downloads completed!');
}

main();
