#!/usr/bin/env node
// Print the App Store review status of an app: version state, attached build,
// in-app purchases, and open review submissions.
//
// The App Store Connect web UI is slow and frequently hangs; this answers the
// only question that usually matters ("where is the submission?") in a second
// and can be scripted. No dependencies — the ES256 JWT is signed with
// node:crypto.
//
// Requires an App Store Connect API key (Users and Access > Integrations):
//   ASC_KEY_ID     the key's ID, e.g. A7Y6XZZPBD
//   ASC_ISSUER_ID  the issuer UUID shown above the key list
//   ASC_KEY_PATH   path to the downloaded AuthKey_<ID>.p8
//   ASC_APP_ID     the app's Apple ID (numeric), default: the Osaka app
//
// Usage: node scripts/asc-status.mjs
import crypto from 'node:crypto';
import fs from 'node:fs';
import https from 'node:https';

const { ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_PATH } = process.env;
const APP_ID = process.env.ASC_APP_ID ?? '6799330163';

for (const [name, value] of Object.entries({ ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_PATH })) {
  if (!value) {
    console.error(`Missing ${name}. See the header of this file for what each variable is.`);
    process.exit(2);
  }
}

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function token() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: 'ES256', kid: ASC_KEY_ID, typ: 'JWT' }));
  const body = b64url(
    JSON.stringify({ iss: ASC_ISSUER_ID, iat: now, exp: now + 600, aud: 'appstoreconnect-v1' }),
  );
  const signature = crypto.sign('sha256', Buffer.from(`${head}.${body}`), {
    key: fs.readFileSync(ASC_KEY_PATH, 'utf8'),
    dsaEncoding: 'ieee-p1363', // JWS wants raw r||s, not DER
  });
  return `${head}.${body}.${b64url(signature)}`;
}

// node:https rather than fetch: undici cannot reach this host from behind the
// TLS-inspecting proxy on the dev machine and times out connecting.
function api(path) {
  return new Promise((resolve, reject) => {
    https
      .get(
        {
          host: 'api.appstoreconnect.apple.com',
          path,
          headers: { Authorization: `Bearer ${token()}` },
        },
        (res) => {
          let raw = '';
          res.on('data', (d) => (raw += d));
          res.on('end', () => {
            if (res.statusCode !== 200) {
              return reject(new Error(`${res.statusCode} ${path}\n${raw.slice(0, 400)}`));
            }
            resolve(JSON.parse(raw));
          });
        },
      )
      .on('error', reject);
  });
}

const versions = await api(`/v1/apps/${APP_ID}/appStoreVersions?limit=3&include=build`);
const included = new Map((versions.included ?? []).map((x) => [x.id, x]));

console.log(`# App ${APP_ID}\n`);
for (const v of versions.data) {
  const a = v.attributes;
  const build = included.get(v.relationships?.build?.data?.id)?.attributes;
  console.log(`version : ${a.versionString}`);
  console.log(`state   : ${a.appVersionState ?? a.appStoreState}`);
  console.log(`release : ${a.releaseType}`);
  console.log(
    `build   : ${build ? `${build.version} (uploaded ${build.uploadedDate}, ${build.processingState}${build.expired ? ', EXPIRED' : ''})` : '(none attached)'}`,
  );
  console.log('');
}

const iaps = await api(`/v1/apps/${APP_ID}/inAppPurchasesV2?limit=20`);
console.log('# In-app purchases');
if (iaps.data.length === 0) console.log('(none)');
for (const p of iaps.data) {
  console.log(`  ${p.attributes.productId}  ${p.attributes.state}  (${p.attributes.name})`);
}
console.log('');

// A submission left in UNRESOLVED_ISSUES still holds whatever items were not
// removed from it. Worth seeing: an in-app purchase stranded in an old
// submission can leave an approved build with a purchase that cannot complete.
const subs = await api(`/v1/apps/${APP_ID}/reviewSubmissions?limit=5`);
console.log('# Review submissions (newest first)');
for (const s of subs.data) {
  const items = await api(`/v1/reviewSubmissions/${s.id}/items`);
  const states = items.data.map((i) => i.attributes.state).join(', ') || 'no items';
  console.log(`  ${s.attributes.submittedDate ?? '(not submitted)'}  ${s.attributes.state}`);
  console.log(`    items: ${states}`);
}
