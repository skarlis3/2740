# ENGL 2740 Accessibility Audit

**Date:** April 1, 2026
**Scope:** Full site at `/2740/` — reading pages, article pages, index, generator, and final-project section

---

## Summary

This audit checked for WCAG 2.1 AA compliance across the ENGL 2740 course site. Issues were identified in color contrast, landmark structure, semantic HTML for interactive elements, motion preferences, ARIA states for toggle buttons, and link distinguishability. All identified issues have been resolved.

---

## Audit Results

| #  | Issue | Category | Location | Status |
|----|-------|----------|----------|--------|
| 1  | `--c-alert` insufficient contrast in light mode | Color Contrast (1.4.3) | `style.css` — light-mode override | **Fixed** — changed `#b05c7c` to `#993d60` |
| 2  | `--c-alert` in article light mode | Color Contrast (1.4.3) | `articles.css` — article light-mode | **Pass** — `#7d3550` already meets AA on `#f2f4f8` |
| 3  | Duplicate `id="main-content"` | Parsing / Unique IDs (4.1.1) | `final-project/index.html` | **Pass** — only one element has `id="main-content"` (the `<main>` tag); skip link references it via `href` |
| 4  | Missing `<main>` landmark | Landmarks (1.3.1) | `generator.html` | **Fixed** — wrapped content in `<main id="main-content">` |
| 5  | Theme toggle uses `<div>` instead of `<button>` | Semantic HTML (4.1.2) | `script.js` — injected toolbar | **Fixed** — changed to `<button>` with `background: none; border: none; cursor: pointer;` |
| 6  | No `prefers-reduced-motion` support | Motion (2.3.3) | `style.css` | **Fixed** — added `@media (prefers-reduced-motion: reduce)` rule |
| 7  | Serif/Sans toggle buttons missing `aria-pressed` | ARIA States (4.1.2) | `script.js` — toolbar buttons | **Fixed** — added `aria-pressed` to initial HTML and updated click handlers |
| 8  | Inline links not visually distinguishable from text | Link Distinguishability (1.4.1) | `.reading-content`, `.article-section` | **Fixed** — added underline styles for inline links |

---

## Changes Made

### `style.css`
- **Line ~58:** Changed `--c-alert: #b05c7c` to `--c-alert: #993d60` in `body.light-mode:not(.hub-page)` block for sufficient contrast ratio on `#f2f4f8` background.
- **End of file:** Added `.reading-content a, .article-section a` rule with `text-decoration: underline`, `text-decoration-thickness: 1px`, and `text-underline-offset: 3px` for link distinguishability.
- **End of file:** Added `@media (prefers-reduced-motion: reduce)` rule that sets near-zero animation/transition durations and disables smooth scroll.

### `script.js`
- **Theme toggle:** Changed injected HTML from `<div id="theme-toggle" role="button" tabindex="0">` to `<button id="theme-toggle">` with inline styles (`background: none; border: none; cursor: pointer;`) to maintain visual appearance.
- **Serif/Sans buttons:** Added `aria-pressed="true"` to `#btn-serif` and `aria-pressed="false"` to `#btn-sans` in the initial injected HTML.
- **Serif/Sans click handlers:** Added `setAttribute('aria-pressed', ...)` calls so the active button gets `aria-pressed="true"` and the inactive one gets `aria-pressed="false"` on each toggle.

### `generator.html`
- Wrapped the page content (`<h1>`, form container, and output container) inside `<main id="main-content">` to provide a proper landmark for screen readers and skip-link target.

### `articles.css`
- No changes needed. `--c-alert: #7d3550` already passes contrast requirements.

### `final-project/index.html`
- No changes needed. Only one `id="main-content"` exists (on the `<main>` element); the skip link correctly references it via `href="#main-content"`.
