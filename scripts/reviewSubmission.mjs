// What a review submission has to contain before it is worth Apple's time.
//
// 1.0 (build 4) was rejected on 2026-08-20 under Guideline 2.1(b) with
// "the In-App Purchase products have not been submitted for review". The
// binary was fine. What happened is that the previous submission was cleared
// by moving *only* the app version into a new submission, which left the
// in-app purchase behind in the old one — so the new submission held a single
// item, and App Review saw an app advertising a purchase it could not test.
//
// Apple requires the first in-app purchase to be reviewed together with an app
// version, and nothing in App Store Connect warns you when it is missing. This
// module is that warning. Kept pure so it can be tested without a network.

/** Relationship names, as the API spells them, for the items we ever submit. */
export const APP_VERSION = 'appStoreVersion';
export const IN_APP_PURCHASE = 'inAppPurchaseVersion';

/**
 * Everything wrong with this set of submission items, as human-readable
 * problems. Empty means it is safe to send to App Review.
 *
 * @param items   [{ kind, state }] — the items currently in the submission.
 * @param options { expectInAppPurchase } — false only for an app with no IAP.
 */
export function findSubmissionProblems(items, options = {}) {
  const { expectInAppPurchase = true } = options;
  const problems = [];

  // A removed item keeps appearing in the listing, so presence has to be
  // counted over live items only — otherwise a submission whose purchase was
  // removed looks complete, which is the failure this whole module exists for.
  const live = items.filter((i) => i.state !== 'REMOVED');

  const versions = live.filter((i) => i.kind === APP_VERSION);
  if (versions.length === 0) problems.push('no app version in the submission');
  if (versions.length > 1) problems.push(`${versions.length} app versions in the submission`);

  const purchases = live.filter((i) => i.kind === IN_APP_PURCHASE);
  if (expectInAppPurchase && purchases.length === 0) {
    problems.push(
      'no in-app purchase in the submission — the app offers one, so App Review ' +
        'cannot complete without it (Guideline 2.1(b), the 2026-08-20 rejection)',
    );
  }
  if (!expectInAppPurchase && purchases.length > 0) {
    problems.push('an in-app purchase is attached but the app is not expected to have one');
  }

  // A removed item still comes back in the listing. Submitting around one means
  // shipping less than you think you are.
  for (const item of items) {
    if (item.state === 'REMOVED') problems.push(`item ${item.kind} is REMOVED, not submittable`);
  }

  return problems;
}

/** The message asc-submit.mjs refuses with. Kept here so its wording is testable. */
export function submissionErrorMessage(problems) {
  return (
    'Refusing to submit — this submission would repeat a known rejection:\n' +
    problems.map((p) => `  - ${p}`).join('\n') +
    '\n\nFix the submission (see scripts/asc-submit.mjs stage) and try again.'
  );
}
