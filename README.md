# hark_birding

The Harker Ornithology Report, served at
**https://birds.felipeharker.org/**: a personal birding project built on
Cornell Lab tools and services (eBird, Macaulay Library, Merlin Bird ID). A
Next.js app turns exported eBird data into a browsable report — map, location
index, checklists, media and written field notes. Linked from the portfolio,
[felipeharker.org](https://felipeharker.org/).

One of four sites built to the same standard, each in its own repository:

| Site | Address | Repository |
|---|---|---|
| Portfolio, and the standards | https://felipeharker.org/ | [`hark_web`](https://github.com/felipeharker/hark_web) |
| Academic | https://academic.felipeharker.org/ | [`hark_academic`](https://github.com/felipeharker/hark_academic) |
| Birding | https://birds.felipeharker.org/ | `hark_birding`, this one |
| Resume | https://resume.felipeharker.org/ | [`hark_resume`](https://github.com/felipeharker/hark_resume) |

## Layout

- **`web/`** — the app: Next.js, exported as fully static HTML. There is no
  server and no database; every page is pre-rendered at build time into
  `web/out/`, which Render publishes.
- **`observation-data/`** — the eBird CSV exports that power the site
  (`ebird-data-latest.csv`, `ebird-media-latest.csv`), and earlier exports in
  `archive/`.
- **`web/field-notes/`** — Markdown trip reports rendered in the Field Notes
  section, one file per note.
- **`notebook/`** — personal trip-planning notes and field-guide PDFs;
  reference material, not used by the site. The folder stays on disk and out
  of the repository: the notes are personal, the guides third-party.
- **`tools/`** — `check.mjs` checks the built pages against the standard;
  `serve.mjs` serves the build as Render will; `site.mjs` holds this site's
  address and the family's.

[`user_guide.md`](user_guide.md) is the non-developer's guide to editing every
part of the site; [`web/AGENTS.md`](web/AGENTS.md) is the working brief for
coding agents, after [`AGENTS.md`](AGENTS.md).

## What builds each part of the page

| Source | What it produces |
|---|---|
| `observation-data/ebird-data-latest.csv` | Map pins, the location index, species tables, and one page per checklist. |
| `observation-data/ebird-media-latest.csv` | The Media section and the photo lightboxes. |
| `web/field-notes/field-note-*.md` | The Field Notes section. |
| `web/src/lib/siteConfig.ts` | Site title, subtitle, byline, the abstract, the off-site links (the Dove Habitat site among them), and the links to the rest of the family. |

Observations are never written into markup — a change to a bird, a place or a
count is a change to a CSV. The project's own settings are the exception, and
they live in one module rather than in a config file beside it.

## Running the app locally

Node 20.9 or newer.

```bash
cd web
npm install
npm run dev      # http://localhost:3000/
npm run build    # static export into web/out/
npm run lint
```

Then, from the repository root:

```bash
node tools/check.mjs      # every built page against the standard
node tools/serve.mjs      # web/out/ at http://localhost:8000/, as Render serves it
```

## Updating data

1. Export your data from eBird and your media from the Macaulay Library.
2. Move the current `observation-data/ebird-data-latest.csv` and
   `ebird-media-latest.csv` to `archive/` if you want to keep them, then put
   the new exports in their place, keeping the names.
3. `npm run build` in `web/`, then look at it with `node tools/serve.mjs`.
4. Commit and push. Render rebuilds the site — the map, the location index,
   the species tables, and one generated page per checklist.

The exports are published exactly as eBird writes them — every location
name, map pin and field. Never rename, hide or filter anything in them
(`hark_web`, `planning/decisions.md`).

## A field note

Copy `web/field-notes/TEMPLATE.md` to `field-note-<N>.md`, with `<N>` one
more than the highest number there. Fill in the frontmatter (`title` and
`date` required; `location`, `conditions`, `links` optional) and write the
note in Markdown below it. Notes are listed newest first, by the number in
the filename.

## Source layout

```
web/
  field-notes/           Markdown trip reports, one file per note
  scripts/standard.mjs   fetches the shared stylesheet before dev, build and lint
  public/assets/og.jpg   the share card, copied to out/ as it is
  src/app/
    hark.css               the shared standard — generated, git-ignored
    styles_primary.css     this site's own components, commented throughout
    styles_map.css         all map styling (frame, pins, MapLibre chrome)
    layout.tsx             fonts, metadata and the running head
    page.tsx               reads every content source, hands it to HomeDocument
    checklist/[id]/        one static page per submitted checklist
    sitemap.ts             out/sitemap.xml: the report and every checklist page
    robots.ts              out/robots.txt: allow all, and where the sitemap is
  src/components/        HomeDocument, ChecklistDocument, Map, ImageLightbox
    ui/                    shared primitives: Runhead, Section, Masthead, Colophon, MediaGrid, Icons
  src/lib/
    parseEbird.ts          reads both eBird CSVs (server only — it touches the filesystem)
    parseFieldNotes.ts     reads field-notes/*.md
    siteConfig.ts          title, abstract, off-site links, the rest of the family, the site's address
    shareMetadata.ts       a page's canonical address and share card (Open Graph, Twitter)
    formatDate.ts          eBird's two date formats → one display format
```

Every page's `<head>` carries its canonical address and the card a link to
it shows when it is shared, every address absolute on `SITE_URL`
(`metadataBase` in `layout.tsx`). The card's image is the same on every
page: `public/assets/og.jpg`, plain type — the masthead's kicker, title and
subtitle on white, 1200 x 630 — because the photographs are the Macaulay
Library's, linked and never copied.

## Design

The report shares one visual language with every site in the family: Inter
for headings and prose, IBM Plex Mono reserved for recorded data, a grid of
two columns with bracketed labels on the left, a very large title, hairline
rules and whitespace instead of boxes, no bold and no colour — the accent
that means "interactive or selected" is ink. Nothing is numbered.

The standard lives in `hark_web` (`web/standards/`) and is rendered at
https://felipeharker.org/standards/. Before every dev server, build and lint,
`web/scripts/standard.mjs` fetches its stylesheet from
https://felipeharker.org/standards/hark.css into `web/src/app/hark.css` —
never edit that copy. To try an undeployed change to the standard, point
`HARK_CSS` at a local copy of it. This app's own rules are in
`styles_primary.css` and `styles_map.css`; restyling means changing a token,
not hunting through rules. There is no CSS framework and no inline style
objects.

The standard has two designs, sans and serif, and the reader picks one on
felipeharker.org's front page. Every page here links the standard's one
script, https://felipeharker.org/standards/hark.js, in its `<head>`
(`web/src/app/layout.tsx`); it sets the page in the chosen design before it
is drawn. The serif design's rules are in `hark.css`, so the report shows
them from its next build after `hark_web` deploys.

## Deploying

A Render static site, `hark-birding`, deployed from `main` on every push:
build command `cd web && npm ci && npm run build`, publish directory
`web/out`, `NODE_VERSION=22`. The settings are recorded in
[`render.yaml`](render.yaml).

Its address is birds.felipeharker.org, the service's custom domain: a
Porkbun CNAME to hark-birding.onrender.com, an address Render no longer
serves (Render Subdomain: Disabled), so the site has one address. The old address, felipeharker.org/birds/, redirects
here, path and all, from `hark-site`, the portfolio's Render service.
