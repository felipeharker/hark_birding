import React from 'react';
import { SITE_FAMILY, SITE_OWNER, STANDARDS_URL, externalLinkProps } from '@/lib/siteConfig';

/**
 * The foot of every page: the site links — every felipeharker.org site, this
 * one marked as current — then a line about where the page came from.
 *
 * The same block ends every page on every one of the sites, which is what
 * lets a reader get from any of them to any other. Each page passes only its
 * own line; the links and the closing sentence are the same everywhere.
 *
 * Styling: section 18 of src/app/hark.css.
 */
export function Colophon({ children }: { children: React.ReactNode }) {
  return (
    <footer className="colophon">
      <nav className="site-links" aria-label={`Sites by ${SITE_OWNER}`}>
        <span className="site-links-owner">{SITE_OWNER}</span>
        {SITE_FAMILY.map((site) => (
          <a
            key={site.url}
            href={site.url}
            aria-current={'current' in site ? 'page' : undefined}
          >
            {site.name}
          </a>
        ))}
      </nav>
      <p>
        {children} Built to the{' '}
        <a href={STANDARDS_URL} {...externalLinkProps(STANDARDS_URL)}>
          Harker web standards
        </a>
        .
      </p>
    </footer>
  );
}
