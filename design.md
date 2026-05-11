# dylanpaulus.com — Design System

Kinetic × Brand visual spec for [dylanpaulus.com](https://dylanpaulus.com).
Source of truth for future contributors. When in doubt, trust this file
and the source under `src/`. Adding a new page? Read Section 14 first.

---

## 1. Project context

**Codebase.** `astro 5.x` + `preact 10.x` + `tailwindcss 3.x`, deployed to
Netlify. Source lives under `src/`:

```
src/
  components/        Astro + Preact components (shared chrome, primitives)
  content/           Markdown post collection (`post`)
  icons/             SVG icons
  layouts/
    BaseLayout.astro Page shell — head, theme bootstrap, header, footer
    BlogPost.astro   Post detail layout (used by [slug].astro)
  markdown/          Markdown render helpers
  pages/             Astro pages — file-based routing
    index.astro      Home (/)
    about/index.astro
    posts/[...page].astro   Posts archive (paginated)
    posts/[slug].astro       Post detail (uses BlogPost.astro)
    courses/index.astro
    tags/[tag].astro
    sitemap.astro
    elsewhere.astro
    rss.xml.ts
  styles/main.css    Global CSS — variables, typography, base elements,
                     utility classes, page-agnostic overrides
  utils/tags.ts      Tag normalization + popularity ordering
```

**Authoring conventions.**

- Static pages and layouts are `.astro` files. Use frontmatter (`---`) for
  build-time data fetching with `getCollection`, `getStaticPaths`, and
  `paginate`.
- Interactive pieces are Preact `.tsx` (`ThemeToggle`, `Accordion`, etc.)
  and hydrate with `client:only="preact"`.
- Tailwind utilities are the default styling tool. Reach for arbitrary
  values (`px-[14px]`, `text-[12px]`, `grid-cols-[300px_1fr]`) when the
  design token isn't expressible with the default scale — this is normal
  in this codebase.
- Brand colors come from CSS custom properties (`var(--brand-ink)`, etc.)
  not Tailwind config. Inline `style="color: var(--brand-…)"` is the
  pattern; do not invent new Tailwind theme tokens for them.
- Theming is `data-theme="light"` / `data-theme="dark"` on `<html>`,
  bootstrapped inline in `BaseLayout.astro` to avoid flicker.
- **Never change site copy.** Copy on existing pages (bio, hero, post
  titles, captions, "Found somewhere else? Let me know in a Github
  issue!", etc.) is preserved verbatim from the previous design. New
  decorative phrasing ("What I make", "Often with", "Sort", etc.) is
  fair game.

---

## 2. Brand palette

Defined in `src/styles/main.css` under `html[data-theme=…]`. Always
reference via `var(--brand-…)` — never hard-code these hex values inside
components.

### Light mode (default)

| Token | Value | Use |
|---|---|---|
| `--brand-paper` | `#f9f9f8` | Page background, info-card surfaces |
| `--brand-ink` | `#111111` | Primary text, dark surfaces (CTA pills), high-contrast UI |
| `--brand-fg1` | `rgba(0,0,0,0.78)` | Body copy on paper, long-form prose |
| `--brand-fg2` | `rgba(0,0,0,0.55)` | Secondary text — meta, captions, eyebrows |
| `--brand-rule` | `#ddd` | Hairline dividers between rows |
| `--brand-rule-strong` | `#ccc` | Section dividers, dashed borders |
| `--brand-card` | `#ffffff` | Lifted cards over paper background |
| `--brand-indigo` | `#5755c9` | Links, primary accents, italic display contrast, indigo CTA |
| `--brand-indigo-hover` | `#1e1c63` | Link hover, code accents |
| `--brand-blue` | `#2b5cbf` | Logo chevron L, decorative SVG |
| `--brand-yellow` | `#f8d306` | Highlight pills, arrow chips, accent dots, TALK chip |
| `--brand-magenta` | `#cb54a1` | Logo bar R, decorative dots, brand color rule on Ko-fi card |
| `--accent` | `#e3d2ef` | Header halo, small arrow chip backgrounds |
| `--link-color` | `#5755c9` | Same as indigo (legacy alias) |
| `--link-hover-color` | `#1e1c63` | Legacy alias |

### Dark mode

| Token | Value | Notes |
|---|---|---|
| `--brand-paper` | `#2a3546` | Page background — muted slate, **not** pure black |
| `--brand-ink` | `#ffffff` | Inverts. White on slate. |
| `--brand-fg1` | `rgba(255,255,255,0.85)` | |
| `--brand-fg2` | `rgba(255,255,255,0.6)` | |
| `--brand-rule` | `rgba(255,255,255,0.18)` | |
| `--brand-rule-strong` | `rgba(255,255,255,0.28)` | |
| `--brand-card` | `#334054` | Lifted card |
| `--brand-blue` | `#01f9ef` | **Teal** — logo chevron L flips to teal in dark mode |
| `--brand-yellow` | `#f8d306` | Same as light |
| `--brand-indigo` | `#b3e3ff` | **Light blue** — links lighten to soft cyan in dark mode |
| `--brand-indigo-hover` | `#84acc5` | |
| `--brand-magenta` | `#cb54a1` | Same as light |
| `--accent` | `#2e2a46` | Halo on dark mode is a deep purple |

**Critical rule: indigo flips.** `var(--brand-indigo)` becomes soft
cyan in dark mode. Intentional and load-bearing — don't override for
"consistency". The italic-indigo display accent and link color both
rely on this.

**Logo color flip.** `Logo.astro` and `LogoMark.astro` use Tailwind's
`fill-[#…] dark:fill-[#…]` to flip the chevron from blue to teal in
dark mode. The wordmark flips from slate-800 to white. Indigo bar L
and magenta bar R stay the same in both modes.

---

## 3. Typography

**Family.** `Inter var` (loaded from `rsms.me/inter/inter.css` via
`BaseHead.astro`), falling back to `Inter` then `sans-serif`. Set on
`:root`. Variable axes used: `wght`, `slnt`. Bold is implemented via
`font-variation-settings` not synthetic bold — see `.font-bold` in
`main.css`.

**Display italic accent (the most distinctive type move).** A single
italic Georgia accent in indigo runs through every display heading on
the site:

```html
<h1>Recently <span class="font-display-italic"
     style="color: var(--brand-indigo);">published</span><span
     style="color: var(--brand-indigo);">.</span></h1>
```

Rules:

- **One accent per heading max.** Two accents in one H1 reads as noise.
- The accent is rendered with the utility class `.font-display-italic`
  (Georgia / Times / serif, `font-style: italic`, `font-weight: 400`).
  No webfont load — Georgia is web-safe.
- Color is always `var(--brand-indigo)` (which auto-flips in dark mode).
- A trailing period on the accent itself is also indigo. Stylistic
  signature: "*published***.**", "*me***.**", "*find me***.**".
- Mid-heading accents are also valid: "Recent *writing*", "Talks I've
  *Given*", "Things I've *taught.*".

**Type ramp.**

| Role | Size (clamp) | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Hero H1 — Home, About, Posts | `clamp(32px, 11vw, 56px)` | 700 | `-0.05em` | `0.9` |
| Hero H1 — Courses, Elsewhere, Sitemap, Tag | `clamp(32px, 6vw, 64px)` | 500 | `-0.035em` | `0.94` |
| Post detail H1 | `clamp(40px, 8vw, 96px)` | 700 | `-0.045em` | `0.95` |
| Featured card title | `clamp(32px, 5vw, 56px)` | 600 | `-0.04em` | `0.98` |
| Course title | `clamp(34px, 5vw, 64px)` | 500 | `-0.035em` | `0.98` |
| Section H3 — About label column | `clamp(28px, 3vw, 36px)` | 500 | `-0.03em` | `1` |
| Section H3 — related, courses, sitemap | `clamp(36px, 5vw, 56px)` | 500 | `-0.04em` | `0.98` |
| Section H3 — elsewhere | `clamp(28px, 4vw, 36px)` | 500 | `-0.025em` | `1.05` |
| Post row title (Home, archive) | `clamp(20px, 2.4vw, 28px)` | 500 | `-0.02em` | `1.15–1.25` |
| Card title (related, info card) | `22px` | 500–600 | `-0.015em` | `1.2–1.25` |
| Body lede (post first paragraph) | `24px` | 400 | — | `1.55` |
| Body — hero bio / about prose | `22px` / `18–19px` | 400 | — | `1.55–1.75` |
| Body — article markdown (`.kb-article p`) | `19px` | 400 | — | `1.75` |
| Card body / sidebar copy | `17px` | 400 | — | `1.6` |
| Description / row excerpt | `14–15px` | 400 | — | `1.5–1.55` |
| Eyebrow / metadata label | `11–12px` | 700 | `0.18–0.2em` | — |
| Slug / breadcrumb (mono) | `12–13px` | 400 | — | — |
| Tag chip text | `12px` | 600 | `0.04em` | — |
| Date / tabular | `13–14px` | 500 | — | — |

Notes:
- Lede uses `color: var(--brand-fg1)` and `text-wrap: pretty`.
- Body lede, hero bio, about prose: `color: var(--brand-fg1)`.
- Eyebrow, slug, description, row excerpt: `color: var(--brand-fg2)`,
  UPPERCASE for eyebrows.
- Post detail H1: `text-wrap: balance`.
- Tag H1: not monospace; `#` is `var(--brand-fg2)`, tag name is the
  italic-Georgia indigo display accent.
- Slug / breadcrumb / sitemap path: `font-family: ui-monospace`.
- Dates / page numbers / counts: always wrap in `.tabular-nums`.

**Helpers (in `main.css`).**

- `.font-display-italic` — Georgia italic 400. Every italic display
  accent uses it.
- `.tabular-nums` — `font-variant-numeric: tabular-nums`. Required on
  dates, years, page numbers, post numbers, counts, read-time.
- `.highlight-pill` — yellow bg, ink text, 8px radius, 0.32em inline
  padding, `transform: rotate(-1deg)`, inline-block. Used only on
  hero H1 proper-noun accents. Static rotation, no hover, no animation.
  Dark-mode color override is in `main.css`.

`main.css` sets cascade defaults for `h1–h5` (weight 600, tight tracking,
line-height 1.15). Overridden per-component for display sizes — don't
rely on the cascade for hero typography.

---

## 4. Layout primitives

### Page container

Every page wraps its content in:

```html
<BaseLayout title="..." description="..." footerVariant="...">
  <div class="max-w-screen-2xl mx-auto">
    <!-- sections -->
  </div>
</BaseLayout>
```

- **Every page** uses `max-w-screen-2xl mx-auto` as the outer container.
  One page-level width, applied uniformly.
- **Post body reading column.** The post-detail article body uses an
  internal `720px 220px` centered grid (see Section 7.4). This is a
  reading-line-length concern, not a page-width concern, and is the
  only inner content constraint that overrides the screen-2xl wrapper.

### Section padding

```html
<section class="px-6 sm:px-10 lg:px-14 pt-{N} pb-{N}">
```

- Horizontal: `px-6 sm:px-10 lg:px-14`. **Always these exact values.**
- Vertical: hero `pt-12 lg:pt-16 pb-8` up to `pt-12 pb-14 lg:pt-20 lg:pb-12`;
  body `pt-10 pb-14` default, `pt-6 pb-6` denser.
- For a top dividing rule, set
  `style="border-top: 1px solid var(--brand-rule-strong);"` inline on
  the `<section>` and pad the inner grid with `pt-10`.

### Two-column body grid (300px label + body)

Used on About for every section. The small Section H3 sits in a 300px
gutter while the body fills the rest. Stacks on mobile.

```html
<div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">
  <h3 class="m-0 …">Experience<span class="font-display-italic" style="color: var(--brand-indigo);">.</span></h3>
  <div>...rows...</div>
</div>
```

### Hero (single column)

Hero sections are single-column: an optional leading eyebrow followed
by the H1. If a hero needs supporting copy, place it directly below the
H1, left-aligned, max-w-[640px]. No right-column side-caption
paragraphs.

### Photo strip (About)

Three columns: `lg:grid-cols-[1.6fr_1fr_1.6fr]`, gap `5` (20px). Aspect
ratios `4/3`, `3/4`, `4/3`. Each photo is wrapped in a card with:

```html
<div class="kb-photo-card relative rounded-3xl overflow-hidden"
     style="aspect-ratio: 4 / 3; box-shadow: 0 10px 30px -8px rgba(0,0,0,0.18);">
  <Image src="..." class="w-full h-full object-cover" loading="eager" />
</div>
```

The drop-shadow is reserved for photo cards only — no other element on
the site uses this lift.

### Border radii

| Radius | Use |
|---|---|
| `8px` | Yellow highlight pill |
| `0.5rem` (8px) | Code blocks, base buttons (legacy) |
| `12px` | Pill nav chip background |
| `14px` (rounded-xl) | Pill nav container |
| `0.5rem` / `12px` | Inline code, small chips |
| `999px` (rounded-full) | All pill buttons, all tag chips, arrow chips, filter strips |
| `16–18px` | Article images |
| `22–24px` (rounded-3xl) | Info cards, photo cards |
| `28px` | Featured cards (Posts archive feature, Courses feature) |

---

## 5. Page chrome

### Header (`src/components/Header.astro`)

- Pill nav centered over the brand halo. Logo (left) is
  `<Logo height={48} />` linked to `/`. `overflow: hidden` so the halo
  can't spill.
- Links in order: `Home`, `Posts`, `Course`, `About`. No Elsewhere, no
  Sitemap — those live in the footer / sitemap.
- Active link: `bg-[var(--brand-ink)] text-[var(--brand-paper)]`.
  Determined by `currentPath.startsWith(href)`, with `/` special-cased
  to `currentPath === "/"`. `/tags/<x>` lights up nothing.
- Theme toggle is the last child of the pill (38×38 rounded-lg slot).
- Pill background: `rgba(255,255,255,0.7)` light /
  `rgba(255,255,255,0.05)` dark, `backdrop-filter: blur(6px)`, 1px
  `var(--brand-rule)` border, padding `5px`.

### Brand halo (`.brand-halo`)

A radial gradient absolutely positioned behind the header.

```css
.brand-halo {
  position: absolute; top: 0; left: 0; right: 0; height: 800px;
  background: radial-gradient(
    ellipse 1100px 420px at 50% -190px,
    var(--accent),
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}
```

**Height is 800px** — the soft tint extends well past the header into
the first hero section. The halo is rendered inside the `<header>` and
clipped by `overflow: hidden`, but visually it bleeds down the page.

### Footer (`src/components/Footer.astro`)

Component accepts a `variant` prop (`"full"` / `"minimal"`) for forward
compatibility but renders the same compact row regardless. Pages pass
`footerVariant="minimal"` on every `<BaseLayout>` call.

Layout: left = copyright ("© 2015 — {year} · Dylan Paulus"); right =
social icon nav + `<LogoMark size={20} />`.
`border-top: 1px solid var(--brand-rule-strong)`,
`color: var(--brand-fg2)`, `text-[13px]`, `py-8`.

**Social icon nav** — `<nav aria-label="Social links">` with three
inline-SVG anchors, 20×20 each:

| Icon | Destination | `data-goatcounter-click` | `target="_blank"` |
|---|---|---|---|
| GitHub | `https://github.com/ganderzz` | `github__click` | yes |
| LinkedIn | `https://www.linkedin.com/in/dylanpaulus/` | `linkedin__click` | yes |
| RSS | `/rss.xml` | `rss__click` | no |

- Each anchor has `aria-label` + `title`; inner `<svg>` is
  `aria-hidden="true"`.
- SVG paths use `fill="currentColor"`. Hover lifts to
  `var(--brand-ink)` via `.kb-footer-icon:hover`.
- External anchors carry `rel="noopener noreferrer"` (Section 11).
- Spacing: `gap-4` between icons; `gap-5` between nav and logo mark.

### Body texture

`<body>` carries a faint dot-paper texture via SVG data URI. Light mode:
`fill='%23000000' fill-opacity='0.22'`. Dark mode swaps to white at 0.05
opacity. Tile is 4×4, repeats. Don't tweak this without a strong reason
— it's a load-bearing part of the "warm hand-built" feel.

---

## 6. Reusable component & pattern catalog

### CTA pills

Three flavors. All `rounded-full`, all use `hover:scale-105 transform-gpu
transition-transform`, all end the label with `→` (single space + arrow
character; not the icon font).

**Primary (dark / ink).** The default "do this" button. Ends with a
plain arrow character (single space + `→`). Hero CTAs use `px-6 py-4`;
card CTAs use the tighter `px-5 py-3` or `px-6 py-3.5`. Both are valid.

```html
<a class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full
         no-underline font-semibold text-[15px]
         hover:scale-105 transform-gpu transition-transform"
   style="background: var(--brand-ink); color: var(--brand-paper);">
  Read the post →
</a>
```

**Outlined.** Secondary action, sits next to a primary.

```html
<a class="inline-flex items-center gap-2 px-6 py-4 rounded-full text-[15px]
         font-medium no-underline hover:scale-105 transform-gpu transition-transform"
   style="border: 1px solid var(--brand-rule-strong); color: var(--brand-ink);">
  Learn more about me →
</a>
```

**Indigo.** Filled-indigo CTA pill used for primary accent links (hero
"Get notified" style links, indigo pagination active state). White text
on `var(--brand-indigo)`. Don't add a yellow arrow chip on indigo — the
contrast is too noisy.

Use the `.kb-indigo-fill` utility class (defined in `main.css`) as the
canonical way to render any filled-indigo surface. It encapsulates the
indigo background plus the correct text color in both modes — white in
light mode and `var(--brand-paper)` slate in dark mode — so the
dark-mode contrast inversion happens automatically (`--brand-indigo`
flips to soft cyan in dark mode, and white-on-cyan would fail WCAG AA).
Apply it to filled tag chips and the active pagination button instead
of hard-coding `background: var(--brand-indigo); color: #fff;`.

### Eyebrows / metadata labels

Small uppercase tracked label that introduces a section. Always:

```html
<div class="text-[11px] uppercase font-bold mb-3"
     style="letter-spacing: 0.2em; color: var(--brand-fg2);">
  Get in Touch
</div>
```

One minor variant: 0.18em letter-spacing for slightly tighter labels
(meta strips, list headers).

Eyebrows are plain uppercase text only — no leading hairline ornament,
no decorative glyphs.

### Section divider rule

A horizontal hairline marking section transitions. Apply as inline
`style="border-top: 1px solid var(--brand-rule-strong);"` directly on
the `<section>`, with the section's `pt-10` doing the breathing.
Stronger rule (`--brand-rule-strong`) for big section breaks; lighter
rule (`--brand-rule`) inside list rows.

### Tag chips (`src/components/TagChip.astro`)

Pill chip — outlined (default), filled indigo, or disabled-link.
Optional count badge, optional `#` prefix.

```html
<TagChip tag="javascript" />                       <!-- outlined link -->
<TagChip tag="javascript" filled />                 <!-- filled indigo -->
<TagChip tag="javascript" disableLink />            <!-- inert span -->
<TagChip tag="javascript" count={17} showHash />    <!-- "#javascript 17" -->
```

Dimensions: `px-3 py-1.5 rounded-full text-[12px] font-semibold`,
`letter-spacing: 0.04em`. Filled uses indigo; outlined uses transparent
bg + `var(--brand-rule)` border + `var(--brand-fg1)` text.

On `/tags/[tag]` rows, the tag list is rendered inline (not via
`TagChip`) so the current tag can be highlighted as a filled indigo
chip while siblings stay outlined.

### Arrow chip (row affordance)

Circular arrow on the right side of list rows. 38×38 outlined for
sparse/dense rows; 28×28 `var(--accent)`-filled (no border) for the
denser Tag-archive and Elsewhere rows. Arrow glyph is `→` or `↗` for
external destinations.

```html
<span class="inline-grid place-items-center w-[38px] h-[38px] rounded-full text-[15px]"
      style="border: 1px solid var(--brand-rule-strong); color: var(--brand-ink);">
  →
</span>
```

### Filter / pagination strip (`.kb-strip`)

Rounded-full translucent bar with backdrop-blur — used on posts archive
(filter + pagination) and tag archive (sibling tags).

```html
<div class="kb-strip flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-5 py-3.5"
     style="border: 1px solid var(--brand-rule); border-radius: 999px;
            background: rgba(255,255,255,0.7); backdrop-filter: blur(6px);">
```

Dark mode override (per-page `<style>`):
`:global(html[data-theme="dark"]) .kb-strip { background: rgba(255,255,255,0.05) !important; }`

### Highlight pill

Inline yellow highlighter for proper nouns on a hero H1. One per page,
on the most prominent heading only.

```html
Hi, I'm <span class="highlight-pill">Dylan.</span>
```

### Post row patterns

Three flavors of post row across the site, visually distinct so the
reader knows where they are.

**Home — sparse row** (`index.astro`). No description, no post number,
single line. Three columns (`1fr | auto | auto`): title, tag list, date
+ arrow chip.

**Posts archive — dense row** (`[...page].astro`, `.kb-post-row-grid`).
Title + truncated description + tag chips on the left, date + read-time
stacked on the right, arrow chip last. External posts get an
`↗ EXTERNAL` chip next to the title and an `↗` arrow chip instead of
`→`.

**Tag archive — dense row with active-tag highlight** (`[tag].astro`,
`.kb-tag-row-grid`). Title + description + row tags on the left, date
in the middle, smaller `var(--accent)`-filled arrow chip on the right.
The active tag inside each row's tag list renders as a filled indigo
chip (`.kb-indigo-fill`); other tags stay outlined. No read-time
column, no leading post-number column.

All row variants share:
- `border-bottom: 1px solid var(--brand-rule);`
- Block link target (whole row clickable).
- Hover wash: `rgba(87, 85, 201, 0.05)` light /
  `rgba(179, 227, 255, 0.06)` dark. No scale, no shadow, no underline.

### Featured / hero card

Large 2-column `rounded-[28px]` card on `var(--brand-card)` with
`1px solid var(--brand-rule)` border. Used twice:

1. **Posts archive featured (page 1).** Left: `LATEST` yellow badge,
   meta, title, summary, tag chips, dark CTA. Right: tinted gradient
   panel (`var(--accent)` → `var(--brand-paper)`) with inline brand SVG
   chevron decoration.
2. **Courses featured.** Left: `FEATURED` indigo badge, course meta,
   title, summary, tag chips, "Go to Course" CTA. Right: tinted
   gradient panel containing the real course-card screenshot
   (`/images/create-react-libraries-card.png`), tilted `rotate(-2deg)`,
   plus a `Course №01` italic Georgia ornament bottom-right.

### Info-card grid (3-up)

Three outlined `rounded-3xl` cards on `var(--brand-paper)` background,
`1px solid var(--brand-rule)`. Each: eyebrow, 22px title, 14px body.
Used at the bottom of `/courses`; reusable for any "three things"
surface.


---

## 7. Page-by-page spec

When adding a new page, follow the closest existing pattern; don't
invent a new layout.

### 7.1 Home (`/` — `src/pages/index.astro`)

Two sections: hero + recent writing.

**Hero** (`pt-12 pb-14 lg:pt-20 lg:pb-14`).
- H1: "Hi, I'm <Dylan.>" with highlight pill, then italic-indigo
  "Full-Stack Software Engineer", then plain " / Engineering Manager".
  Size `clamp(32px, 11vw, 56px)`, weight 700, line-height 0.9, tracking
  `-0.05em`. Italic accent on the primary role only.
- Bio paragraph: 22px / 1.55, `color: var(--brand-fg1)`, max-w-3xl.
  Inline AirGarage link uses indigo underline
  (`text-decoration: underline; text-decoration-thickness: 2px;
  text-underline-offset: 4px;`). Reuse this for any narrative inline
  link.
- Two CTAs: dark "Read the blog →" + outlined "Learn more about me →".

**Recent writing.** H2 "Recent *writing*" + "See all posts →" indigo
link with 2px bottom border. 5 most recent posts via
`getCollection("post", ({data}) => data.published)` sorted desc, sliced
to 5. Sparse row pattern (Section 6). Slug normalization: if
`post.slug` includes `/`, use the part after the slash
(`YYYY/slug` → `slug`).

### 7.2 About (`/about` — `src/pages/about/index.astro`)

Seven sections: hero → photo strip → about-me prose → experience →
technologies → talks → contact strip.

**Hero** (`pt-12 pb-10 lg:pt-20 lg:pb-12`). H1 "Hi, I'm <Dylan.>" with
highlight pill, `clamp(32px, 10vw, 56px)`.

**Photo strip.** `lg:grid-cols-[1.6fr_1fr_1.6fr]`. Images:
`/images/about-image.jpg` (drums, 4/3), `/images/hike.jpg` (Golden
Lakes Loops, 3/4), `/images/boise-code-camp.jpeg` (speaking, 4/3).

**About me prose.** Two-column grid (300px label / body). H3 "About
*me*". Two paragraphs of preserved bio copy (Nintendo 64 origin
story + AirGarage — both non-negotiable per Section 13).

**Experience.** Same grid. Per row: 120/180px year column (tabular
nums, fg2), role at 20–26px medium, linked company name at 15px fg2.
Row separator: `border-bottom: 1px solid var(--brand-rule)`.

**Technologies stack.** H3 "Technologies *I've Worked In*". Flex-wrap
of outlined pills (`px-4 py-2.5 rounded-full text-[15px] font-medium`,
`1px solid var(--brand-rule-strong)` border). Last stack entry is
`"...and more!"`.

**Talks.** Same grid pattern. Three columns: year (60–80px, tabular
nums), title (18–22px medium), venue (right-aligned on `sm+`).

**Contact strip.** `rounded-3xl` card, `bg-white dark:bg-slate-700`
(the only place a Tailwind dark utility overrides a brand variable —
keep it). Eyebrow "Get in Touch", heading "Do you have a question?
Feedback? Or have an opportunity you'd like to discuss?", yellow
`Contact me →` button with `data-goatcounter-click="contact-me__click"`.

### 7.3 Posts archive (`/posts` and `/posts/[2..N]` — `[...page].astro`)

`paginate(posts, { pageSize: 10 })`. Page 1 = 1 featured + 9 list rows;
pages 2+ = 10 list rows.

Sections: hero → filter/pagination strip → featured card (page 1) →
list → bottom pagination + popular tags.

**Hero.** Eyebrow `{totalPosts} articles since 2015` + H1 "Recently
*published*<span indigo>.</span>".

**Filter strip** (`.kb-strip`, Section 6). Left: `Filter` label + `All`
(active, dark fill) + 4 popular tags. Right: `Page X of Y` + arrows +
numbered buttons (active = filled indigo via `.kb-indigo-fill`).
URL convention: page 1 = `/posts`, page N = `/posts/${N}`.

**Featured card** (page 1 only). First post becomes featured; rest
become the list. See Section 6 "Featured / hero card".

**List.** Dense row pattern. The link is the outer `<a class="kb-post-row block">`;
the inner div carries the grid template (not on the anchor itself).
External posts use `target="_blank"` + `↗ EXTERNAL` chip + `↗` arrow.
Description trim: 160 chars → ellipsis (use `trimDescription` helper).

**Bottom row.** Two columns. Left: `Popular tags` eyebrow + 12 TagChips
with counts and `#` prefix + "Browse the full sitemap →" indigo link.
Right: page indicator + "Older posts →" CTA (or "You're all caught up."
inert pill on the last page).

### 7.4 Post detail (`/posts/[slug]` via `BlogPost.astro`)

`footerVariant="minimal"` is mandatory. The article body uses a
**fixed-track centered grid** — do not change to `1fr 220px` or the
article column will hug the left edge.

```css
.kb-post-grid {
  display: grid;
  grid-template-columns: minmax(0, 720px); /* mobile / narrow */
  gap: 64px;
  justify-content: center;
}
@media (min-width: 1100px) {
  .kb-post-grid {
    grid-template-columns: 720px 220px; /* fixed reading column + TOC */
  }
}
```

**Article header** (`max-w-screen-2xl mx-auto`).
- Breadcrumb: `Posts / <slug>` (slug in monospace, 12px).
- Date strip: 12px uppercase, 0.18em tracking. Just the formatted date.
- H1 (96px cap), `text-wrap: balance`, `data-pagefind-body`.
- Optional series line: italic Georgia "Part of the *<series>* series."
  if `frontmatter.series` set.
- Meta strip (between two hairlines, `py-5`): `Read time` + value | tag
  chips (max 4) | spacer | `↗ Share` outline pill (mailto with
  prefilled subject + body).

**Article body grid.** Left column: optional hero image
(`rounded-2xl shadow-lg`), then `<article class="kb-article"
data-pagefind-body>` containing `<slot />`. External-link posts get an
"↗ External article" callout above the slot and a "Read on the original
site" CTA after.

**Sticky TOC** (right column, `lg:1100+` only). Built client-side from
`<h2>` elements via inline `<script>`.
- Each TOC item: `<a class="kb-toc-link" href="#section-N">title</a>`.
- Active state via `IntersectionObserver`, rootMargin `-15% 0px -65% 0px`.
  Active item gets indigo left border + bold ink text.
- Below TOC: `Quick links` card with Edit on GitHub
  (`/edit/master/src/content/post/<year>/<slug>/index.md`), Cite this
  post, RSS feed.
- Sticky offset: `top: 24px`.

**Article body styles** (`.kb-article`, in `<style is:global>` at the
bottom of `BlogPost.astro`):
- Lede paragraph (first `<p>`): 24px / 1.55, `var(--brand-fg1)`,
  `text-wrap: pretty`.
- Body paragraphs: 19px / 1.75, `var(--brand-ink)`.
- H2: 40px / 1.05, weight 600. H3: 26px / 1.2, weight 600.
- Inline `code`: mono, 0.88em, indigo border + tinted bg,
  `var(--brand-indigo-hover)` text; tints flip in dark mode.
- `pre` code blocks: `#1a1f2b` slate bg (always dark, both themes),
  13.5px mono, 14px radius, padding `20px 22px`.
- Pull-quote `blockquote`: 4px yellow left rule, Georgia italic 24px,
  no quote glyphs.
- Article images: 18px radius. `figcaption`: italic Georgia 13px
  centered, `var(--brand-fg2)`.
- Code copy chip (injected by client script): top-right of each `<pre>`,
  pill-shaped, yellow dot + "Copy" label. Click → "Copied" for 1.2s.

**Related posts** (`max-w-screen-2xl`). Computed in `[slug].astro`'s
`getStaticPaths` from tag overlap (top 3). Each card:
`var(--brand-card)` bg, 1px rule border, 22px title, truncated
description (110 chars), 2 disabled-link tag chips. When `p.externalLink`
is set, the title row gets an `↗ External` chip and the card opens in a
new tab. If no related posts qualify, the page ends at the article body.

### 7.5 Course (`/courses` — `src/pages/courses/index.astro`)

Single course (Creating React Libraries from Scratch). Sections: hero →
featured course card → curriculum → 3 info cards.

**Hero.** Single column. H1 "Things I've *taught*." at
`clamp(32px, 6vw, 64px)`, weight 500. Page opens directly with the H1.

**Featured card** (Section 6). Right panel contains the real
course-card screenshot (`/images/create-react-libraries-card.png`)
tilted -2deg + a "Course №01" italic Georgia ornament bottom-right.
Course summary copy is preserved verbatim ("Building a library is so
much more than just the code…", Section 13).

**Curriculum.** H3 "What you'll *cover*" + meta `6 chapters`. 6 modules
in a `md:grid-cols-2` grid. Each card: 22px title + bulleted topic list
with em-dash bullets. Odd children get `border-right` on `md+`; all
have `border-bottom`.

**Info cards.** 3-up info-card grid (Section 6) — "Who it's for",
"What you'll need", "Format". Cards sit on `var(--brand-paper)`
(slightly tinted by the dot texture, distinguishing from the featured
card's `var(--brand-card)`).

### 7.6 Tag archive (`/tags/[tag]` — `[tag].astro`)

One static page per tag. Minimal: breadcrumb, headline, sibling tags,
article list.

**Hero.** Breadcrumb `Posts / Tags / <tag>` (mono). Eyebrow
`Tag · N article(s)`. H1 is `#<tag>` at `clamp(32px, 6vw, 64px)`,
weight 500, line-height 0.94, tracking `-0.035em`. The `#` is
`var(--brand-fg2)`; the tag name renders as one italic-Georgia indigo
accent.

**Sibling tags strip** (`.kb-strip` variant with `overflow-x-auto`).
Computed from co-occurrence of `tag` in matched posts' tag arrays,
sorted by frequency, top 8. Each sibling: monospace tag + count badge.

**List header.** H3 "Articles" at 28px weight 500. Always newest-first;
no sort controls.

**List.** Dense row pattern (Section 6). At `lg+`: title + description
+ row tags (`1fr`) | date (`180px` tabular nums, fg2) | arrow chip
(`32px`, `var(--accent)` filled). Active tag in row tag list renders as
`.kb-indigo-fill`.

No pagination, no end-of-list note. The page ends at the last article
row.

### 7.7 Sitemap (`/sitemap` — `sitemap.astro`)

Printed-book-style index of pages and tags.

**Hero.** Single column. Eyebrow `Sitemap · everything in one place` +
H1 "The whole *map*." at `clamp(32px, 6vw, 64px)`, weight 500.

**Pages grid.** 3 columns separated by hairlines, between two
`var(--brand-rule-strong)` rules. Groups: Reading, Surfaces, Feeds.
Each row: monospace path (140px column, fg2) + 16px title. Current
page = weight 600 + indigo 2px bottom border.

**Tag clusters.** Hand-curated theme buckets defined inline in
`sitemap.astro`:

| Letter | Label | Theme |
|---|---|---|
| A | Frontend craft | js/ts/react/css/astro/… |
| B | Data & databases | postgresql/sql/timescaledb/… |
| C | Engineering practice | productivity/git/devops/aws/… |
| D | Thinking & writing | meta/personal/books/mental-health/… |
| E | AI & internet | llms/chatgpt/prompt-engineering/… |
| F | Other | auto-bucket for tags not in A–E |

**Adding a new tag:** add it to the appropriate cluster's `names`
array. Unassigned tags auto-fall into "Other" (F).

Each cluster row: 2-column grid (120px label / 1fr tags). Label:
italic Georgia letter (`A.`, 64–96px, indigo) + cluster name (13px).
Tag column: flex-wrap of `#<tag>` mono links — all 16px / 1.4 / weight
400 / `var(--brand-ink)`, `#` in `var(--brand-fg2)`. No count badges,
no size scaling.

### 7.8 Elsewhere (`/elsewhere` — `elsewhere.astro`)

Off-site index. Three sections: socials → writing elsewhere → talks.

**Hero.** Single column, no leading eyebrow. H1 "Where else / you'll
*find me*." at `clamp(32px, 6vw, 64px)`, weight 500. Below the H1
(left-aligned, max-w-[640px], italic Georgia 17px, `var(--brand-fg2)`):
the preserved-copy note "Found somewhere else? Let me know in a
[Github issue](https://github.com/ganderzz/dylanpaulus.com/issues/new)!"
(Section 13).

**Socials grid.** `lg:grid-cols-3 sm:grid-cols-2 grid-cols-1`. 5 cards:
GitHub, LinkedIn, Ko-fi, Email, RSS. Each card carries a **4px top
accent rule** in the platform's brand color:

| Platform | Accent rule |
|---|---|
| GitHub | `var(--brand-ink)` |
| LinkedIn | `var(--brand-indigo)` |
| Ko-fi | `var(--brand-magenta)` |
| Email | `var(--brand-indigo)` |
| RSS | `var(--brand-yellow)` |

The top rule is the only place each platform's color appears. Card
body: eyebrow + accent arrow chip top row, 28px handle, 13px mono URL.

**Writing elsewhere.** H3 "Writing *elsewhere*" with no count meta on
the heading. Grouped by publisher. Each publisher block: H4 + bare
numeric count (`{pub.items.length}`, tabular nums) + bottom rule, then
articles. Each row: title (16–18px medium) + accent arrow chip on the
right; whole row is a link opening in a new tab.

Publishers are real (Tiger Data, Fortune, Newline, CssTricks). Don't
fabricate.

**Talks.** H3 "Talks I've *given*" + `{talks.length} talks` count.
Columns: year (mono) | yellow `TALK` chip | title | venue. Reserve
magenta for `PODCAST` and blue for `INTERVIEW` if those types are
added.

---

## 8. Animations & motion

| Animation | Where | Spec |
|---|---|---|
| Pill button hover | Every CTA pill | `hover:scale-105 transform-gpu transition-transform` |
| Row hover wash | Post / tag / elsewhere rows | `rgba(87, 85, 201, 0.05)` (light) / `rgba(179, 227, 255, 0.06)` (dark). No transition duration set; instant. |
| Card hover scale | Related-posts card | `hover:scale-[1.01] transform-gpu transition-transform` |
| Footer icon hover | Footer social icons | `transition-colors` (Tailwind default 150ms) — fg2 → ink on hover. |
| Code copy chip | Post-detail code blocks | `transition: background 0.15s` on chip. Click flips text "Copy" → "Copied" for 1.2s. |
| Page transition | None | Astro's `transition:animate="fade"` is on the header but disabled site-wide otherwise. Don't add view transitions; they break the sticky TOC. |

**Highlight pill rotation** is `transform: rotate(-1deg)` static, never
animated.

---

## 9. Responsive behavior

The site is designed mobile-up. Breakpoints used (Tailwind defaults):

- `sm:` ≥ 640px — small adjustments to font size, padding tier 2.
- `md:` ≥ 768px — secondary columns appear on dense rows.
- `lg:` ≥ 1024px — full asymmetric grids, photo strip, label-column
  layouts.
- `1100px` (custom) — Post-detail TOC appears.

**Patterns to preserve when adding new pages:**

- Section padding ramp: `px-6 sm:px-10 lg:px-14`.
- Display H1: `clamp(min, vw, max)` — never fix to a single size.
- Asymmetric grids: stack vertically on mobile, switch at `lg:`.
- Tag-archive sibling strip: `overflow-x-auto` instead of wrapping.
- Post-detail TOC: hidden under `1100px`. The whole 720px reading
  column centers itself when there's no TOC.

---

## 10. Analytics

GoatCounter is loaded site-wide via `BaseLayout.astro`:

```html
<script data-goatcounter="https://dylanpaulus.goatcounter.com/count" async
        src="//gc.zgo.at/count.js"></script>
```

Notable click-tracked elements use `data-goatcounter-click`:

- `airgarage__click` — the AirGarage link in the home/about bio.
- `contact-me__click` — the "Contact me" CTA on About (mailto), and the
  Email card on Elsewhere.
- `linkedin__click`, `github__click`, `kofi__click`, `rss__click` —
  socials cards on Elsewhere, plus the footer social icon row (GitHub,
  LinkedIn, RSS).
- `creating-react-libraries-from-scratch__click` — the course CTA.
- `<post-title-slug>__click` — external article CTAs in BlogPost.

**Adding tracking:** drop `data-goatcounter-click="<lowercase-snake-or-dash>__click"`
on the link. Don't invent a different event format.

Pagefind (search) is also loaded via `<script is:inline
src="/pagefind/pagefind-ui.js"></script>`. Article bodies use
`data-pagefind-body` on the H1 and `<article>` so the index picks them
up.

---

## 11. Accessibility

Patterns to preserve:

- `<a href="#main" class="skip-link">Skip to main content</a>` is the
  first focusable element. The `.skip-link` style positions it
  off-screen until focused.
- Every page has a single `<h1>` with a stable id (`#main-content` on
  post detail, default-rendered on others).
- `tabindex="-1"` on the post-detail H1 lets it receive focus
  programmatically when you skip-to-main.
- Decorative SVGs (chevron decorations, marquee glyphs, accent halo)
  use `aria-hidden="true"`.
- Logo SVG has `aria-label="Dylan Paulus"` + `<title>Dylan's Logo</title>`.
- Pill nav uses `<nav aria-label="Main menu">`.
- TOC uses `<aside aria-label="Table of contents">`.
- Theme toggle button is a real `<button>`, not a span.
- All form inputs have `aria-label`.
- Every interactive element passes WCAG AA contrast in both themes.
- Animations respect `prefers-reduced-motion: reduce`.
- Every `target="_blank"` anchor carries `rel="noopener noreferrer"` — site-wide convention.

The header stacks (logo above pill nav) on narrow viewports via
`flex-col gap-4 lg:grid lg:grid-cols-[auto_auto]` on the inner
container. Don't introduce a hamburger menu.

---

## 12. Asset references

Site images live in `public/images/`; SVG icons live in `src/icons/`
(inlined where needed).

- `/images/about-image.jpg` — drums photo (4/3 crop).
- `/images/hike.jpg` — Golden Lakes Loops photo (3/4 crop).
- `/images/boise-code-camp.jpeg` — speaking photo (4/3 crop).
- `/images/create-react-libraries-card.png` — course card screenshot
  used in `/courses` (real image, not a placeholder).
- `src/icons/github.svg`, `linkedin.svg`, `rss.svg`, `external-link.svg`,
  `logo.svg` — inlined into components (Footer, Logo, LogoMark).

---

## 13. Copy guardrails

Verbatim, do-not-edit copy:

- "Hi, I'm Dylan." (with yellow highlight on "Dylan.")
- "I have been building highly performant software and engineering
  teams for over a decade. Currently, I'm bringing real estage online
  as a Staff Fullstack Software Engineer at AirGarage." (yes, "real
  estage" — that's the existing copy. Do not "fix" it.)
- "My interest in computers started when I was six years old, waking up
  for Christmas, ripping open a brand new Nintendo 64 gaming console,
  slamming in the Super Mario 64 cartridge, and seeing the red hat
  plumber in all his 3D glory. Ever since then I have been learning
  everything I can about software development."
- "Fast-forward to today, I am a Staff Fullstack Software Engineer at
  AirGarage."
- "Image of Dylan playing drums" (alt text for drums photo)
- "Do you have a question? Feedback? Or have an opportunity you'd like
  to discuss?" (contact)
- "Places I've appeared outside of this website." (elsewhere hero)
- "Found somewhere else? Let me know in a Github issue!" (elsewhere
  italic note)
- "Building a library is so much more than just the code. We need to
  know the ins and outs of versioning, deploying, building,
  documenting, dependency management, module types, tooling, and more.
  This is a daunting task for just one tutorial to cover. Creating
  React Libraries from Scratch will teach you everything you need to
  know to succeed in creating a library." (course summary)

CTA convention: every CTA ends with a single space + `→`
(`Read the blog →`, `Contact me →`, `Go to Course`+chip). The arrow may
be replaced with `↗` (up-right arrow) for off-site destinations.

Voice rules:

- No marketing-speak (empower, delight, 10x, revolutionary, world-class).
- No fake stat boasts (1,800 readers, 50K developers, etc.).
- No vague availability claims (Available Q3 2026, Coming Soon).
- No version stamps (Eleventh edition, v2.3, etc.).
- Tone: friendly senior engineer at lunch. Not personal-brand poster.

---

## 14. Implementation checklist when adding a new page

1. Pick the closest existing page as your scaffold. Copy its frontmatter,
   container width, and section padding ramp.
2. Hero: optional eyebrow + H1 with one italic-indigo accent. Single
   column — no right-column side caption. If supporting copy is needed,
   place it directly below the H1 (left-aligned, max-w-[640px]).
3. Use brand variables for every color. Never hard-code hex values.
4. Use existing components for tag chips and the logo.
   Don't re-implement them inline.
5. Wrap dates / counts / years in `.tabular-nums`.
6. Prefer the section divider rule pattern (top border on the
   `<section>`) over decorative dividers.
7. Pass `footerVariant="minimal"` to BaseLayout.
8. Add hover states on rows: indigo wash. On cards: 1.01 scale.
9. Verify in both light and dark mode — especially that any explicit
   color you pass actually inverts via the brand variable, not via a
   manual `dark:` Tailwind class.
10. Run `yarn build` (107 pages baseline at time of writing) and check
    no new warnings.

---

## 15. What NOT to add

Patterns the site has explicitly rejected. If you find yourself
considering one of these, stop and re-read the relevant page section.

**Chrome / global**
- Hamburger menu (header stacks vertically on narrow viewports
  instead).
- 4-column "full" footer with bio/site/find-me/built-with columns.
  Footer is one row of copyright + social icons + logo mark.
- "Made in Portland, Oregon" footer line.
- View transitions across pages — they break the sticky TOC.
- `target="_blank"` without `rel="noopener noreferrer"`. Always pair
  them.

**Heroes**
- Right-column side-caption paragraphs (e.g. "What I make", "What this
  is", "About this tag", "The short version"). Supporting copy sits
  below the H1 instead.
- Leading hairline ornament (`<span class="block w-7 h-px">`) next to
  hero eyebrows.

**CTAs**
- Yellow circular arrow chip inside CTA pills. Arrows are plain text.

**Home**
- "Lately" / "What I'm into right now" sidebar.
- Marquee. The `Marquee.astro` component exists but is unused; don't
  wire it back in.

**About**
- "Quick facts" mini-table (the photo strip is 3 photos, not 2 + a
  table).

**Post detail**
- Author byline / avatar. The site is one person's; bylines read as
  filler.
- Post-number / "Field notes" slug above the H1. The date strip is
  just the formatted date.
- Numbered section markers (the `§ NN` motif) above article H2s, course
  modules, or TOC links.
- Sign-off block ("Email me" CTA, "Thanks for reading" copy between two
  hairlines). Posts end at the article body or at related posts.
- Meta header row (colored dot, post-number, date) on related-post
  cards. Cards open directly with the title.

**Posts archive & tag archive**
- Sort options other than newest-first.
- Sort row / sort controls on tag archive pages.

**Tag archive**
- Year range (`YYYY → YYYY`) in the eyebrow.
- Leading post-number column (`—NNN` mono) on rows.
- End-of-list "That's all N posts" dashed-card note.
- "All posts" bottom CTA.

**Course**
- "Course №01" Brewing-strip teaser for a future Postgres course (or
  any other "coming soon" teaser).

**Sitemap**
- Tag font-size scaling by post count.
- Per-tag count badges in the cluster index.
- Cluster meta-count line under cluster names.
- Dashed-border legend strip at the bottom.

**Elsewhere**
- "Off-site · all the other places" leading eyebrow.
- "X pieces" count meta next to the "Writing elsewhere" H3.
- Multi-color-gradient "Reading shelf" book covers.
- "Code I maintain" OSS repo list.

**Newsletter**
- Newsletter signup forms, "Subscribe" buttons, or any "subscribe to
  my newsletter" affordance. There is no newsletter.

---

## 16. Quick reference — copy-pastable snippets

**Hero H1 with italic accent + indigo period:**

```html
<h1 class="m-0" style="font-size: clamp(32px, 6vw, 64px); line-height: 0.94; letter-spacing: -0.035em; font-weight: 500; color: var(--brand-ink);">
  Things I've<br />
  <span class="font-display-italic" style="color: var(--brand-indigo);">taught</span><span style="color: var(--brand-indigo);">.</span>
</h1>
```

**Plain eyebrow:**

```html
<div class="text-[12px] font-semibold uppercase mb-7"
     style="letter-spacing: 0.18em; color: var(--brand-fg2);">
  Tag · 17 articles
</div>
```

**Section with top rule + label-column body:**

```html
<section class="px-6 sm:px-10 lg:px-14 pt-10 pb-14"
         style="border-top: 1px solid var(--brand-rule-strong);">
  <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-16 pt-10">
    <h3 class="m-0" style="font-size: clamp(28px, 3vw, 36px); line-height: 1; letter-spacing: -0.03em; font-weight: 500; color: var(--brand-ink);">
      Experience<span class="font-display-italic" style="color: var(--brand-indigo);">.</span>
    </h3>
    <div><!-- rows --></div>
  </div>
</section>
```

**Primary CTA** (`var(--brand-ink)` bg + `var(--brand-paper)` text) and
**outlined CTA** (`var(--brand-rule-strong)` border + `var(--brand-ink)`
text). Both end in plain ` →`, both use
`hover:scale-105 transform-gpu transition-transform`:

```html
<a class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full no-underline font-semibold text-[15px] hover:scale-105 transform-gpu transition-transform"
   style="background: var(--brand-ink); color: var(--brand-paper);">
  Go to Course →
</a>
```

**List-header eyebrow strip** (e.g. posts archive "Everything else"):

```html
<div class="flex items-baseline justify-between mb-7 flex-wrap gap-2">
  <h3 class="m-0" style="font-size: 28px; font-weight: 500; letter-spacing: -0.02em; color: var(--brand-ink);">
    Everything else
  </h3>
  <span class="text-[12px] uppercase font-bold" style="letter-spacing: 0.18em; color: var(--brand-fg2);">
    9 posts · sorted newest
  </span>
</div>
```

---

## 17. Glossary

- **Kinetic × Brand** — visual direction name; also the `kb-` CSS
  namespace.
- **Halo** — soft radial-gradient `--accent` ellipse behind the header.
- **Highlight pill** — yellow rotated inline highlighter on hero proper
  nouns ("Dylan.").
- **Italic accent** — Georgia-italic indigo word(s) in every display
  heading.
- **Pill nav** — rounded-xl translucent header nav; active link is a
  filled ink chip.
- **`kb-` prefix** — design-system class namespace (`.kb-article`,
  `.kb-toc`, `.kb-strip`, `.kb-post-row`, `.kb-indigo-fill`,
  `.kb-footer-icon`, etc.). Reuse for new design-system classes.
