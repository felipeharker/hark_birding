# Notes for coding agents

The birding report, https://hark-birding.onrender.com/. Read the repository's
[`AGENTS.md`](../AGENTS.md) first; these are the rules particular to this
app.

## Architecture

Next.js App Router, exported statically (`output: 'export'`) with
served at the root of its own site. No server, no database, no CSS framework. Content comes
from files at build time — see the table in [`../README.md`](../README.md).
Render publishes `out/`.

## Rules

- **`src/app/hark.css` is generated.** `npm run dev`, `npm run build` and
  `npm run lint` fetch it first from https://felipeharker.org/standards/hark.css
  (`scripts/standard.mjs`; `HARK_CSS` points it at a local copy instead), and git
  ignores it. Never edit it here: a change to a token or a shared component
  (masthead, sections, tables, disclosures, references, colophon) is made in
  the standard, in `hark_web`.
- **This site's own styling lives in `src/app/styles_primary.css` and
  `src/app/styles_map.css`**, loaded after `hark.css`. Do not add inline style
  objects, and do not reintroduce Tailwind or any other CSS framework. Add a
  commented class to the relevant numbered section instead, and do not restyle
  a class `hark.css` defines.
- **Design tokens first.** Tokens are in `hark.css`; `styles_primary.css` adds
  only `--color-scrim`, `styles_map.css` its map tokens. Prefer a token over a
  hardcoded color, size, or spacing value.
- **Links inside the app are `<Link>`; links out of it are `<a>`.** The site
  links and the standards link are plain `<a>` elements with the absolute
  addresses of the other sites in the family, from `SITE_FAMILY`,
  `RUNHEAD`, `SITE_ROOT` and `STANDARDS_URL` in `src/lib/siteConfig.ts`;
  `externalLinkProps` keeps them in the same tab.
- **Every page opens with `<Runhead>` and ends with `<Colophon>`**
  (`src/components/ui/`): both carry the links to every site in the
  family, and the running head every piece of work too, grouped in menus
  (`RUNHEAD`). The running head is rendered once, by
  `src/app/layout.tsx`, above each page's `<article>`; the colophon is the
  last thing in each page, with the page's own line.
- **Observations are never hardcoded; the project's own settings always are.**
  Birds, places, counts, dates and media come from the CSVs in
  `../observation-data/`, and prose from `field-notes/`. A change that bakes one
  of those into a component is wrong. The site's title, subtitle, byline,
  abstract and off-site links are different in kind — they describe the project
  rather than record an observation — and they belong in `src/lib/siteConfig.ts`
  as plain exported constants.
- **`src/lib/parseEbird.ts` touches the filesystem, so only server components
  may import a *value* from it.** Importing the row types is fine — types are
  erased before bundling — but pulling a function out of it into a `'use client'`
  component drags `fs` into the browser bundle and fails the build. That is why
  `formatDate` sits in its own module: client components format dates too.
- **The field-name maps in `parseEbird.ts` are the only place eBird's column
  headers appear.** Touch them only when eBird changes its export format.
- **Long lists are lists of native `<details>` rows.** Locations and Media are
  the same list twice: a section that stays open, one collapsible row per
  place. Opening is the browser's, not React state — with one exception: a
  location row's `open` state is controlled, because selecting a map pin has
  to open it, and only one location is open at a time.
- **`web/standards/docs/` in `hark_web` states the design language** for
  every site in the family, and https://felipeharker.org/standards/ renders it. Before changing type, color,
  or rules, read it — a change there is a change the whole site follows.
- **Reuse the primitives in `src/components/ui/`.** `Runhead`, `Section`,
  `Disclosure`, `Masthead` and `Colophon` exist so that every page emits the
  same markup for the same thing.
- **Fonts load with a `<link>` in `src/app/layout.tsx`**, the same Google
  Fonts link every static page has. Do not reintroduce `next/font`: it
  downloads the fonts during `next build`, and a failed download (or its
  Turbopack bug) fails the deploy.
- **`tsconfig.json` is rewritten by `next build`.** It re-adds `allowJs` and
  reformats the file; edits that fight it are churn, not cleanup.

## Verifying

`npm run build` (type-checks and pre-renders every page) and `npm run lint`
both have to pass, and so does `node tools/check.mjs` from the repository
root. There is no test suite.
