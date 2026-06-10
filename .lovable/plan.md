
# Rooftop Restaurant & Lounge — Build Plan

A 5-page premium TanStack Start site for K Hotels Entebbe's rooftop restaurant. Dark "tropical luxury noir" aesthetic, Lake Victoria centric, conversion-focused (reservations).

## Pages & Routes

```
src/routes/
  __root.tsx          → shared nav, footer, floating WhatsApp + Reserve CTA, fonts, JSON-LD defaults
  index.tsx           → Home
  menu.tsx            → Menu (tabs: Breakfast / All-Day / Dinner / Beverages)
  experiences.tsx     → Experiences & Events
  gallery.tsx         → Gallery (filterable masonry + lightbox)
  reservations.tsx    → Reservation form + contact + map
```

Each route gets its own `head()` with unique title, meta description, og:title, og:description, canonical, and Restaurant/LocalBusiness JSON-LD on home + reservations.

## Design System (`src/styles.css`)

Tailwind v4 `@theme` tokens:
- `--color-night: #0D0A07`, `--color-gold: #C9932A`, `--color-gold-hover: #E8A93A`, `--color-twilight: #1A2E3B`, `--color-ivory: #F5EFE6`, `--color-terracotta: #C4714A`, `--color-forest: #2C4A3E`, `--color-parchment: #E8D5B0`
- `--font-display: "Cormorant Garamond"`, `--font-body: "DM Sans"`, `--font-script: "Playfair Display"`
- Custom utilities: `.text-gold-underline` (animated underline), `.grain` (3% noise overlay), `.glass` (frosted card)
- Fonts loaded via `<link>` in `__root.tsx` head (Google Fonts, async, `display=swap`)

Dark-dominant base (no light/dark toggle). `prefers-reduced-motion` disables transforms.

## Shared Components (`src/components/`)

- `Navigation.tsx` — transparent → solid on scroll, gold "Reserve a Table" button, mobile full-screen overlay
- `Footer.tsx` — 4-col (brand, links, hours, contact) + bottom strip
- `FloatingCTAs.tsx` — WhatsApp button + mobile "Reserve" sticky
- `ReserveButton.tsx` — primary gold CTA variant
- `SectionHeading.tsx` — Cormorant + thin gold rule
- `ReviewCarousel.tsx` — auto-advancing testimonial cards
- `ExperienceCard.tsx` — full-bleed image card with overlay
- `Lightbox.tsx` — gallery lightbox (keyboard + swipe)
- `ReservationForm.tsx` — 8-field zod-validated form, server function submission

## Home Page Sections

1. Full-viewport hero (poster image fallback; optional looped muted video), gradient overlay, italic Cormorant headline, two CTAs, TripAdvisor #1 badge, scroll indicator
2. Quick info bar (hours / location / phone) — twilight bg, gold icons
3. "Above the Lake" about — 2-col image/text with stat badges
4. Cuisine highlights — 6-tile grid (Indian, Continental, East African, Asian, Fast Food, Desserts)
5. Featured experiences — 3 large cards (Mongolian Night, Sunset Sessions, Private Dining)
6. Guest reviews carousel — 3 supplied reviews, gold stars, star-field bg
7. Rooftop amenities — 4 icon tiles (Pool, Gym, Sauna, Steam)
8. Instagram strip — 6 placeholder tiles + follow CTA
9. Footer

## Menu Page

- Hero banner + headline
- Sticky tab bar (Breakfast / All-Day / Dinner / Beverages)
- Category sections (Starters, Mains by cuisine, Fast Food, Desserts, Non-Alc, Cocktails, Wine & Beer)
- Item rows: name + dotted leader + price, cuisine tag, description, dietary icons (V/VG/GF/S)
- Realistic placeholder items (since no real menu provided)
- CTA strip: "Reserve Your Table Tonight"

## Experiences Page

- Hero
- Mongolian Night (image left / text right)
- Sunset Sessions (image right / text left)
- Private Dining full-bleed card with occasion tags
- Pool & Wellness 2-col
- Nearby Landmarks — 3 cards (Victoria Mall, Imperial Mall, Botanical Gardens)
- Enquiry CTA → reservations with `?occasion=private`

## Gallery Page

- Hero
- Filter tabs (All / Views / Food / Events / Pool & Lounge)
- Masonry grid (CSS columns), lightbox on click
- Instagram CTA

## Reservations Page

- Hero
- 8-field form using react-hook-form + zod (shadcn Form, Input, Select, Calendar via Popover, Textarea)
- Server function `submitReservation` in `src/lib/reservations.functions.ts` — validates with zod, returns confirmation (no DB; logs server-side, can be wired to Cloud later if requested)
- Hours block, 3 contact cards, Google Maps `<iframe>` embed for Plot 32 Hill Rd Entebbe
- Pre-fill `occasion` from URL query

## Imagery

Generate ~12 hero/section/gallery images via `imagegen` (golden-hour lake views, plated dishes, Mongolian grill, private dining setup, rooftop pool at dusk, lounge, sunset cocktails, staff moments) and store as `lovable-assets`. All `<img>` with descriptive alt text matching the pattern in the brief.

## SEO / Accessibility / Perf

- Title/meta/og per route (exact strings from brief)
- JSON-LD Restaurant schema on home; LocalBusiness on reservations
- Single `<h1>` per page; semantic `<nav>/<main>/<footer>`
- Form `<Label>` elements; gold focus rings; WCAG AA contrast
- Lazy load all non-hero images; responsive `<img>` with width/height to prevent CLS
- `prefers-reduced-motion` media query disables transforms/animations
- Tel/mailto/WhatsApp deep links

## Technical Notes

- Stack: TanStack Start (existing), Tailwind v4, shadcn/ui, react-hook-form + zod
- Reservation submission via `createServerFn` (no Lovable Cloud unless you want persistence — see question below)
- No backend persistence in v1; form returns a confirmation message

## Open question before building

Reservation handling — pick one:
- **A)** Form validates + shows confirmation only (no storage). Fastest, no backend.
- **B)** Enable Lovable Cloud → store reservations in a `reservations` table + simple admin view.
- **C)** Send reservation as an email (requires connecting an email provider like Resend).

If you don't specify, I'll default to **A** so the site ships clean and we can wire B/C later.
