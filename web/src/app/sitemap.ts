import type { MetadataRoute } from 'next';
import { getObservations } from '@/lib/parseEbird';
import { SITE_URL } from '@/lib/siteConfig';

/** Written once, at build time, to out/sitemap.xml: a static export needs it said. */
export const dynamic = 'force-static';

/**
 * Every page, for search engines: the report, then one page per submitted
 * checklist — the same list as generateStaticParams in checklist/[id]/page.tsx.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const submissionIds = new Set(getObservations().map((obs) => obs.SubmissionID).filter(Boolean));
  return [
    { url: `${SITE_URL}/` },
    ...Array.from(submissionIds).map((id) => ({ url: `${SITE_URL}/checklist/${id}` })),
  ];
}
