# Sunflour Bakery — Local Dev & Project Skeleton

This repository contains the complete Sunflour Bakery website (Calabar).

## Files Created

- `index.html` — Homepage with hero, product cards, modal.
- `menu.html` — Menu page with filters and dynamic cards.
- `catering.html` — Multi-step catering form.
- `about.html` — Story and team.
- `contact.html` — Contact info and form.
- `blog.html` — Blog posts.
- `styles/styles.css` — Global styles.
- `styles/components.css` — Component styles.
- `scripts/` — main.js, menu.js, modal.js, catering.js, contact.js, products.js.
- `assets/logo-placeholder.svg` — Logo.
- `performance-accessibility-checklist.md` — QA checklist.

## How to Preview Locally (PowerShell)

```powershell
cd "c:\Users\KING MADU\Desktop\sunflour website"
python -m http.server 8000
# Open http://localhost:8000 in browser
```

## Color Tokens

- `--sf-red: #e34a3b` (primary)
- `--sf-orange: #ff8c3a` (secondary)
- `--sf-white: #ffffff` (neutral)

## Deployment

1. Push to GitHub.
2. Deploy to Netlify: Connect repo, use `netlify.toml` for config.
3. Or Vercel: Import project, set build command to none (static).
4. Add custom domain `sunflourbakery.com.ng`.
5. Enable SSL, add Open Graph images.

## Next Steps

- Add real images to `assets/images/`.
- Implement server-side form handling (e.g., Netlify Forms).
- Add analytics (Google Analytics).
- Optimize for production (minify, compress).
