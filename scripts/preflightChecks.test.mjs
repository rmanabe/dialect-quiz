import { test } from 'node:test';
import assert from 'node:assert/strict';

import { findPreflightProblems, formatPreflightReport } from './preflightChecks.mjs';

const SUPPORT = 'https://example.test/support';
const PRIVACY = 'https://example.test/privacy';
const MARKETING = 'https://example.test/';

/** A submission that would pass today. Each test spoils exactly one thing. */
function facts(overrides = {}) {
  return {
    versionState: 'PREPARE_FOR_SUBMISSION',
    build: { version: '5', processingState: 'VALID' },
    screenshotCounts: { APP_IPHONE_65: 4, APP_IPAD_PRO_3GEN_129: 4 },
    requiredDisplayTypes: ['APP_IPHONE_65', 'APP_IPAD_PRO_3GEN_129'],
    localizations: [
      { locale: 'ja', description: '大阪弁のクイズです。', supportUrl: SUPPORT, marketingUrl: MARKETING },
    ],
    privacyPolicyUrl: PRIVACY,
    urlStatuses: { [SUPPORT]: 200, [PRIVACY]: 200, [MARKETING]: 200 },
    reviewNotes: null,
    sellsSubscription: false,
    iap: {
      productId: 'remove_ads_lifetime',
      state: 'READY_TO_SUBMIT',
      hasReviewScreenshot: true,
      hasLocalization: true,
      hasPrice: true,
    },
    submissionItems: [
      { kind: 'appStoreVersion', state: 'READY_FOR_REVIEW' },
      { kind: 'inAppPurchaseVersion', state: 'READY_FOR_REVIEW' },
    ],
    ...overrides,
  };
}

const messages = (problems) => problems.map((p) => p.message).join('\n');
const blockers = (problems) => problems.filter((p) => p.severity === 'blocker');

test('a submission with nothing wrong reports nothing', () => {
  assert.deepEqual(findPreflightProblems(facts()), []);
});

// --- the 2026-08-20 rejection -----------------------------------------------

test('a version submitted without its in-app purchase is a blocker', () => {
  const problems = findPreflightProblems(
    facts({ submissionItems: [{ kind: 'appStoreVersion', state: 'READY_FOR_REVIEW' }] }),
  );
  assert.equal(blockers(problems).length, 1);
  assert.match(messages(problems), /no in-app purchase/);
});

test('a purchase with no App Review screenshot is a blocker', () => {
  // Apple refuses to review the purchase at all without one.
  const problems = findPreflightProblems(
    facts({ iap: { ...facts().iap, hasReviewScreenshot: false } }),
  );
  assert.match(messages(problems), /no App Review screenshot/);
});

// --- URLs a reviewer clicks --------------------------------------------------

test('a dead support URL is a blocker, not a warning', () => {
  const problems = findPreflightProblems(facts({ urlStatuses: { [SUPPORT]: 404, [PRIVACY]: 200, [MARKETING]: 200 } }));
  assert.equal(blockers(problems).length, 1);
  assert.match(messages(problems), /support URL is HTTP 404/);
});

test('a missing marketing URL is only a warning', () => {
  // It costs iOS ad revenue, not the release — treating it as a blocker would
  // stop a shippable build.
  const problems = findPreflightProblems(
    facts({ localizations: [{ ...facts().localizations[0], marketingUrl: null }] }),
  );
  assert.equal(blockers(problems).length, 0);
  assert.match(messages(problems), /AdMob cannot verify/);
});

test('a dead privacy policy URL is a blocker', () => {
  const problems = findPreflightProblems(
    facts({ urlStatuses: { [SUPPORT]: 200, [PRIVACY]: 500, [MARKETING]: 200 } }),
  );
  assert.match(messages(problems), /privacy policy URL is HTTP 500/);
});

// --- the binary and its screenshots -----------------------------------------

test('no build attached is a blocker', () => {
  assert.match(messages(findPreflightProblems(facts({ build: null }))), /no build attached/);
});

test('a build still processing is a blocker', () => {
  const problems = findPreflightProblems(
    facts({ build: { version: '6', processingState: 'PROCESSING' } }),
  );
  assert.match(messages(problems), /build 6 is PROCESSING/);
});

test('an empty display class is a blocker even when the other one is full', () => {
  // Apple reviews on an iPad because the app declares tablet support.
  const problems = findPreflightProblems(
    facts({ screenshotCounts: { APP_IPHONE_65: 4, APP_IPAD_PRO_3GEN_129: 0 } }),
  );
  assert.equal(blockers(problems).length, 1);
  assert.match(messages(problems), /no screenshots for APP_IPAD_PRO_3GEN_129/);
});

test('a display class missing from the counts is treated as empty, not as absent', () => {
  // The zero case and the undefined case have to behave the same; otherwise a
  // set that was never created silently passes.
  const problems = findPreflightProblems(facts({ screenshotCounts: { APP_IPHONE_65: 4 } }));
  assert.match(messages(problems), /no screenshots for APP_IPAD_PRO_3GEN_129/);
});

// --- rules that only apply to some apps --------------------------------------

test('a one-time purchase does not need a terms link in the description', () => {
  // Guideline 3.1.2 is about auto-renewable subscriptions. Asserting it here
  // would flag every release of this app forever.
  assert.deepEqual(findPreflightProblems(facts({ sellsSubscription: false })), []);
});

test('a subscription without a terms link in the description is a blocker', () => {
  const problems = findPreflightProblems(facts({ sellsSubscription: true }));
  assert.match(messages(problems), /no terms-of-use link/);
});

test('an app with no in-app purchase is not asked for one', () => {
  const problems = findPreflightProblems(
    facts({
      iap: null,
      submissionItems: [{ kind: 'appStoreVersion', state: 'READY_FOR_REVIEW' }],
    }),
  );
  assert.deepEqual(problems, []);
});

// --- notes that go stale ------------------------------------------------------

test('non-empty review notes are surfaced for a human to re-read', () => {
  const problems = findPreflightProblems(facts({ reviewNotes: '保護者向け問題はメニューから' }));
  assert.equal(blockers(problems).length, 0);
  assert.match(messages(problems), /re-read them against the build/);
});

test('whitespace-only notes are treated as empty', () => {
  assert.deepEqual(findPreflightProblems(facts({ reviewNotes: '   \n  ' })), []);
});

// --- reporting ----------------------------------------------------------------

test('every problem is reported at once, not just the first', () => {
  // One fix per review cycle is the failure mode this whole file exists for.
  const problems = findPreflightProblems(
    facts({
      build: null,
      privacyPolicyUrl: null,
      screenshotCounts: {},
      iap: { ...facts().iap, hasPrice: false },
    }),
  );
  assert.ok(problems.length >= 5, `expected several problems, got ${problems.length}`);
});

test('the report puts blockers before warnings', () => {
  const report = formatPreflightReport(
    findPreflightProblems(
      facts({ build: null, localizations: [{ ...facts().localizations[0], marketingUrl: null }] }),
    ),
  );
  assert.ok(report.indexOf('✗') < report.indexOf('!'), report);
  assert.match(report, /1 blocker\(s\), 1 warning\(s\)/);
});

test('a clean run says so rather than printing an empty list', () => {
  assert.equal(formatPreflightReport([]), 'preflight: nothing to fix.');
});
