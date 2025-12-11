# Sunflour Bakery — Priority File Checklist

This file lists the concrete files to create and the order of priority so development can start immediately. Each item shows the file(s), purpose, and acceptance criteria.

## Priority 1 — Foundation

- [ ] `index.html` — Root page and global HTML skeleton (header, footer, main).  
       Purpose: Provide global layout and home entrypoint.  
       Acceptance: Loads, contains header/nav/footer, links to `styles/styles.css` and `scripts/main.js`.

- [ ] `styles/styles.css` — Global styles, CSS variables (red/orange/white), typography, layout utilities.  
       Purpose: Centralized styling and color variables.  
       Acceptance: CSS variables defined (e.g., `--sf-red`, `--sf-orange`, `--sf-white`), responsive grid present.

- [ ] `scripts/main.js` — App bootstrap, navbar toggle, simple utilities.  
       Purpose: Lightweight JS to enable interactivity.  
       Acceptance: Navbar toggle works, DOMContentLoaded handler present.

- [ ] `assets/logo-placeholder.svg` and `assets/` folders (`images/`, `icons/`)  
       Purpose: Store brand assets and product photos.  
       Acceptance: Placeholder logo exists; assets folder structure created.

## Priority 2 — Home UI & Visuals

- [ ] `styles/components.css` — Component-level styles (hero, cards, modals).  
       Purpose: Isolate component styling for reuse.  
       Acceptance: Product card styles and hero styles scoped and importable.

- [ ] `components/product-card.html` (or product card template) — Reusable product card markup (image, title, tags, price, CTA).  
       Purpose: Single source of truth for product card structure.  
       Acceptance: Card shows image, title, price, tags, and a working "Order Now" button.

- [ ] `components/hero.html` — Hero markup and image placeholders.  
       Purpose: Visually striking hero for the landing view.  
       Acceptance: Full-viewport hero, headline, primary CTA.

## Priority 3 — Menu & Product Interactions

- [ ] `menu.html` — Menu / Shop page (grid of product cards).  
       Purpose: Browse offerings and filter by category.  
       Acceptance: Loads cards, category pills render.

- [x] `scripts/menu.js` — Filtering logic, grid toggles, lazy-loading support.  
       Purpose: Dynamic filtering and client-side performance.  
       Acceptance: Clicking category filters displayed items; images lazy-load.

- [x] `scripts/modal.js` and `components/modal.html` — Product quick-view modal.  
       Purpose: Show product details without navigation.  
       Acceptance: Modal opens, traps focus, closable via escape and close button.

## Priority 4 — Ordering & Forms

- [x] `catering.html` — Catering & custom order multi-step form.  
      Purpose: Capture inquiries for events.  
      Acceptance: Multi-step UI, client-side validation, progress indicator, enhanced with icons, better labels, additional fields, success message, animations, and responsive design.

- [x] `scripts/catering.js` — Enhanced form logic with animations, better validation feedback, and success handling.  
      Purpose: Improve UX for multi-step form.  
      Acceptance: Smooth step transitions, error messages, success animation.

- [x] `checkout.html` — Checkout page with payment options.  
      Purpose: Complete orders with bank transfer or card payment.  
      Acceptance: Order summary, payment tabs, bank details display, card form, beautiful design.

- [x] `scripts/checkout.js` — Checkout logic and payment handling.  
      Purpose: Manage order items, payment methods, and confirmations.  
      Acceptance: Load order from storage, switch payment methods, simulate payments.

- [x] `contact.html` — Contact page with map embed and contact form.  
      Purpose: Allow customers to reach the bakery and find location.  
      Acceptance: Map visible, contact form fields with validation, enhanced with larger content, FAQ section, and mobile responsive design.

## Priority 5 — About, Blog, and Extras

- [x] `about.html` — Story, chef profiles, timeline.  
      Purpose: Brand storytelling.  
      Acceptance: Timeline and team section present.

- [x] `blog.html` and `posts/` — Static blog template and content folder.  
      Purpose: News and baking tips.  
      Acceptance: Article template renders a sample post.

## Priority 6 — Quality, Testing & Deployment

- [x] `README.md` — How to run, folder structure, deploy notes (Netlify/Vercel), color hex codes.  
      Purpose: Onboarding and deployment instructions.  
      Acceptance: Clear steps to preview locally and deploy to Netlify/Vercel.

- [x] `performance-accessibility-checklist.md` — Lists Lighthouse checks, accessibility items, and image optimization notes.  
      Purpose: Final QA pass.  
      Acceptance: Checklist items are actionable and verifiable.

- [x] `netlify.toml` or `vercel.json` (optional) — Basic deploy config.  
      Purpose: One-click deploy readiness.  
      Acceptance: Deploys site to chosen host with correct build settings.## Quick color tokens (to include in `styles/styles.css`)
- `--sf-red: #e34a3b;` /_ strawberry red — primary accent _/
- `--sf-orange: #ff8c3a;` /_ sun-baked orange — secondary accent _/
- `--sf-white: #ffffff;` /_ crisp bakery white — background / neutrals _/

## How to start (first 48 hours)

1. Create Priority 1 files and folder structure.
2. Add CSS variables and placeholder logo in `assets/`.
3. Implement the responsive header/nav and verify `index.html` loads.
4. Build basic hero and one product card to confirm component styling.

## Notes & Next Steps

- After you confirm these file names and the priority order, I can create the initial file skeletons in the repository (index.html, styles folder, scripts folder, assets placeholders) and implement the Priority 1 deliverables.
- I already recorded a matching todo list for development tasks in the workspace task manager for progress tracking.
- Homepage (index.html) has been extended to enterprise-grade with multiple sections (categories, why choose us, testimonials, stats, CTA, newsletter) and balanced responsiveness for mobile/tablet/desktop.
- Real bakery images from Unsplash added to replace placeholders.
- Quantity controls added to checkout for better UX.
- SEO basics implemented with structured data and meta tags.
- Social media links (Instagram/Twitter) added to footer.

---

Updated brand palette: strawberry red, sun-baked orange, and bakery white are now the visual anchors — hex tokens are above for quick reference.
