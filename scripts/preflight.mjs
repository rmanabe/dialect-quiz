#!/usr/bin/env node
// Check everything that has ever sent this app back from App Review, before
// spending a review cycle finding out. Gathers the facts; preflightChecks.mjs
// decides. Exits non-zero when something would actually block the submission.
//
// Usage: node scripts/preflight.mjs          (credentials as in ascApi.mjs)
import https from 'node:https';

import { APP_ID, get } from './ascApi.mjs';
import { findPreflightProblems, formatPreflightReport } from './preflightChecks.mjs';

// The app declares tablet support, which is why App Review runs it on an iPad
// Air — so the iPad set is as required as the phone one.
const REQUIRED_DISPLAY_TYPES = ['APP_IPHONE_65', 'APP_IPAD_PRO_3GEN_129'];

// node:https rather than fetch, same as everywhere else here: undici cannot get
// through the TLS-inspecting proxy on the dev machine.
function head(url, depth = 0) {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { 'user-agent': 'Mozilla/5.0 (preflight)' } }, (res) => {
        res.resume();
        const { statusCode, headers } = res;
        if (statusCode >= 300 && statusCode < 400 && headers.location && depth < 5) {
          return resolve(head(new URL(headers.location, url).href, depth + 1));
        }
        resolve(statusCode);
      })
      .on('error', () => resolve(0)); // unreachable reads as "not 200"
  });
}

const version = (await get(`/v1/apps/${APP_ID}/appStoreVersions?limit=1&include=build`)).data[0];
const buildId = version.relationships?.build?.data?.id;
const build = buildId ? (await get(`/v1/builds/${buildId}`)).data.attributes : null;

const localizations = [];
const screenshotCounts = {};
for (const loc of (await get(`/v1/appStoreVersions/${version.id}/appStoreVersionLocalizations`))
  .data) {
  const a = loc.attributes;
  localizations.push({
    locale: a.locale,
    description: a.description,
    supportUrl: a.supportUrl,
    marketingUrl: a.marketingUrl,
  });
  for (const set of (await get(`/v1/appStoreVersionLocalizations/${loc.id}/appScreenshotSets`))
    .data) {
    const shots = await get(`/v1/appScreenshotSets/${set.id}/appScreenshots`);
    const type = set.attributes.screenshotDisplayType;
    screenshotCounts[type] = (screenshotCounts[type] ?? 0) + shots.data.length;
  }
}

let privacyPolicyUrl = null;
for (const info of (await get(`/v1/apps/${APP_ID}/appInfos?limit=3`)).data) {
  for (const loc of (await get(`/v1/appInfos/${info.id}/appInfoLocalizations`)).data) {
    privacyPolicyUrl ??= loc.attributes.privacyPolicyUrl;
  }
}

const reviewDetail = await get(`/v1/appStoreVersions/${version.id}/appStoreReviewDetail`).catch(
  () => null,
);

const purchases = await get(`/v1/apps/${APP_ID}/inAppPurchasesV2?limit=20`);
const product = purchases.data[0] ?? null;
let iap = null;
if (product) {
  const has = async (path) => {
    try {
      const res = await get(`/v2/inAppPurchases/${product.id}/${path}`);
      return Array.isArray(res.data) ? res.data.length > 0 : res.data != null;
    } catch {
      return false;
    }
  };
  let hasPrice = false;
  try {
    const prices = await get(
      `/v1/inAppPurchasePriceSchedules/${product.id}/manualPrices?limit=1`,
    );
    hasPrice = prices.data.length > 0;
  } catch {
    hasPrice = false;
  }
  iap = {
    productId: product.attributes.productId,
    state: product.attributes.state,
    hasReviewScreenshot: await has('appStoreReviewScreenshot'),
    hasLocalization: await has('inAppPurchaseLocalizations'),
    hasPrice,
  };
}

// Subscriptions carry obligations a one-time purchase does not (3.1.2), so ask
// rather than assume.
const subscriptions = await get(`/v1/apps/${APP_ID}/subscriptionGroups?limit=1`).catch(() => ({
  data: [],
}));

const openSubmission = (await get(`/v1/apps/${APP_ID}/reviewSubmissions?limit=5`)).data.find(
  (s) => s.attributes.state !== 'COMPLETE',
);
let submissionItems = null;
if (openSubmission) {
  submissionItems = (await get(`/v1/reviewSubmissions/${openSubmission.id}/items`)).data.map(
    (item) => {
      const type = Buffer.from(item.id, 'base64url').toString('utf8').split('|')[1];
      return {
        kind:
          type === '6' ? 'appStoreVersion' : type === '17' ? 'inAppPurchaseVersion' : `unknown(${type})`,
        state: item.attributes.state,
      };
    },
  );
}

const urls = [
  ...localizations.flatMap((l) => [l.supportUrl, l.marketingUrl]),
  privacyPolicyUrl,
].filter(Boolean);
const urlStatuses = {};
for (const url of new Set(urls)) urlStatuses[url] = await head(url);

const problems = findPreflightProblems({
  versionState: version.attributes.appVersionState ?? version.attributes.appStoreState,
  build,
  screenshotCounts,
  requiredDisplayTypes: REQUIRED_DISPLAY_TYPES,
  localizations,
  privacyPolicyUrl,
  urlStatuses,
  reviewNotes: reviewDetail?.data?.attributes?.notes ?? null,
  sellsSubscription: subscriptions.data.length > 0,
  iap,
  submissionItems,
});

console.log(`# ${version.attributes.versionString} (${version.attributes.appVersionState})\n`);
console.log(formatPreflightReport(problems));
process.exit(problems.some((p) => p.severity === 'blocker') ? 1 : 0);
