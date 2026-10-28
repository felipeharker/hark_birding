import type { Metadata } from 'next';
import { getObservations, getMedia } from '@/lib/parseEbird';
import { getFieldNotes } from '@/lib/parseFieldNotes';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/siteConfig';
import { shareMetadata } from '@/lib/shareMetadata';
import HomeDocument from '@/components/HomeDocument';

/** The report's canonical address and its share card. */
export const metadata: Metadata = shareMetadata(SITE_TITLE, SITE_DESCRIPTION, '/');

/**
 * Reads every content source at build time and hands it to HomeDocument:
 *
 *   observation-data/ebird-data-latest.csv   → map pins, locations, species
 *   observation-data/ebird-media-latest.csv  → the Media section
 *   web/field-notes/*.md                     → Field Notes
 *
 * The title, abstract and off-site links are project settings rather than
 * observations, so they come from src/lib/siteConfig.ts and are imported
 * where they are used rather than threaded through here.
 */
export default function Home() {
  return (
    <HomeDocument
      data={getObservations()}
      mediaData={getMedia()}
      fieldNotes={getFieldNotes()}
    />
  );
}
