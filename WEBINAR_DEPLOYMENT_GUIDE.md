# Webinar Deployment Guide

Complete step-by-step instructions for deploying webinars to ronenamoscpa.co.il

**Last updated:** May 31, 2026  
**Status:** Production-tested

---

## Quick Reference

| Item | Value |
|------|-------|
| **GitHub Repo** | https://github.com/ronenamos-arch/Amos_AI_SITE |
| **Webinars Folder** | `public/resources/webiners/` (note: lowercase 'w') |
| **Live URL** | https://www.ronenamoscpa.co.il/resources/webiners/ |
| **Hosting** | Vercel (auto-deploys from main branch) |
| **Branch** | `main` |

---

## 1. Folder Structure

Your webinar MUST follow this structure in the GitHub repository:

```
public/resources/webiners/
├── [WEBINAR-SLUG]/
│   ├── index.html          ← Main landing page (CRITICAL: see section 3)
│   ├── Media/              ← All video files go here
│   │   ├── video1.mp4
│   │   ├── video2.mp4
│   │   └── ...
│   ├── images/             ← Optional: store images here
│   │   ├── logo.png
│   │   └── ...
│   └── assets/             ← Optional: other static files (CSS, JS, etc.)
```

### Example: CFO-AI Webinar

```
public/resources/webiners/CFO-AI/
├── index.html
├── Media/
│   ├── תחזית 5 שנים אקסל ותרחישים.mp4
│   ├── דשבורד ביצועי עבר ומגמות צמיחה.mp4
│   ├── PP - Executive Summary.mp4
│   └── Live scenario simulator board session.mp4
```

**Important Notes:**
- Folder names are **case-sensitive on GitHub/Vercel** (but case-insensitive on Windows locally)
- Always use lowercase `webiners` folder (not `Webiners` or `Webinars`)
- Use hyphens in folder names: `CFO-AI`, `excel-hell`, `claude-accountant`
- Hebrew filenames are supported but must be UTF-8 encoded

---

## 2. Preparing Your Webinar Assets

Before deploying, prepare your assets in a local folder structure:

```
MyWebinar/
├── index.html              ← Your webinar landing page
├── Media/                  ← All video files (if any)
│   ├── video1.mp4
│   └── video2.mp4
└── [images/]              ← Optional: any images
```

---

## 3. CRITICAL: The `<base>` Tag in index.html

**This is the most important step.** The `<base>` tag tells the browser where to find relative file paths.

### ✅ Correct Example

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <base href="/resources/webiners/[WEBINAR-SLUG]/" />
  <!-- ↑ CRITICAL: Replace [WEBINAR-SLUG] with your folder name -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Webinar Title</title>
  ...
</head>
```

### Video Src Example

Once `<base>` is set, use relative paths in video tags:

```html
<video controls>
  <source src="Media/video.mp4" type="video/mp4" />
</video>
```

**Why this matters:**
- Without `<base>`, the browser looks for `Media/video.mp4` at the wrong path on the server
- Example: `/resources/webiners/Media/video.mp4` ❌ (missing folder)
- With `<base>`: `/resources/webiners/[SLUG]/Media/video.mp4` ✅ (correct)

---

## 4. Deployment Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/ronenamos-arch/Amos_AI_SITE.git
cd Amos_AI_SITE
```

### Step 2: Create Your Webinar Folder

```bash
# Example: deploying a webinar called "My-Webinar"
mkdir -p public/resources/webiners/My-Webinar/Media
```

### Step 3: Copy All Assets

Copy all files from your prepared folder into the GitHub repo:

```bash
# Copy HTML
cp ~/path/to/MyWebinar/index.html public/resources/webiners/My-Webinar/

# Copy videos (if any)
cp ~/path/to/MyWebinar/Media/*.mp4 public/resources/webiners/My-Webinar/Media/

# Copy images (if any)
cp -r ~/path/to/MyWebinar/images public/resources/webiners/My-Webinar/
```

### Step 4: Verify the `<base>` Tag

Open `public/resources/webiners/My-Webinar/index.html` and check:

```bash
grep "<base href" public/resources/webiners/My-Webinar/index.html
```

Expected output:
```html
<base href="/resources/webiners/My-Webinar/" />
```

If it's missing, add it manually right after the `<meta charset>` line:

```html
<meta charset="UTF-8" />
<base href="/resources/webiners/My-Webinar/" />
```

### Step 5: Stage and Commit

```bash
# Check what you're adding
git status

# Add all new files
git add public/resources/webiners/My-Webinar/

# Commit with a descriptive message
git commit -m "feat(webinars): add My-Webinar landing page and videos"
```

### Step 6: Push to GitHub

```bash
git push origin main
```

**That's it!** Vercel automatically deploys from the `main` branch. Your webinar goes live in 1-3 minutes.

---

## 5. Verification Checklist

After deployment, verify everything works:

### ✅ File Checklist

- [ ] All videos in `Media/` folder are tracked in git  
  ```bash
  git ls-files | grep "webiners/My-Webinar"
  ```

- [ ] HTML has `<base href="/resources/webiners/My-Webinar/" />`
  ```bash
  grep "<base href" public/resources/webiners/My-Webinar/index.html
  ```

- [ ] No capital letters in `webiners` folder name
  ```bash
  ls -la public/resources/webiners/  # Should show lowercase 'webiners'
  ```

### ✅ Live Site Verification

Wait 2-3 minutes for Vercel to deploy, then:

1. Open in browser: `https://www.ronenamoscpa.co.il/resources/webiners/My-Webinar/`
2. Check that videos load (play button works, video timeline appears)
3. Check that images load properly
4. Test on mobile and desktop
5. Open browser DevTools (F12) → Console tab → look for 404 errors

---

## 6. Troubleshooting

### Problem: Videos Show 404 or Won't Play

**Cause:** Missing or incorrect `<base>` tag

**Solution:**
1. Check `<base href>` in your HTML
2. Verify the slug in `<base>` matches your folder name exactly
3. Ensure it ends with a trailing slash: `/resources/webiners/My-Webinar/`
4. Save the file and push again

### Problem: Only Some Videos Load

**Cause:** Case-sensitivity mismatch (Windows vs. GitHub)

**Solution:**
1. Check git status: `git status --short`
2. Look for duplicate paths with different cases
3. Never create `Webiners` (capital W) — always `webiners` (lowercase)
4. If duplicates exist, delete capital-W versions and commit

### Problem: Images or Assets Don't Load

**Same cause as videos above.** Ensure `<base>` is set and paths are relative:

✅ Correct:
```html
<img src="images/logo.png" />
<link href="assets/style.css" />
```

❌ Wrong:
```html
<img src="/resources/webiners/My-Webinar/images/logo.png" />
<img src="https://..." /> <!-- Don't hardcode full URLs -->
```

### Problem: Deployment Didn't Go Live

**Cause:** Not on `main` branch or push failed

**Solution:**
```bash
git branch          # Should show * main
git log --oneline   # Should show your commit at the top
git push            # Try again
```

---

## 7. Advanced: Handling Large Video Files

### File Size Limits

- Vercel has no strict file size limit
- Single files up to **50 GB+** are supported
- Large videos (>100 MB) may take longer to push

### Git Push with Large Files

If you get "File is too large" error:

1. Install Git LFS (Large File Storage):
   ```bash
   # macOS
   brew install git-lfs
   
   # Windows (via Chocolatey)
   choco install git-lfs
   ```

2. Track large files:
   ```bash
   cd Amos_AI_SITE
   git lfs install
   git lfs track "*.mp4"
   git add .gitattributes
   git commit -m "chore: enable Git LFS for video files"
   ```

3. Try pushing again:
   ```bash
   git push origin main
   ```

---

## 8. Complete Example: Deploy "My-Webinar"

### Local Preparation

```bash
# Create folder locally
mkdir -p ~/Downloads/My-Webinar/Media

# Add files
cp ~/Desktop/my-webinar.html ~/Downloads/My-Webinar/index.html
cp ~/Desktop/intro.mp4 ~/Downloads/My-Webinar/Media/
cp ~/Desktop/demo.mp4 ~/Downloads/My-Webinar/Media/

# Verify structure
tree ~/Downloads/My-Webinar/
# My-Webinar/
# ├── index.html
# └── Media/
#     ├── intro.mp4
#     └── demo.mp4
```

### Edit the HTML

Add `<base>` tag:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <base href="/resources/webiners/My-Webinar/" />
  ...
</head>
```

### Git Deployment

```bash
cd ~/git/Amos_AI_SITE

# Create folder in repo
mkdir -p public/resources/webiners/My-Webinar/Media

# Copy files
cp ~/Downloads/My-Webinar/index.html public/resources/webiners/My-Webinar/
cp ~/Downloads/My-Webinar/Media/* public/resources/webiners/My-Webinar/Media/

# Verify and commit
git status
git add public/resources/webiners/My-Webinar/
git commit -m "feat(webinars): add My-Webinar with 2 demo videos"
git push origin main

# Watch Vercel deploy at:
# https://github.com/ronenamos-arch/Amos_AI_SITE/deployments
```

### Verification

```bash
# Check git tracking
git ls-files | grep My-Webinar

# Check base tag
grep "<base href" public/resources/webiners/My-Webinar/index.html

# After 2-3 min, test in browser:
# https://www.ronenamoscpa.co.il/resources/webiners/My-Webinar/
```

---

## 9. Tips for Success

1. **Test locally first** — Open the HTML file in your browser locally to check styling before pushing
2. **Use consistent naming** — Hyphens in folder names: `my-webinar`, not `my_webinar` or `myWebinar`
3. **Always lowercase `webiners`** — Never `Webiners` or `Webinars`
4. **Verify before pushing** — Run the checklist in Section 5
5. **Keep commits descriptive** — Help future you understand what changed
6. **Use `target="_blank"`** — For external links, so users stay on your webinar
7. **Test videos** — Play them fully to ensure encoding works on Vercel

---

## 10. Reference: Live Webinars

These webinars are live and follow the correct structure:

| Webinar | Folder | Videos | Status |
|---------|--------|--------|--------|
| CFO-AI | `CFO-AI` | 4 MP4s | ✅ Live |
| Excel Hell | `excel-hell` | Images only | ✅ Live |
| Claude Accountant | `claude-accountant` | Images only | ✅ Live |

Visit them at: `https://www.ronenamoscpa.co.il/resources/webiners/[SLUG]/`

---

## Questions?

This guide covers the complete workflow. If you hit issues:

1. Check the **Troubleshooting** section (Section 6)
2. Verify the `<base>` tag (Section 3) — this solves 90% of problems
3. Check git status for case mismatches (Windows vs. GitHub)

Good luck! 🚀
