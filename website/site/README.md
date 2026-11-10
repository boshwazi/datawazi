# datawazi_ website

The live site, built from the mockup in `../mockup/`. It's a static site made with [Astro](https://astro.build): it builds to plain HTML, CSS and a small script, so it's fast and costs nothing to host.

## Edit the words
- **All page copy:** `src/data/content.ts`. Headlines are arrays: each item is a new line (house rule: break after a comma or full stop).
- **Email, domain, booking link, status pill:** `src/data/site.ts`.
- **Privacy notice:** `src/pages/privacy.astro`.
- Never add prices (see `/CLAUDE.md`).

## Run it locally
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
```

## Deploy (pick one, all free for this size)
- **Cloudflare Pages / Netlify / Vercel:** connect the GitHub repo, set **root directory** `website/site`, build command `npm run build`, output directory `dist`.
- Then point the domain's DNS at the host and set `url` in `src/data/site.ts` and `public/robots.txt`.

## Before launch
- [ ] Confirm domain and email in `src/data/site.ts` and `public/robots.txt`
- [ ] Add a booking link (Cal.com, Calendly or Google Calendar) as `bookingUrl`; until then "book a fit check" opens an email
- [ ] Privacy notice reviewed, plus a **Bahasa Malaysia version** (the PDPA requires the notice in both languages)
- [ ] Obel Mono: copy `ObelMono-Regular.woff2` and `ObelMono-Bold.woff2` into `public/fonts/` and uncomment the two `@font-face` rules at the top of `src/styles/global.css`
- [ ] Replace example figures (terminal rows, "5d → 1d") with real, approved ones when you have them

## Effects
All in `src/scripts/effects.ts` and the bottom of `src/styles/global.css`:
section fade-up on scroll, label "decode", lime grid that follows the cursor in the hero, card spotlight on hover, process bars that fill in, active-section nav underline.
Everything turns off for visitors with *reduce motion* switched on, and the page is fully readable without JavaScript.

## Images
`npm run og` regenerates `public/og.png` (social preview) and `public/apple-touch-icon.png`. Favicons come from `/brand/logo/`.
