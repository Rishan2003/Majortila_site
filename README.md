# HEXA’S Majortila — kinetic edition (v3)

A complete refresh of the supplied React + Vite website, retaining all 17 pages and hash-based navigation.

## Preview in seconds

1. Extract this ZIP.
2. Open `hexas-majortila/dist/OPEN-WEBSITE.html` in Chrome, Edge, Firefox or Safari.
3. Use the navigation to explore every page. Select **Pause motion** in the lower-left corner to turn decorative motion off.

Keep the `dist/assets`, `dist/images` and `dist/fonts` folders beside the preview file. Poppins and Manrope are bundled locally, so the full design works offline. No Drive sign-in is required to load the photographs.

## Publish

Upload the **contents** of `dist/` to your static website host. `index.html` is the production entry point; `OPEN-WEBSITE.html` is an additional local review copy. Existing hash routes work without server rewrite rules. Relative asset paths also support hosting in a subfolder.

This package has not been deployed to a live domain.

## Develop or edit

Use a current Node.js release supported by the supplied Vite version (Node 22.12+ or Node 24 recommended).

```bash
npm ci
npm run dev
```

Build the production site and regenerate the local preview:

```bash
npm run build
```

## What changed

- A consistent visual system in HEXA’S blue `#2e3192`, red `#ed1c24`, white and deep navy.
- A new three-scene hero with oversized letter-by-letter headlines, a rotating photo deck, synchronized photographic backdrops, pointer-responsive depth, orbiting geometry and floating achievement details. Each scene runs for 7.2 seconds.
- Manual program controls, keyboard arrows, a hero pause/resume button and horizontal touch swipes. Automatic slides pause while the hero is offscreen, the tab is hidden, or keyboard focus is inside it.
- A red program marquee, word-by-word section entrances, scroll-driven campus photo layers and count-up numbers.
- A student photo sequence that moves horizontally with normal page scrolling on large screens, with native horizontal browsing and previous/next buttons on smaller screens. No wheel or vertical touch gestures are intercepted.
- Poppins Black headlines, Manrope body text, stronger red/blue contrasts, a dramatic call-to-action and an oversized animated footer.
- Smooth page entrances, image zooms, card movement, menu transitions and responsive layouts.
- A site-wide motion control saved on the visitor’s device. System reduced-motion preferences disable animation automatically; manual scene navigation remains available. The sticky gallery becomes a normal horizontal gallery with motion off.
- Real campus and achievement photos from the supplied Drive folder, locally bundled as optimized WebP images.
- Featured students now have matching names, band scores and actual photos from the named source files. See `PHOTO-SOURCES.md`.
- A campus/achievement gallery with category and score filters, an expandable photo viewer, previous/next controls, keyboard arrows and Escape support.
- Existing course filters, student-name search, facility pages and exam-registration information remain available.
- Stale upcoming batch dates on the homepage have been replaced with a prompt to confirm current availability.
- Keyboard navigation, focus states, skip-to-content, descriptive images and a clearer mobile menu.

## Enquiries

The original website did not have a form delivery service. This version makes that limitation clear to visitors: **Prepare my enquiry** creates a copyable summary, then offers the existing admissions phone link. Nothing is submitted or stored on a server. Clipboard access has a manual-copy fallback.

To collect enquiries directly, connect an approved email, CRM or form endpoint before replacing this copy-and-call flow. No credentials or external form provider are included.

## Content to maintain

- `src/data/courses.js`: course names, fees, duration and features.
- `src/data/facilities.js`: student-care information.
- `src/data/achievements.js`: featured results and campus-gallery images.
- `src/data/homeContent.js`: resource and study-desk topics. Original historical batch data is retained here, but past dates are not promoted as upcoming.
- `src/styles.css`: base layouts for all existing pages.
- `src/premium.css`: the kinetic visual system, responsive rules and animations.
- `src/fonts.css` and `public/fonts/`: locally bundled open-source fonts and their OFL licenses.
- `src/components/home/KineticHero.jsx`: the hero scenes, timing and controls.
- `src/components/home/ScrollGallery.jsx` and `src/hooks/useScrollEffects.js`: student showcase and scroll effects.

Course fees, historical aggregate achievements, partner descriptions and institutional claims were retained from the supplied website and were not independently verified. Confirm these operational details before public launch.

## Validation

The production build passes. Automated DOM checks covered all 17 page routes, 69 image references, 448 internal route links, course filters, student search, empty results, gallery controls, the enquiry summary, clipboard copying, mobile-menu Escape behaviour, reduced-motion preferences and the 404 route. Additional checks covered synchronized hero scenes, autoplay wrapping, focus and visibility pauses, explicit resume, swipe directions, gallery navigation, route cleanup and animated-text spacing. No runtime errors were reported in those checks.

The connected preview browser could not open local URLs, so visual browser/device QA was unavailable. Review the included preview on your target desktop and mobile browsers before publishing.
