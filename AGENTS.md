# hark_birding — agent guide

The birding report, https://hark-birding.onrender.com/. Read
[`README.md`](README.md) first, then [`web/AGENTS.md`](web/AGENTS.md) for the
app. It is one of four sites built to one standard; the standard, the
decision log and the roadmap for all four live in
[`hark_web`](https://github.com/felipeharker/hark_web) (`web/standards/`,
`planning/`).

## Rules

1. **`main` is live.** Render builds and deploys every push to `main`. Work on
   a branch; push or merge to `main` only when the user asks. Never change
   Render settings unless asked.
2. **The repository is public.** Every file here can be read by anyone, not
   only what is served. No secrets, no `.env`, no private notes; `notebook/`
   stays on disk, out of git.
3. **The eBird exports are shown exactly as they are**, location names and
   map pins included — never rename, hide or filter anything in them. It is
   the one exception to "no street address" (`hark_web`,
   `planning/decisions.md`).
4. **No links to private `github.com/felipeharker/…` repositories.** A
   visitor gets GitHub's 404. The four public ones — `hark_web`,
   `hark_academic`, `hark_birding`, `hark_resume` — may be linked.
5. **One stylesheet, and it is not here.** The app imports the shared standard
   from `src/app/hark.css`, which `web/scripts/standard.mjs` fetches from
   https://felipeharker.org/standards/hark.css and git ignores. Never edit or
   commit that copy; a change to a shared component is a change to the
   standard, in `hark_web`. This app's own rules go in `styles_primary.css`
   and `styles_map.css`, commented. The standard's one script,
   https://felipeharker.org/standards/hark.js, is linked by
   `src/app/layout.tsx` in the `<head>`, not deferred: it sets the page in the
   design — sans or serif — and accent — ink, red or blue — the reader chose
   on felipeharker.org's front page. Every page links the standard's favicon
   too, `https://felipeharker.org/standards/favicon.svg`. There is no switch
   here; the front page is the only place to choose.
6. **Links.** Within the app: Next `<Link>`. To another site in the family:
   a plain `<a>` with the absolute address from `SITE_FAMILY` /
   `STANDARDS_URL`, same tab. To anyone else: spread `externalLinkProps(href)`
   from `siteConfig.ts`, which opens a new tab with
   `rel="noopener noreferrer"`.
7. **Text.** Plain language; headings in Title Case, never numbered. Every
   page ends with `<Colophon>` and its site links.
8. **Third-party material** — field guides, papers — never goes in the
   repository; it stays in `notebook/`.
9. **Keep the docs true.** A change to how something works updates the
   README, `user_guide.md` or `web/AGENTS.md` in the same commit. A decision
   goes in `hark_web`'s `planning/decisions.md`. The family's addresses are
   in `tools/site.mjs` and `web/src/lib/siteConfig.ts` here, and in every
   other `hark_` repository: change them in all four.

## Before a commit

1. In `web/`: `npm run build` and `npm run lint` pass.
2. From the root: `node tools/check.mjs` passes.
3. `node tools/serve.mjs`, and open every page you touched at desktop width
   and at 390 px.

Commit messages end with the attribution line the session gives, for example
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
