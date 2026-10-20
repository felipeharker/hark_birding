#!/usr/bin/env node
/**
 * Writes src/app/hark.css: the shared stylesheet, which layout.tsx imports.
 * Run by predev, prebuild and prelint; git ignores the file it writes.
 *
 * The one stylesheet lives in hark_web and is served at
 * https://felipeharker.org/standards/hark.css. This fetches it from there,
 * so every build carries the standard as it is live. To try a change to the
 * standard before it is deployed, point HARK_CSS at a local copy:
 *
 *   HARK_CSS=../../hark_web/web/standards/site/hark.css npm run dev
 *
 * Offline, an earlier copy is kept with a warning; with no copy at all the
 * build stops.
 */

import { copyFileSync, existsSync, writeFileSync } from 'node:fs';

const SOURCE = 'https://felipeharker.org/standards/hark.css';
const OUT = 'src/app/hark.css';

if (process.env.HARK_CSS) {
  copyFileSync(process.env.HARK_CSS, OUT);
  console.log(`hark.css: copied from ${process.env.HARK_CSS}`);
} else {
  try {
    const res = await fetch(SOURCE);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    writeFileSync(OUT, await res.text());
    console.log(`hark.css: fetched from ${SOURCE}`);
  } catch (err) {
    if (!existsSync(OUT)) {
      console.error(`hark.css: could not fetch ${SOURCE} (${err.message}), and there is no earlier copy.`);
      process.exit(1);
    }
    console.warn(`hark.css: could not fetch ${SOURCE} (${err.message}); keeping the earlier copy.`);
  }
}
