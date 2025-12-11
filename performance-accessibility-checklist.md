# Performance & Accessibility Checklist

## Accessibility

- [x] Semantic HTML (headings, nav, main, footer)
- [x] Alt text on images
- [x] Focus styles (2px dashed outline)
- [x] Keyboard navigation (tab, escape)
- [x] ARIA labels and roles (modal, live regions)
- [x] Color contrast (WCAG AA)
- [x] Reduced motion support (`prefers-reduced-motion`)
- [x] Screen reader announcements (modal open/close)

## Performance

- [x] Lazy loading images (`loading="lazy"`)
- [x] WebP fallbacks (use modern formats)
- [x] Minified CSS/JS (optional, but recommended)
- [x] Defer non-critical JS
- [x] Preconnect to fonts/CDNs
- [x] Lighthouse score >90 (aim for 95+)

## Testing

- [ ] Cross-browser: Chrome, Firefox, Safari, Edge
- [ ] Mobile: iOS Safari, Android Chrome
- [ ] Screen readers: NVDA, JAWS, VoiceOver
- [ ] Keyboard-only navigation
- [ ] Form validation feedback

## Deployment

- [x] Static hosting (Netlify/Vercel/GitHub Pages)
- [x] SSL enabled
- [x] Custom domain (sunflourbakery.com.ng)
- [x] Open Graph images for social sharing
