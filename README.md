# Instant Image Converter

**Nuxt 3 + Tailwind (glassmorphism, dark)** frontend and **Express + Sharp** backend for fast, privacy‑friendly image conversion.  
Convert **PNG ↔ JPG**, rasterize **SVG → PNG/JPG/WEBP/AVIF**, and export **WEBP/AVIF** with precise **upload** and **processing** progress. No sign‑up, no persistent storage.

> GitHub description (copy into repo settings):  
> **Online image converter (Nuxt 3 + Tailwind, Express + Sharp). PNG ↔ JPG, SVG → PNG/JPG/WEBP/AVIF, precise progress, in‑memory, SEO‑ready UI.**

---

## ✨ Features
- **Instant converting UI** — drag & drop, progress bars for **upload** and **processing**, one‑click **Download** after 100%.
- **Glassmorphism & dark theme** — polished, modern landing with SEO‑ready copy & JSON‑LD.
- **Pro‑grade output** — crisp SVG rasterization; adjustable quality for **JPG/WEBP/AVIF**.
- **Privacy‑friendly** — processed **in memory**; no files written to disk.
- **Format coverage** — PNG, JPG, SVG, WEBP, AVIF.
- **Accessible controls** — custom dropdown (format), quality slider, keyboard & screen‑reader friendly.

## 🧱 Tech Stack
- **Frontend:** Nuxt 3, TailwindCSS, Heroicons
- **Backend:** Express, Multer, Sharp
- **Runtime:** Node.js 18+

## 🔄 Supported Conversions
- **PNG ↔ JPG**
- **SVG → PNG/JPG/WEBP/AVIF**
- **PNG/JPG → WEBP/AVIF**

> Note: When converting **PNG → JPG**, transparency is flattened to **white**. JPG/WEBP/AVIF are **lossy** (quality is configurable).

---

## 🚀 Quick Start

### 1) Backend
```bash
cd backend
npm i
cp .env.example .env   # optional
npm start              # http://localhost:3001
```
Environment:
- `PORT` (default `3001`)
- File size limit: **25MB** (configured in `index.js`)

### 2) Frontend
```bash
cd ../frontend
npm i
# Set backend URL if not default:
# NUXT_PUBLIC_API_BASE=http://localhost:3001 npm run dev
npm run dev            # http://localhost:3000
```
Public runtime config (Nuxt):
- `NUXT_PUBLIC_API_BASE` — Express base URL (default `http://localhost:3001`)
- `NUXT_PUBLIC_GITHUB_REPO` — repo URL for “Star/Fork/Issues” CTA

---

## 🗂️ Project Structure
```
file-converter/
├─ backend/                # Express + Sharp API
│  ├─ index.js             # /api/convert endpoint
│  └─ .env.example
└─ frontend/               # Nuxt 3 app (dark + glass UI)
   ├─ pages/index.vue      # landing + converter UI
   ├─ components/UploadDropzone.vue
   ├─ nuxt.config.ts
   └─ tailwind.config.ts
```

---

## 📡 API Reference

### `POST /api/convert`
**FormData fields**
- `file`   — image file (required)
- `target` — one of `jpg | png | webp | avif` (required)
- `quality`— integer `40..100` (optional, JPG/WEBP/AVIF)

**Response**
- `200` — binary image stream with appropriate `Content-Type`
- `Content-Disposition` forces download filename (based on original)

**Errors**
- `400` — missing file / unsupported target
- `413` — file too large
- `500` — conversion error

---

## 🧭 Accessibility & SEO
- Descriptive headings and alt text; keyboard‑navigable controls.
- SEO copy for features and use‑cases (web, e‑commerce, blogs).
- JSON‑LD `SoftwareApplication` injected via `useHead`.

---

## 🛣️ Roadmap
- Batch ZIP (convert many → single download)
- Resize presets & thumbnails
- EXIF/metadata handling
- Offline/PWA mode
- Light/dark theme toggle

## 🤝 Contributing
Pull requests welcome! For feature ideas or bugs, open an issue.  
Before contributing, run the app locally and add tests where relevant.

## 📝 License
MIT © 2025 Your Name
