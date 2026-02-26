# PhantomByte Labs — Site

Personal site for [phantombyte.com](https://phantombyte.com) built with [Hugo](https://gohugo.io).

---

## 🚀 Quick Start (First Time Setup)

### 1. Install Hugo
```bash
# macOS
brew install hugo

# Windows (winget)
winget install Hugo.Hugo

# Linux
sudo apt install hugo
# or download from https://github.com/gohugoio/hugo/releases
```

### 2. Clone & Run Locally
```bash
git clone https://github.com/YOUR_USERNAME/phantombyte-labs.git
cd phantombyte-labs
hugo server -D
```

Open http://localhost:1313 in your browser. The site live-reloads on every save.

---

## ✏️ How to Edit Content

### Update your personal info & about section
Edit `data/about.yaml` — change the bio text, tags, terminal motto, and stats.

### Update your CV
Edit `data/cv.yaml` — all CV content (education, experience, skills, publications) lives here.
No HTML ever needed.

### Update GitHub username
Edit `hugo.toml` → `params.github = "yourusername"`. The projects section fetches live from the API.

### Add a profile photo
Drop your photo as `static/images/profile.jpg`. The CV sidebar will pick it up automatically.

### Add a CV PDF download
Drop your PDF as `static/files/cv.pdf`. The download button appears automatically.

---

## 📝 Writing a New Blog Post

```bash
hugo new blog/your-post-title.md
```

This creates `content/blog/your-post-title.md` pre-filled with the template.

Edit the front matter at the top:
```yaml
---
title: "Your Post Title"
date: 2025-03-01
category: "Research"     # Research | Exploitation | Tooling | Firmware | Writeup | Notes
excerpt: "One-line summary shown on the blog index"
draft: false             # Set to false when ready to publish
---
```

Then write your post in Markdown below the `---`.

**To publish:** Change `draft: true` to `draft: false`, then `git push`.

---

## 🔬 Adding a Research Project

### Option 1: Quick add (card only, no detail page)
Edit `data/research.yaml` — add a new block to the `projects:` list:

```yaml
- title: "Your Project Title"
  status: "active"          # active | published | ongoing
  status_label: "Active Research"
  abstract: "One paragraph description."
  tags: ["Tag1", "Tag2"]
  link: ""                  # Leave empty or link to a paper/page
  link_label: "Read more"
```

### Option 2: Full detail page
```bash
hugo new research/your-project.md
```

Then also add the card entry to `data/research.yaml` with `link: "/research/your-project/"`.

---

## 🚢 Deploying

### Automatic (recommended)
Every `git push` to `main` triggers GitHub Actions, which builds and deploys the site automatically.

```bash
git add .
git commit -m "Add new blog post"
git push
```

Site updates within ~30 seconds.

### Manual build
```bash
hugo --minify
# Output is in /public — upload to any static host
```

---

## 📁 File Structure

```
phantombyte-labs/
├── hugo.toml               ← Site config, your name/GitHub/email
├── data/
│   ├── about.yaml          ← About section content
│   ├── cv.yaml             ← Full CV data
│   └── research.yaml       ← Research project cards
├── content/
│   ├── blog/               ← Blog posts (.md files)
│   └── research/           ← Research detail pages (.md files)
├── static/
│   ├── css/main.css        ← All styles (edit to customise design)
│   ├── js/github.js        ← GitHub API integration
│   └── images/             ← Put your profile photo here
└── layouts/                ← Hugo templates (rarely need editing)
```

---

## 🎨 Customising the Design

All styles are in `static/css/main.css`. CSS variables at the top control all colours:

```css
:root {
  --accent:  #00e5ff;   /* cyan — main highlight colour */
  --accent2: #00ffb3;   /* green — secondary highlight */
  --bg:      #0e1117;   /* darkest background */
}
```

Change `--accent` to change the entire colour scheme.
