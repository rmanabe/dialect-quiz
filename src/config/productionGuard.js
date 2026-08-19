// The last thing standing between a misconfigured environment and the store.
//
// Plain CommonJS on purpose: app.config.ts is `require()`d directly by Expo's
// config loader under Node, which strips the types off that one file but does
// NOT transpile anything it imports. A nested `.ts` import here fails to
// resolve and every build dies at config load. Same reason as
// src/prefectures/index.js. See productionGuard.d.ts for the types.
//
// 1.0 (build 3) was cut one day before the RevenueCat keys were added to EAS,
// so it shipped with an empty API key: the SDK never configured, the remove-ads
// button did nothing, and App Review rejected it under Guideline 2.1(b).
// Nothing in the build surfaced the problem, because a missing env var is
// indistinguishable from a present one until the app runs on a device.

/** Google's shared demo publisher. Real revenue never comes from this ID. */
const GOOGLE_TEST_PUBLISHER = 'ca-app-pub-3940256099942544';

const REQUIRED_ADMOB_VARS = [
  'EXPO_PUBLIC_ADMOB_IOS_APP_ID',
  'EXPO_PUBLIC_ADMOB_ANDROID_APP_ID',
  'EXPO_PUBLIC_ADMOB_IOS_BANNER_ID',
  'EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID',
];

function blank(value) {
  return !value || String(value).trim().length === 0;
}

/**
 * Everything wrong with this environment for a production build, as a list of
 * human-readable problems. Empty means the build is safe to cut.
 */
function findProductionConfigProblems(input) {
  const problems = [];

  if (blank(input.revenueCat.apiKeyIos)) problems.push('EXPO_PUBLIC_REVENUECAT_IOS_KEY is missing');
  if (blank(input.revenueCat.apiKeyAndroid)) {
    problems.push('EXPO_PUBLIC_REVENUECAT_ANDROID_KEY is missing');
  }

  for (const name of REQUIRED_ADMOB_VARS) {
    const value = input.env[name];
    if (blank(value)) {
      problems.push(`${name} is missing`);
    } else if (value.includes(GOOGLE_TEST_PUBLISHER)) {
      // Shipping these serves Google's demo ads: no revenue, and the store
      // listing looks fine, so nobody notices.
      problems.push(`${name} is set to a Google test ad unit (${value})`);
    }
  }

  return problems;
}

/** The message app.config.ts throws. Kept here so its wording is testable. */
function productionConfigErrorMessage(prefectureId, problems) {
  return (
    `[app.config] Production build for "${prefectureId}" is not shippable:\n` +
    problems.map((p) => `  - ${p}`).join('\n') +
    '\n\nWithout these the app ships with Google test ad units and a dead ' +
    'remove-ads button — the exact state App Review rejected under Guideline ' +
    '2.1(b). Set them on the EAS project (production environment) with ' +
    '`eas env:create` and rebuild.'
  );
}

module.exports = { findProductionConfigProblems, productionConfigErrorMessage };
