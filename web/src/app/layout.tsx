import type { Metadata } from 'next';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/lib/siteConfig';
import { Runhead } from '@/components/ui/Runhead';

// The shared standard first — hark.css is generated: `npm run dev` and
// `npm run build` fetch it from https://felipeharker.org/standards/hark.css
// (scripts/standard.mjs); its source is web/standards/site/hark.css in
// hark_web, so edit it there, never here — then this site's own rules, which
// may read its tokens.
import './hark.css';
import './styles_primary.css';
import './styles_map.css';

/**
 * The two faces the design uses, Inter and IBM Plex Mono, load from Google
 * Fonts with the same <link> every static page on felipeharker.org has (plus
 * the italics, for scientific names). The browser fetches them, not the
 * build: the build downloads nothing, so a deploy cannot fail on a font.
 * hark.css names the families in --font-body and --font-mono.
 */
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;1,400' +
  '&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&display=swap';

/**
 * The standard's one script, served beside hark.css; its source is
 * web/standards/site/hark.js in hark_web. It sets <html data-design> to the
 * design the reader chose on felipeharker.org's front page — sans or serif —
 * and loads Source Serif 4 when it is wanted, so it has to run before the
 * page is drawn: a plain <script> in the <head>, not next/script, whose
 * strategies run it later. Because it sets an attribute on <html> before
 * React hydrates, <html> carries suppressHydrationWarning.
 */
const SCRIPT_URL = 'https://felipeharker.org/standards/hark.js';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: { title: SITE_TITLE, description: SITE_DESCRIPTION, type: 'website' },
  twitter: { card: 'summary', title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_URL} />
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- it must run before the first paint (SCRIPT_URL, above) */}
        <script src={SCRIPT_URL} />
      </head>
      {/* The running head is the same on every page, so it is rendered here,
          above each page's <article>, rather than by each page. */}
      <body>
        <Runhead />
        {children}
      </body>
    </html>
  );
}
