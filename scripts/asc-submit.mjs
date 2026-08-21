#!/usr/bin/env node
// Build and send an App Store review submission that holds the app version and
// the in-app purchase together, which is what Apple requires for a first IAP
// and what the 2026-08-20 rejection was about (see scripts/reviewSubmission.mjs).
//
// The App Store Connect web UI can do all of this, but it hangs often enough
// that a scripted path is worth having; more importantly, `submit` refuses to
// send anything that would repeat that rejection.
//
// Usage (credentials as described in scripts/ascApi.mjs):
//   node scripts/asc-submit.mjs show              print the current state
//   node scripts/asc-submit.mjs clear             free items stuck in old submissions
//   node scripts/asc-submit.mjs attach <build>    attach a build to the version
//   node scripts/asc-submit.mjs stage             open a submission with both items
//   node scripts/asc-submit.mjs submit            send it to App Review
//
// A rejected submission holds on to whatever was not removed from it, and an
// item can only live in one submission — so `clear` is what makes a fresh
// `stage` possible after a rejection.
import { APP_ID, call, get, ok } from './ascApi.mjs';
import {
  APP_VERSION,
  IN_APP_PURCHASE,
  findSubmissionProblems,
  submissionErrorMessage,
} from './reviewSubmission.mjs';

const PRODUCT_ID = process.env.ASC_PRODUCT_ID ?? 'remove_ads_lifetime';

const latestVersion = async () =>
  (await get(`/v1/apps/${APP_ID}/appStoreVersions?limit=1&include=build`)).data[0];

const purchase = async () =>
  (await get(`/v1/apps/${APP_ID}/inAppPurchasesV2?limit=20`)).data.find(
    (p) => p.attributes.productId === PRODUCT_ID,
  );

const openSubmission = async () =>
  (await get(`/v1/apps/${APP_ID}/reviewSubmissions?limit=5`)).data.find(
    (s) => s.attributes.state !== 'COMPLETE',
  );

// The listing gives no relationships, so the item's kind has to come from its
// id: Apple encodes "<submission>|<type>|<resource>" in base64url.
function kindOf(item) {
  const decoded = Buffer.from(item.id, 'base64url').toString('utf8');
  const type = decoded.split('|')[1];
  if (type === '6') return APP_VERSION;
  if (type === '17') return IN_APP_PURCHASE;
  return `unknown(${type})`;
}

const itemsOf = async (submission) =>
  (await get(`/v1/reviewSubmissions/${submission.id}/items`)).data.map((i) => ({
    kind: kindOf(i),
    state: i.attributes.state,
  }));

async function show() {
  const version = await latestVersion();
  const buildId = version.relationships?.build?.data?.id;
  const build = buildId ? (await get(`/v1/builds/${buildId}`)).data.attributes : null;
  console.log(
    `version : ${version.attributes.versionString} ${version.attributes.appVersionState}` +
      ` | build: ${build ? `${build.version} (${build.processingState})` : '(none)'}`,
  );
  const product = await purchase();
  console.log(`iap     : ${product.attributes.productId} ${product.attributes.state}`);

  const submission = await openSubmission();
  if (!submission) {
    console.log('open submission: (none)');
    return;
  }
  const items = await itemsOf(submission);
  console.log(
    `open submission: ${submission.id} ${submission.attributes.state}` +
      ` | ${items.length} item(s): ${items.map((i) => `${i.kind}=${i.state}`).join(', ')}`,
  );
}

async function clear() {
  // Removing an item is a PATCH, not a DELETE, and the response echoes the
  // item's *previous* state — so this reads the result back rather than
  // trusting the reply.
  for (const submission of (await get(`/v1/apps/${APP_ID}/reviewSubmissions?limit=5`)).data) {
    if (submission.attributes.state === 'COMPLETE') continue;
    const items = await get(`/v1/reviewSubmissions/${submission.id}/items`);
    for (const item of items.data) {
      if (item.attributes.state === 'REMOVED') continue;
      ok(
        await call('PATCH', `/v1/reviewSubmissionItems/${item.id}`, {
          data: { type: 'reviewSubmissionItems', id: item.id, attributes: { removed: true } },
        }),
        `remove ${kindOf(item)} from ${submission.id}`,
      );
      console.log(`removed ${kindOf(item)} from submission ${submission.id}`);
    }
  }
}

async function attach(wanted) {
  if (!wanted) throw new Error('usage: asc-submit.mjs attach <buildVersion>');
  const builds = await get(`/v1/builds?filter[app]=${APP_ID}&limit=10&sort=-version`);
  const build = builds.data.find((b) => b.attributes.version === wanted);
  if (!build) {
    const have = builds.data.map((b) => b.attributes.version).join(', ');
    throw new Error(`build ${wanted} not found. App Store Connect has: ${have}`);
  }
  if (build.attributes.processingState !== 'VALID') {
    throw new Error(`build ${wanted} is ${build.attributes.processingState}, not VALID yet`);
  }
  const version = await latestVersion();
  ok(
    await call('PATCH', `/v1/appStoreVersions/${version.id}/relationships/build`, {
      data: { type: 'builds', id: build.id },
    }),
    'attach build',
  );
  console.log(`attached build ${wanted} to version ${version.attributes.versionString}`);
}

async function stage() {
  const existing = await openSubmission();
  if (existing) throw new Error(`submission ${existing.id} is already open — run clear first`);

  const submission = ok(
    await call('POST', '/v1/reviewSubmissions', {
      data: {
        type: 'reviewSubmissions',
        attributes: { platform: 'IOS' },
        relationships: { app: { data: { type: 'apps', id: APP_ID } } },
      },
    }),
    'create submission',
  );
  const id = submission.data.id;
  const version = await latestVersion();
  ok(
    await call('POST', '/v1/reviewSubmissionItems', {
      data: {
        type: 'reviewSubmissionItems',
        relationships: {
          reviewSubmission: { data: { type: 'reviewSubmissions', id } },
          appStoreVersion: { data: { type: 'appStoreVersions', id: version.id } },
        },
      },
    }),
    'add app version',
  );

  // The item points at the in-app purchase's *version* resource, not the
  // purchase itself: reviewSubmissionItems has no `inAppPurchase` relationship,
  // only `inAppPurchaseVersion` (type inAppPurchaseVersions).
  const product = await purchase();
  const productVersion = await get(`/v2/inAppPurchases/${product.id}/versions`);
  ok(
    await call('POST', '/v1/reviewSubmissionItems', {
      data: {
        type: 'reviewSubmissionItems',
        relationships: {
          reviewSubmission: { data: { type: 'reviewSubmissions', id } },
          inAppPurchaseVersion: {
            data: { type: 'inAppPurchaseVersions', id: productVersion.data.id },
          },
        },
      },
    }),
    'add in-app purchase',
  );
  console.log(`staged submission ${id} with the app version and ${product.attributes.productId}`);
}

async function submit() {
  const submission = await openSubmission();
  if (!submission) throw new Error('no staged submission to send — run stage first');

  const problems = findSubmissionProblems(await itemsOf(submission));
  if (problems.length > 0) throw new Error(submissionErrorMessage(problems));

  ok(
    await call('PATCH', `/v1/reviewSubmissions/${submission.id}`, {
      data: { type: 'reviewSubmissions', id: submission.id, attributes: { submitted: true } },
    }),
    'submit',
  );
  console.log(`submitted ${submission.id}`);
}

const commands = { show, clear, attach, stage, submit };
const [command, ...args] = process.argv.slice(2);
if (!commands[command]) {
  console.error(`usage: asc-submit.mjs <${Object.keys(commands).join('|')}>`);
  process.exit(2);
}
await commands[command](...args);
// Always finish by reading the state back: writes echo the pre-change state,
// so the reply alone never proves anything happened.
if (command !== 'show') await show();
