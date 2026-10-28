import type { Metadata } from 'next';
import { SHARE_IMAGE, SITE_TITLE } from './siteConfig';

/**
 * The card a link to a page shows when it is shared (Open Graph and Twitter)
 * and, given the page's path, its canonical address. Paths stay relative
 * here: `metadataBase` in src/app/layout.tsx makes them absolute on SITE_URL.
 *
 * A page's `openGraph` replaces the layout's whole rather than adding to it,
 * so the layout uses this without a path, for a card with no address, and
 * every page with an address of its own spreads this, with its path, into its
 * own metadata.
 */
export function shareMetadata(title: string, description: string, path?: string): Metadata {
  return {
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: 'website',
      siteName: SITE_TITLE,
      title,
      description,
      ...(path ? { url: path } : {}),
      images: [SHARE_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [SHARE_IMAGE.url] },
  };
}
