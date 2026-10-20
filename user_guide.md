# Site Editing User Guide

A complete reference for editing every part of the Hark Ornithology site: what
to change, which file to open, and what that change affects. Written for
editing content and styling, not for developing features.

---

## 0. How the site is put together

- **Framework:** Next.js (App Router), exported as a fully static site
  (`output: 'export'` in `web/next.config.ts`). There is no server and no
  database — every page is pre-rendered from files at build time.
- **Styling:** plain CSS, no framework. Three annotated stylesheets:
  `web/src/app/hark.css` (the shared felipeharker.org standard: tokens and
  every common component), `web/src/app/styles_primary.css` (this site's own
  components) and `web/src/app/styles_map.css` (the map). `hark.css` is a
  generated copy of the standard, which lives in `hark_web` — see §4.
- **Where it is served:** https://hark-birding.onrender.com/, at the root of
  its own site.
- **Content:** eBird CSV exports, plus a Markdown file per field note.
- **Settings:** `web/src/lib/siteConfig.ts` — the site title, subtitle, byline,
  abstract, and off-site links, as plain constants in code.

Running it locally:

```bash
cd web
npm install
npm run dev
```

Then open http://localhost:3000/. Edits to `.tsx`/`.css` hot-reload; edits to
CSV/Markdown need a page refresh in dev, or a rebuild for production.

### The whole content pipeline at a glance

| Want to change | Edit this |
|---|---|
| The observations, locations, species, checklists | `observation-data/ebird-data-latest.csv` |
| The photos | `observation-data/ebird-media-latest.csv` |
| A field note | `web/field-notes/field-note-<N>.md` |
| The title, abstract, or an off-site link | `web/src/lib/siteConfig.ts` |
| The accent color, or any color, font, size, or spacing | `web/standards/site/hark.css` in `hark_web`, the standard (§4) |
| The location index, media, field notes, nav bar | `web/src/app/styles_primary.css` |
| Anything about the map's appearance | `web/src/app/styles_map.css` |
| Section names/order, reference links | `web/src/components/HomeDocument.tsx` |

---

## 1. Updating observation data (the eBird CSVs)

- **Location:** `observation-data/` (repo root, *not* inside `web/`).
- **Files:** `ebird-data-latest.csv` (observations — powers the map, the
  location index, species tables, and checklist pages) and
  `ebird-media-latest.csv` (photo metadata — powers the Media section and the
  lightboxes).
- **How to update:** export fresh data from eBird / the Macaulay Library and
  overwrite these two files, keeping the names. Rebuild and the whole site
  follows.
- **Parsing code:** `web/src/lib/parseEbird.ts` maps eBird's column headers
  (`"Common Name"`, `"Location ID"`) to the field names used throughout the app
  (`CommonName`, `LocationID`), and caches the result keyed on each file's
  modification time. A plain data refresh never requires touching it; only a
  change to eBird's export format does.

## 2. Editing the abstract

- **File:** `web/src/lib/siteConfig.ts`, the `ABSTRACT` constant.
- **How:** ordinary text between quotes. The long string is split across
  several lines with `+` purely to keep the source readable — the pieces are
  joined end to end, so keep a trailing space on each line or the words will
  run together.
- **What it affects:** the paragraph under the title on the homepage, nothing
  else.
- **Why it is in code:** it was a Markdown file, read by its own parser, so
  that four sentences could be edited without opening a `.ts` file. In practice
  it changes about as often as the site's title does, and the parser was more
  machinery than the text was worth.
- **A keywords line** used to sit below the abstract. It was removed: it
  repeated the paragraph above it in list form. The abstract block is now the
  label and the prose, nothing else.

## 3. Adding a field note

- **Location:** `web/field-notes/`.
- **How:** copy `TEMPLATE.md` to `field-note-<N>.md`, where `<N>` is the next
  integer after the highest-numbered note. Fill in the frontmatter (`title` and
  `date` required; `location`, `conditions`, `links` optional) and write the
  body as Markdown below the `---`.
- **Sorting:** newest first by `<N>` — the number in the filename, not the
  `date` field. Any file that doesn't match `field-note-<N>.md` exactly (like
  `TEMPLATE.md`) is ignored and never published.
- **Frontmatter fields:**

  | Field | Required | Description |
  |---|---|---|
  | `title` | yes | The note's heading in the list. |
  | `date` | yes | Shown alongside the title; any string works. |
  | `location` | no | Shown in the note's meta section if present. |
  | `conditions` | no | Weather, temperature, wind, visibility. |
  | `links` | no | List of URLs (e.g. eBird checklists), shown below the meta section. |
- **Formatting:** full GitHub-flavored Markdown. How the rendered output looks
  is set by the `.note-body` rules in §7 of `styles_primary.css`.
- **Parsing code:** `web/src/lib/parseFieldNotes.ts`.

## 4. Editing styles

Everything visual is in three files. None has a build step — save and refresh.

### `web/src/app/hark.css` — the shared standard

This file is **generated**. The original is `web/standards/site/hark.css` in
`hark_web`, served at https://felipeharker.org/standards/hark.css, and the
same file styles the portfolio, the academic projects and the resume.
`npm run dev`, `npm run build` and `npm run lint` fetch it here first
(`web/scripts/standard.mjs`), and git ignores the copy, so an edit made here
is lost. To change it:

1. Edit `web/standards/site/hark.css` in `hark_web`.
2. Try it here before it is live:
   `HARK_CSS=../../hark_web/web/standards/site/hark.css npm run dev`.
3. Follow `hark_web`'s steps for changing the standard; once it is deployed,
   every site picks it up — this one on its next build.

Section 1 of the file is a block of **design tokens** — every color, font,
type size, and spacing step the sites use. Nearly every rule is written in
terms of them, so changing a token restyles every site consistently:

| Token group | Controls |
|---|---|
| `--color-bg`, `--color-surface` | Page background; the two faint tints behind a hovered map control and an inline code span. |
| `--color-text`, `--color-text-soft`, `--color-text-mute` | Body copy, secondary prose, captions and labels. |
| `--color-accent` | Links, map pins, the open location row's name, Show / Hide hints. The hover shade and the faint selected-row wash are both derived from it, so changing this one value re-accents the site. |
| `--color-rule-strong`, `--color-rule` | The two divider tints. Both are 1px hairlines; they differ in contrast, not thickness. |
| `--font-body`, `--font-mono` | The sans and monospace faces. To change a family, edit the Google Fonts link in `web/src/app/layout.tsx` and in every static page too. |
| `--weight-regular`, `--weight-medium`, `--weight-strong` | 400 / 500 / 600. Nothing on the site is set bolder than 600. |
| `--size-*` | The type scale: title, section, body, table, data, caption, label. |
| `--track-*` | Letter-spacing: tight for headings, slightly tight for prose, open for uppercase labels. |
| `--space-1` … `--space-7` | Every margin, padding, and gap. |
| `--radius-sm`, `--radius-md` | Corner rounding on controls and thumbnails. Text and tables stay square. |
| `--measure`, `--measure-text` | Page width, and the width running prose is allowed to reach. |

The rest of the file is numbered, commented sections — masthead, abstract,
contents, sections, tables, definition grids, collapsible rows, controls,
references, colophon. The header comment lists them all, and
`web/standards/docs/` in `hark_web` explains each one. (The stylesheet's sections are
numbered so you can find a rule; nothing the *reader* sees is numbered.)

### `web/src/app/styles_primary.css` — this site's own components

The parts of the site no other felipeharker.org site has: the note under the
map, scientific names, the location index, media grids and the lightbox, field
notes, the checklist record, and the nav bar on interior pages. Every rule
reads the tokens from `hark.css`.

**Rule of thumb:** if you're about to write a pixel value or a hex color into a
rule, check whether a token already exists for it.

### `web/src/app/styles_map.css`

The map's frame, its pins, and MapLibre's own controls. Its tokens cover map
height, pin size, and pin colors (which default to the site accent).

**One important limit,** explained at the top of that file: a MapLibre map has
two layers of appearance and only one of them is CSS. The **basemap** — roads,
water, land color, labels — is a MapLibre *Style JSON* document served by the
tile provider, selected by URL in the `BASEMAP_STYLE_URL` constant in
`web/src/components/Map.tsx`. To change how the basemap itself looks, point
that constant at a different style URL. Everything drawn *on top* of the
basemap is ordinary HTML, and that is what `styles_map.css` controls.

## 5. Site settings

Edit `web/src/lib/siteConfig.ts`. Everything in it is a plain constant — change
the text between the quotes and save.

- **`SITE_TITLE`** — the masthead heading, the browser tab, and the brand in
  the nav bar on interior pages.
- **`SITE_SUBTITLE`**, **`SITE_AUTHOR`** — the two lines under the homepage
  title.
- **`SITE_DESCRIPTION`** — the description search engines and link previews
  read.
- **`ABSTRACT`** — the summary paragraph on the homepage (§2).
- **`SITE_LINKS`** — the repository, eBird profile, Macaulay Library and Merlin
  URLs, and the Dove Habitat site. Each is written once here and used in
  several places, so the navigation bar, the reference list and the colophon
  can never disagree. The Dove Habitat link is in the reference list only;
  the site is a project of its own, with a tile on the portfolio.
- **`SITE_FAMILY`** — the site links at the foot of every page: the
  portfolio, the academic projects, this report and the resume, also used by
  the running head. This report's own link is `/`; the others are absolute
  addresses, and plain links, not Next links. Links to them open in the same
  tab; links anywhere else open a new one.
- **`STANDARDS_URL`** — `https://felipeharker.org/standards/`, linked from the colophon and the
  Reference section.

The **accent color** is not here: it is the `--color-accent` token in the
shared standard, `hark.css`, alongside every other color (§4).

These used to live in a `public/options.csv` read at build time. Nothing but
this project ever wrote that file, and a CSV with three rows in it needed a
parser, a set of default values, and a list of alternative spellings for its
keys to stay working. As constants they need none of that, and a typo is caught
by the build instead of silently falling back to a default.

## 6. Page structure and section names

**File:** `web/src/components/HomeDocument.tsx`.

- **`SECTIONS`** at the top of the file drives the table of contents. Reorder or
  rename entries here and the index follows. The `id` of each entry must match
  the `id` passed to its `<Section>` further down.
- **`REFERENCES`** is the link list in the Reference section — label, href, and
  description per entry. It is a plain list: no numbering, and nothing in the
  prose above points at it with a superscript marker.
- **The masthead** (eyebrow, title, subtitle, byline, dateline) is the shared
  `<Masthead>` component near the top of the returned JSX. The title, subtitle
  and byline come from `siteConfig.ts`; the dateline is computed from the most
  recent date in the observation data.
- **Section blocks** come from `web/src/components/ui/Section.tsx` —
  `<Section>` for a plain block, `<Disclosure>` for a row inside one that
  collapses. Use these rather than writing the heading markup by hand, so every
  page stays consistent.
- **Off-site URLs** (the repository, the eBird profile, Macaulay, Merlin, the
  Dove Habitat site) live in `web/src/lib/siteConfig.ts`, so each is written
  once.

## 7. Collapsible rows

Locations and Media are the same list twice: the section itself stays open and
lists every place once, and each place is a row that opens in place. Both are
the browser's native `<details>`/`<summary>` element.

- **Locations** lists every site you have recorded, busiest first. Opening a row
  shows that site's place and observation count, its checklists, and every
  species seen there. Only one location is open at a time, because a row can
  also be opened from outside itself — by arriving at a `?locationId=…` URL, or
  by clicking a pin on the map. That is the one place where React tracks an open
  state (`selectedLocationId`) rather than leaving it to the browser, and it is
  also why the open row's name is set in the accent colour: the map pin and the
  row have to agree about which location is current.
- **Media** lists every place you have photographed birds, most recently
  visited first. Opening a row shows that place's photos, kept apart by the
  visit they came from: one block per checklist, each with its date, a link to
  its checklist report, and its own grid. Nothing outside a media row can open
  it, so the browser handles those on its own.

The "Show" / "Hide" labels are both present in the markup; CSS decides which is
visible (`.disclosure-hint` in §11 of `hark.css`).

## 8. Checklist pages

**File:** `web/src/app/checklist/[id]/page.tsx`, with the species table in
`web/src/components/ChecklistDocument.tsx`.

One static page is generated per submission ID found in the observation CSV.
The masthead shows the location, place, date and time; the `record` list below
it shows protocol, effort, observers, and any checklist comments — rows with no
data are omitted rather than rendered empty. A checklist with photos gets a
"View Media" toggle.

## 9. Media and the lightbox

- **Grid:** `web/src/components/ui/MediaGrid.tsx`. Thumbnail size and columns
  come from `.media-grid` in §6 of `styles_primary.css`.
- **Images** are loaded directly from the Macaulay Library CDN by catalog
  number — there are no image files in this repository. The URL is built by
  `mediaAssetUrl()` in `MediaGrid.tsx`.
- **Lightbox:** `web/src/components/ImageLightbox.tsx`. Escape closes it; arrow
  keys page through the set — the set being the grid you clicked in, so a
  location visited twice pages through one visit at a time.

## 10. Design standards

The site used to document its design on its own `/design-standards` page. The
standard now covers every site in felipeharker.org's family and lives in
`hark_web`'s `web/standards/`: `docs/` for the rules, and
https://felipeharker.org/standards/ for a page that renders every token and
component. The Reference section links to it.

---

## Areas to leave alone unless you know the code

1. **The parsers** (`web/src/lib/parseEbird.ts`, `parseFieldNotes.ts`) — they
   read and cache the CSV and Markdown files. Changing the field-name mappings
   or the `mtime` caching breaks the site's ability to read your data.
   `parseEbird.ts` reads the filesystem, so only server components may import a
   function from it; that is why `formatDate.ts` is separate.
2. **`useMemo` / `useState` blocks** in the components — these compute the
   location counts, species totals, and media grouping. Editing the logic inside
   them corrupts what's displayed.
3. **Map camera logic** in `Map.tsx` — the `flyTo` calls and marker positioning.
4. **Build configuration** — `next.config.ts`, `package.json`, `tsconfig.json`.

## Deploying

This report is its own Render static site, `hark-birding`. Push to `main`:
Render runs `cd web && npm ci && npm run build` and publishes `web/out/`
at https://hark-birding.onrender.com/. New commits — including new CSV
data — trigger a rebuild automatically. See the README's Deploying section.
