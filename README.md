# Portfolio

A bilingual (EN/PT) multimedia portfolio built with **Astro** + **React** islands
+ **Tailwind CSS v4**. Static output — deploy it anywhere that serves static files.

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

## The 5-minute orientation

- **Content you actually edit day-to-day** lives in `src/content/` — plain
  Markdown/YAML files, one per work item. Add a file, it shows up on the site.
- **Site-wide text** (nav labels, buttons, headings) lives in `src/i18n/ui.ts`.
- **Your name, email, socials** live in `src/config/site.ts`.
- **Colors, fonts, spacing** are CSS variables in `src/styles/global.css`
  under the `@theme` block — change them once, the whole site updates.
- Everything else (`src/components`, `src/layouts`) is the plumbing; you
  shouldn't need to touch it for routine updates.

## Adding work

Every collection lives under `src/content/<collection>/` and each item is one
file. Copy an existing file in the same folder, rename it, edit the
frontmatter. No build config to touch.

### Filming — `src/content/filming/*.md`
```yaml
category: interview   # interview | short-film | videoclip
title:
  en: "English title"
  pt: "Título em português"
description:          # optional
  en: "..."
  pt: "..."
role:                  # optional, e.g. "Director, Editor"
  en: "..."
  pt: "..."
videoUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
year: 2025
order: 1               # lower = earlier in the section
enabled: true           # set false to hide without deleting
featured: false         # true = this becomes the homepage highlight video
```
The **Videoclips** section on the Filming page only appears once at least one
videoclip item has `enabled: true` — that's how you "turn it on" later
without touching any code. The same trick hides/shows the **Design Projects**
section under Other Works.

### Photography — `src/content/photography/*.yaml`
One file = one gallery (either `kind: event` or `kind: landscape`). Add more
event files for more events; add images to `landscape.yaml` (or add another
landscape file) to grow that gallery.
```yaml
kind: event
title:
  en: "Event name"
  pt: "Nome do evento"
images:
  - src: "/images/photography/my-event/01.jpg"
    alt: { en: "...", pt: "..." }
    size: normal        # normal | wide | tall | large — controls the grid tile size
```
`size` only affects layout on desktop (≥768px); on mobile everything is a
simple 2-column grid. Mix sizes freely — the grid uses CSS `grid-auto-flow:
dense` so it self-packs.

### Stop Motion — `src/content/stopmotion/*.md`
```yaml
material: lego          # boxes | lego
format: reel             # reel | short-film | film | upcoming
orientation: landscape   # landscape | portrait — portrait gets its own
                          # horizontal-scroll "Shorts & Reels" shelf instead
                          # of sitting in the main grid
title: { en: "...", pt: "..." }
videoUrl: "..."          # omit for an "upcoming" placeholder card
thumbnail: "..."         # optional, only needed for non-YouTube links
```
The **All / Boxes / LEGO** filter buttons on the page are generated
automatically from whatever `material` values exist in your content, and
only apply to the main (landscape) grid.

### Other Works — `src/content/other/*.md`
```yaml
category: 3d-design      # 3d-design | motion-graphics | design-project
mediaType: video          # video | image
videoUrl: "..."           # if mediaType: video
image: "..."              # if mediaType: image
```

### Testimonials — `src/content/testimonials/*.yaml`
Shown on the homepage. One file per testimonial:
```yaml
name: "Client Name"        # not translated — it's a proper name
role:                       # optional
  en: "Bride & Groom, Summer Wedding"
  pt: "Noivos, Casamento de Verão"
quote:
  en: "..."
  pt: "..."
avatar: "https://..."      # optional; omit to show no photo
order: 1
enabled: true
```

## Custom cursor

Desktop/trackpad visitors get a small "viewfinder" cursor (corner brackets
+ crosshair) that tightens over clickable elements; it's automatically
disabled on touch devices and for anyone with reduced-motion enabled — see
`src/scripts/cursor.ts`. To change the look, edit
`src/components/CustomCursor.astro` (the markup) and the `CUSTOM CURSOR`
block in `src/styles/global.css` (the styling/animation) together.

## Images & video

- **Video**: paste a normal YouTube or Vimeo share/watch link into
  `videoUrl` — `src/utils/media.ts` converts it to an embeddable URL
  automatically, and derives a thumbnail automatically for YouTube. For
  Vimeo, set `thumbnail` explicitly (Vimeo needs an API call we skip at
  build time). You can also point `videoUrl` at a direct `.mp4`/`.webm`
  file (e.g. something you host in `public/videos/`).
- **Images**: put files in `public/images/...` and reference them as
  `/images/...` in frontmatter, or link to any external URL.
- **Placeholders**: right now, video entries point at a few public-domain
  Blender Foundation trailers (Big Buck Bunny, Sintel, Tears of Steel) and
  photos use picsum.photos placeholder images — purely so the site looks
  complete out of the box. Swap them all out for your real work before
  publishing.

## Languages

Routing is handled by Astro's built-in i18n: English lives at the root
(`/`, `/filming`, ...) and Portuguese is prefixed (`/pt`, `/pt/filming`,
...). The language switcher in the header/footer always links to the
*equivalent* page in the other language.

- Add/change UI copy in `src/i18n/ui.ts` (needs both an `en` and `pt` value
  for every key).
- Work content is bilingual per-item (see the frontmatter examples above) —
  there's no need to duplicate content files per language.

## Changing the look

Open `src/styles/global.css` and look for the `@theme` block near the top —
every color, font and radius used across the site is a variable there:

```css
--color-ink-950: #14110f;   /* page background */
--color-amber-500: #d8a31d; /* primary accent (buttons, links, active states) */
--font-display: "Space Grotesk", ...;
```

Change a value, save, and every component using that token updates. Fonts
are loaded via Google Fonts in `src/layouts/BaseLayout.astro` — swap the
`<link>` there if you pick different families.

The recurring visual motif (thin corner brackets + `CODE_01`-style labels on
every media card) is the `.slate-frame` / `.timecode` CSS classes, also in
`global.css`, borrowed from camera viewfinders and clapperboard slates.

## Structure

```
src/
  config/site.ts          your name, email, socials
  i18n/ui.ts               all UI copy (en + pt)
  i18n/utils.ts            translation + locale-routing helpers
  content.config.ts        schema for the 4 content collections
  content/
    filming/*.md
    photography/*.yaml
    stopmotion/*.md
    other/*.md
  components/
    pages/                 one file per page's content (Home.astro, Filming.astro, ...)
    react/                 interactive islands: VideoPlayer, PhotoMosaic
    *.astro                shared chrome: Nav, Footer, WorkCard, SectionHeading...
  layouts/BaseLayout.astro head/meta + nav/footer wrapper
  pages/                   route files (thin — each just renders a components/pages/* file)
  pages/pt/                Portuguese route files
  styles/global.css        theme tokens + background/animation styles
```

## Contact form

The contact form builds a `mailto:` link client-side (no backend needed) —
see the `<script>` at the bottom of `src/components/pages/Contact.astro`.
If you'd rather have real in-page submissions, swap it for a service like
Formspree, Getform, or Netlify Forms (a few lines in that same file).

## Deploying

`npm run build` produces a fully static `dist/` folder — drag-and-drop it
onto Netlify/Vercel/Cloudflare Pages, or point any static host at it. If you
deploy to a subpath or custom domain, update `site` in `astro.config.mjs`.
