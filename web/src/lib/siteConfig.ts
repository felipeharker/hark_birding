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
 * reference list and nowhere else here.
 */
export const SITE_LINKS = {
  repository: 'https://github.com/felipeharker/hark_birding',
  ebirdProfile: 'https://ebird.org/profile/ODE0ODA5NQ/world',
  macaulayLibrary:
    'https://media.ebird.org/catalog?unconfirmed=incl&mediaType=photo&userId=USER8148095',
  merlin: 'https://merlin.allaboutbirds.org/',
  doveHabitat: 'https://dove.felipeharker.org/',
} as const;

/**
 * Every site in felipeharker.org's family, in the order of FAMILY in
 * tools/site.mjs, for the running head at the top of each page (Runhead) and
 * the site links at its foot (Colophon). This report is the root of its own
 * site, so its own link is `/`; the others are absolute, written as plain
 * <a> elements, and open in the same tab. `current` marks this one.
 */
export const SITE_FAMILY = [
  { name: 'Portfolio', url: 'https://felipeharker.org/' },
  { name: 'Academic', url: 'https://academic.felipeharker.org/' },
  { name: 'Birding', url: '/', current: true },
  { name: 'Resume', url: 'https://resume.felipeharker.org/' },
] as const;

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
