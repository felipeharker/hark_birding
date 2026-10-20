import type { NextConfig } from "next";

/**
 * A static export, served at the root of its own site,
 * https://hark-birding.onrender.com/: Render publishes out/. The links to the
 * rest of felipeharker.org's family are plain <a> elements with absolute
 * addresses (src/lib/siteConfig.ts).
 */
const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;
