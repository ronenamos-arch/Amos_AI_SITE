/**
 * compress-images.mjs
 * One-time script to compress all JPG/PNG source images in /public.
 * Run: node scripts/compress-images.mjs
 * Requires: npm install --save-dev sharp
 *
 * JPEGs are re-encoded at quality 80 (~40-60% size reduction).
 * PNGs are re-encoded with compressionLevel 9 and palette quantization (~50-70% reduction).
 * Original files are overwritten (run once, commit results).
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "../public");

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function formatBytes(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

for await (const filePath of walkDir(PUBLIC_DIR)) {
  const ext = extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const statBefore = await stat(filePath);
  const sizeBefore = statBefore.size;

  try {
    let buffer;
    if (ext === ".jpg" || ext === ".jpeg") {
      buffer = await sharp(filePath)
        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
        .toBuffer();
    } else {
      // PNG
      buffer = await sharp(filePath)
        .png({ compressionLevel: 9, palette: true, quality: 80 })
        .toBuffer();
    }

    // Only overwrite if we achieved meaningful compression (>5%)
    const sizeAfter = buffer.length;
    const saving = ((sizeBefore - sizeAfter) / sizeBefore) * 100;

    if (saving > 5) {
      const { writeFile } = await import("fs/promises");
      await writeFile(filePath, buffer);
      totalBefore += sizeBefore;
      totalAfter += sizeAfter;
      processed++;
      console.log(
        `✓ ${basename(filePath).padEnd(40)} ${await formatBytes(sizeBefore)} → ${await formatBytes(sizeAfter)} (-${saving.toFixed(0)}%)`
      );
    } else {
      skipped++;
      console.log(`  ${basename(filePath).padEnd(40)} already optimized, skipped`);
    }
  } catch (err) {
    console.error(`✗ ${basename(filePath)}: ${err.message}`);
  }
}

console.log("\n─────────────────────────────────────────────────");
console.log(`Processed: ${processed} files, Skipped: ${skipped} files`);
if (processed > 0) {
  const savedKB = ((totalBefore - totalAfter) / 1024).toFixed(0);
  const savedPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0);
  console.log(`Total saved: ${savedKB} KB (${savedPct}% reduction)`);
}
