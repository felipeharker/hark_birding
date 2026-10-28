import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteConfig';

/** Written once, at build time, to out/robots.txt: a static export needs it said. */
export const dynamic = 'force-static';

/** Every page may be crawled; the sitemap lists them. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
