#!/usr/bin/env node
// Print the App Store review status of an app: version state, attached build,
// in-app purchases, and open review submissions.
//
// The App Store Connect web UI is slow and frequently hangs; this answers the
// only question that usually matters ("where is the submission?") in a second
// and can be scripted.
//
// Credentials come from the environment — see scripts/ascApi.mjs.
//
// Usage: node scripts/asc-status.mjs
//        node scripts/store-status.mjs   (this, plus Google Play and whether
//                                         either store actually serves the app)
import { pathToFileURL } from 'node:url';

import { APP_ID, get } from './ascApi.mjs';

/** Exported so store-status.mjs can print the same thing without shelling out. */
export async function printAppleStatus() {
  const versions = await get(`/v1/apps/${APP_ID}/appStoreVersions?limit=3&include=build`);
  const included = new Map((versions.included ?? []).map((x) => [x.id, x]));

  console.log(`# App Store Connect (app ${APP_ID})\n`);
  for (const v of versions.data) {
    const a = v.attributes;
    const build = included.get(v.relationships?.build?.data?.id)?.attributes;
    console.log(`version : ${a.versionString}`);
    console.log(`state   : ${a.appVersionState ?? a.appStoreState}`);
    console.log(`release : ${a.releaseType}`);
    console.log(
      `build   : ${
        build
          ? `${build.version} (uploaded ${build.uploadedDate}, ${build.processingState}${
              build.expired ? ', EXPIRED' : ''
            })`
          : '(none attached)'
      }`,
    );
    console.log('');
  }

  const iaps = await get(`/v1/apps/${APP_ID}/inAppPurchasesV2?limit=20`);
  console.log('## In-app purchases');
  if (iaps.data.length === 0) console.log('  (none)');
  for (const p of iaps.data) {
    console.log(`  ${p.attributes.productId}  ${p.attributes.state}  (${p.attributes.name})`);
  }
  console.log('');

  // A submission left in UNRESOLVED_ISSUES still holds whatever items were not
  // removed from it. Worth seeing: an in-app purchase stranded in an old
  // submission is exactly what got 1.0 (build 4) rejected on 2026-08-20, since
  // the version was reviewed without a purchase it could test.
  const subs = await get(`/v1/apps/${APP_ID}/reviewSubmissions?limit=5`);
  console.log('## Review submissions (newest first)');
  for (const s of subs.data) {
    const items = await get(`/v1/reviewSubmissions/${s.id}/items`);
    const states = items.data.map((i) => i.attributes.state).join(', ') || 'no items';
    console.log(`  ${s.attributes.submittedDate ?? '(not submitted)'}  ${s.attributes.state}`);
    console.log(`    items: ${states}`);
  }
}

// Only run when invoked directly, so store-status.mjs can import the function.
// pathToFileURL rather than string-building the URL: on Windows the drive
// letter makes a hand-rolled `file://${path}` never match.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await printAppleStatus();
}
