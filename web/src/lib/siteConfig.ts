/**
 * Everything about the site that is a property of the project rather than a
 * record of an observation.
 *
 * Observations, media and field notes still come from files — the eBird
 * exports in `observation-data/` and the Markdown in `field-notes/` — because
 * those change whenever a new checklist is submitted. The values below change
 * when the project itself changes, which is rarely and always alongside a code
 * edit, so they live here instead of in a CSV nobody remembers to look at.
 */

/** Browser tab and masthead. */
export const SITE_TITLE = 'Harker Ornithology Report';

/** Sits under the title on the homepage. */
export const SITE_SUBTITLE = 'A Record of Field Observations, Checklists, and Media';

/** Byline under the subtitle. */
export const SITE_AUTHOR = 'Felipe Harker';

/** Used for the page description in metadata. */
export const SITE_DESCRIPTION = 'Personal birding project visualizing eBird observation data.';

/** The summary paragraph on the homepage, below the masthead. */
export const ABSTRACT =
  'This project catalogs and shares birding observations from around the world, ' +
  'with checklists and media hosted on eBird and the Macaulay Library. It began ' +
  'as an experiment merging a love of birds with web development, and remains ' +
  'under active, frequent development.';

/**
 * Off-site addresses used in more than one place — the repository URL alone
 * appears in the reference list and the colophon. The Dove Habitat site, a
 * project site with its own tile on the portfolio, is linked from the
 * reference list and the running head's Birding menu (RUNHEAD).
 */
export const SITE_LINKS = {
  repository: 'https://github.com/felipeharker/hark_birding',
  ebirdProfile: 'https://ebird.org/profile/ODE0ODA5NQ/world',
  macaulayLibrary:
    'https://media.ebird.org/catalog?unconfirmed=incl&mediaType=photo&userId=USER8148095',
  merlin: 'https://merlin.allaboutbirds.org/',
  doveHabitat: 'https://hark-dove-habitat.onrender.com/',
} as const;

/**
 * Every site in felipeharker.org's family, in the order of FAMILY in
 * tools/site.mjs, for the site links at the foot of each page (Colophon).
 * This report is the root of its own site, so its own link is `/`; the
 * others are absolute, written as plain <a> elements, and open in the same
 * tab. `current` marks this one.
 */
export const SITE_FAMILY = [
  { name: 'Portfolio', url: 'https://felipeharker.org/' },
  { name: 'Academic', url: 'https://hark-academic.onrender.com/' },
  { name: 'Birding', url: '/', current: true },
  { name: 'Resume', url: 'https://hark-resume.onrender.com/' },
] as const;

/** A link in the running head; `current` marks the page the reader is on. */
export type RunheadLink = { name: string; url: string; current?: boolean };

/** A site in the running head, or a group: a label and the menu of its work. */
export type RunheadItem = RunheadLink & { menu?: readonly RunheadLink[] };

/**
 * The running head at the top of each page (Runhead): every site in the
 * family and every piece of work, as on every page of every site in it
 * (hark_web, web/standards/docs/components.md, "Running head"). A group's
 * label leads to where its work is listed — Academic to the academic site,
 * Professional and Birding to their rows of the portfolio. This report is
 * the root of its own site, so its own link is `/`; every other link is
 * absolute, a plain <a>, in the same tab. A new piece of work goes in its
 * group here and on every other site's pages at once.
 */
export const RUNHEAD: readonly RunheadItem[] = [
  { name: 'Portfolio', url: 'https://felipeharker.org/' },
  {
    name: 'Professional',
    url: 'https://felipeharker.org/#work-professional',
    menu: [{ name: 'Parametric Living', url: 'https://parametric-living.onrender.com/' }],
  },
  {
    name: 'Academic',
    url: 'https://hark-academic.onrender.com/',
    menu: [
      {
        name: 'Living Outside the Box',
        url: 'https://hark-academic.onrender.com/projects/living-outside-the-box.html',
      },
      {
        name: 'Dead Mall Fall',
        url: 'https://hark-academic.onrender.com/projects/dead-mall-fall.html',
      },
      {
        name: 'Collingsworth Marketplace',
        url: 'https://hark-academic.onrender.com/projects/collingsworth-marketplace.html',
      },
    ],
  },
  {
    name: 'Birding',
    url: 'https://felipeharker.org/#work-birding',
    menu: [
      { name: 'Ornithology Report', url: '/', current: true },
      { name: 'Dove Habitat', url: SITE_LINKS.doveHabitat },
    ],
  },
  { name: 'Resume', url: 'https://hark-resume.onrender.com/' },
];

/** The name that leads the site links. */
export const SITE_OWNER = 'Felipe E. Harker';

/**
 * The front page of felipeharker.org — the portfolio — which the owner's name
 * in the running head links to. Outside this app, so it is written as a plain
 * <a>, never a <Link>.
 */
export const SITE_ROOT = 'https://felipeharker.org/';

/** The design standard every site in the family follows, served by hark_web. */
export const STANDARDS_URL = 'https://felipeharker.org/standards/';

/** The sites a link opens in the same tab from: the rest of the family. */
const FAMILY_ORIGINS = new Set(
  [...SITE_FAMILY.map((site) => site.url), SITE_ROOT, STANDARDS_URL]
    .filter((url) => url.startsWith('http'))
    .map((url) => new URL(url).origin),
);

/**
 * Props every link needs. Collected here so no outbound link ships without
 * `rel="noopener noreferrer"`. A link to anyone else's site opens in a new
 * tab; a link within this report, or to another site in the family
 * (felipeharker.org and its standards included), does not.
 */
export function externalLinkProps(href: string) {
  return href.startsWith('http') && !FAMILY_ORIGINS.has(new URL(href).origin)
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {};
}
