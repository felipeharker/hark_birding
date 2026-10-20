import { RUNHEAD, SITE_OWNER, SITE_ROOT, type RunheadLink } from '@/lib/siteConfig';

/**
 * The running head: the line across the top of every page — the owner's
 * name, then every site in felipeharker.org's family and every piece of
 * work, grouped under Professional, Academic and Birding, each a label and a
 * menu (RUNHEAD). This report is bracketed as current, and so is the Birding
 * label holding it. The site links at the foot of every page, in <Colophon>,
 * lead to the same sites.
 *
 * Every link here leaves the app (or returns to its front), so each is a
 * plain <a>: absolute for everything else, `/` for this report. Rendered
 * once, by the root layout, outside each page's <article>.
 *
 * Styling: section 17 of src/app/hark.css — the menus drop on hover and
 * keyboard focus, in CSS alone.
 */
export function Runhead() {
  return (
    <header className="runhead">
      <a className="runhead-owner" href={SITE_ROOT}>
        {SITE_OWNER}
      </a>
      <nav className="runhead-links" aria-label="Site">
        <ul>
          {RUNHEAD.map((item) =>
            item.menu ? (
              <li key={item.url} className="runhead-group">
                <RunheadAnchor link={item} />
                <ul className="runhead-menu">
                  {item.menu.map((link) => (
                    <li key={link.url}>
                      <RunheadAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.url}>
                <RunheadAnchor link={item} />
              </li>
            ),
          )}
        </ul>
      </nav>
    </header>
  );
}

function RunheadAnchor({ link }: { link: RunheadLink }) {
  return (
    <a href={link.url} aria-current={link.current ? 'page' : undefined}>
      {link.name}
    </a>
  );
}
