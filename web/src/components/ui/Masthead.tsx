import React from 'react';

/**
 * The title block at the top of a page.
 *
 * Two sizes, one component:
 *
 *   the homepage    the report's own name, set as large as the column holds
 *   record          a checklist page, whose title names a place rather than
 *                   the report — hark.css's .masthead--record, a smaller title
 *
 * Before this existed each page assembled the same five elements by hand, and
 * they had already drifted — one page centred its dateline, another did not.
 * Passing only the fields a page actually has keeps them in step: anything
 * omitted renders nothing rather than an empty line.
 *
 * Styling: section 3 of src/app/hark.css.
 */

interface MastheadProps {
  /** The bracketed label in the left column, saying what kind of page this is. */
  kicker?: string;
  title: string;
  subtitle?: string;
  byline?: string;
  /** The one line of the block that is a recorded value, so it is set in mono. */
  dateline?: React.ReactNode;
  /** A record of a thing: a smaller title. */
  record?: boolean;
  /** Extra content below the block — the checklist page's record grid. */
  children?: React.ReactNode;
}

export function Masthead({
  kicker,
  title,
  subtitle,
  byline,
  dateline,
  record = false,
  children,
}: MastheadProps) {
  return (
    <header className={record ? 'masthead masthead--record' : 'masthead'}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h1 className="title">{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {byline && <p className="byline">{byline}</p>}
      {dateline && <p className="dateline">{dateline}</p>}
      {children}
    </header>
  );
}
