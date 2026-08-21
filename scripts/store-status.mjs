#!/usr/bin/env node
// Where both store submissions actually stand, in one command.
//
// The two halves answer different questions and both are needed:
//
//   - review state comes from App Store Connect's API. Google Play's Publisher
//     API would be the equivalent, but the service accounts on this machine
//     have no permission on this app (403 on `edits`), so Play's review state
//     is not available here — check Play Console for that.
//   - *published* state comes from the public storefronts, and nothing else is
//     evidence. A Play production track can read "completed" while the app is
//     still invisible to users, and an App Store version can sit approved but
//     unreleased. The storefront either serves the listing or it does not.
//
// Usage: node scripts/store-status.mjs
//   Apple credentials as in scripts/ascApi.mjs. The public checks need nothing.
import https from 'node:https';

import { printAppleStatus } from './asc-status.mjs';

const ASC_APP_ID = process.env.ASC_APP_ID ?? '6799330163';
const ANDROID_PACKAGE = process.env.ANDROID_PACKAGE ?? 'com.robonetc.dialectquiz.osaka';

// node:https rather than fetch: undici cannot reach some of these hosts from
// behind the TLS-inspecting proxy on the dev machine and times out connecting.
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'user-agent': 'Mozilla/5.0 (store-status)' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(fetchPage(new URL(res.headers.location, url).href));
        }
        let raw = '';
        res.on('data', (d) => (raw += d));
        res.on('end', () => resolve({ code: res.statusCode, body: raw }));
      })
      .on('error', reject);
  });
}

async function printPublishedState() {
  console.log('\n# Published to users?\n');

  // iTunes lookup is the plainest possible answer for iOS: an unreleased app
  // returns zero results, whatever App Store Connect says about it.
  try {
    const res = await fetchPage(`https://itunes.apple.com/lookup?id=${ASC_APP_ID}&country=jp`);
    const found = JSON.parse(res.body).resultCount > 0;
    const app = found ? JSON.parse(res.body).results[0] : null;
    console.log(
      `  App Store : ${found ? `LIVE — version ${app.version}, updated ${app.currentVersionReleaseDate?.slice(0, 10)}` : 'not published'}`,
    );
  } catch (e) {
    console.log(`  App Store : lookup failed (${e.message})`);
  }

  // Play has no API for "is it public"; the listing page is the answer, and its
  // 更新日 is what tells you whether an approved update actually rolled out.
  try {
    const url = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}&hl=ja&gl=JP`;
    const res = await fetchPage(url);
    if (res.code !== 200) {
      console.log(`  Play Store: not published (HTTP ${res.code})`);
    } else {
      const updated = res.body.match(/更新日<\/div><div[^>]*>([^<]+)</)?.[1];
      const version = res.body.match(/"141":\[\[\["([^"]+)"\]\]/)?.[1];
      console.log(
        `  Play Store: LIVE${version ? ` — version ${version}` : ''}${updated ? `, updated ${updated}` : ''}`,
      );
    }
  } catch (e) {
    console.log(`  Play Store: lookup failed (${e.message})`);
  }

  console.log(
    '\n  Play review state is not readable from here (no Publisher API permission).\n' +
      '  Play Console → 公開の概要, under the dev@robonet-c.jp slot (/console/u/2/).',
  );
}

await printAppleStatus();
await printPublishedState();
