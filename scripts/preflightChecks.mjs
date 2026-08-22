// Everything that has ever sent this app back from App Review, as checks.
//
// Submitting is one button, and getting it wrong costs a review cycle — days
// of waiting for a rejection you could have seen in a second. So each past
// rejection becomes a rule here, and every problem is reported at once: a
// checker that stops at the first one turns a fix into several round trips.
//
// Pure on purpose. The facts come from the API and the network in
// preflight.mjs; the judgement lives here where it can be tested.

import { findSubmissionProblems } from './reviewSubmission.mjs';

/** States in which the version can still be edited and submitted. */
const EDITABLE_STATES = new Set([
  'PREPARE_FOR_SUBMISSION',
  'DEVELOPER_REJECTED',
  'REJECTED',
  'READY_FOR_REVIEW',
  'METADATA_REJECTED',
]);

/** In-app purchase states that can go into a submission. */
const SUBMITTABLE_IAP_STATES = new Set([
  'READY_TO_SUBMIT',
  'PREPARE_FOR_SUBMISSION',
  'DEVELOPER_ACTION_NEEDED',
  'MISSING_METADATA',
]);

const blocker = (message) => ({ severity: 'blocker', message });
const warning = (message) => ({ severity: 'warning', message });

/**
 * Every reason this submission would be a waste of a review cycle.
 *
 * @param facts {{
 *   versionState: string,
 *   build: { version: string, processingState: string } | null,
 *   screenshotCounts: Record<string, number>,
 *   requiredDisplayTypes: string[],
 *   localizations: Array<{ locale: string, description: string, supportUrl: string|null, marketingUrl: string|null }>,
 *   privacyPolicyUrl: string|null,
 *   urlStatuses: Record<string, number>,
 *   reviewNotes: string|null,
 *   sellsSubscription: boolean,
 *   iap: { productId: string, state: string, hasReviewScreenshot: boolean, hasLocalization: boolean, hasPrice: boolean } | null,
 *   submissionItems: Array<{ kind: string, state: string }> | null,
 * }}
 */
export function findPreflightProblems(facts) {
  const problems = [];

  // --- the binary --------------------------------------------------------
  if (!EDITABLE_STATES.has(facts.versionState)) {
    // Not a defect: it means the work is already done, or in Apple's hands.
    problems.push(warning(`version is ${facts.versionState}; nothing to submit right now`));
  }
  if (!facts.build) {
    problems.push(blocker('no build attached to the version'));
  } else if (facts.build.processingState !== 'VALID') {
    problems.push(
      blocker(`build ${facts.build.version} is ${facts.build.processingState}, not VALID`),
    );
  }

  // --- screenshots -------------------------------------------------------
  // Apple reviews on an iPad because the app declares tablet support, and an
  // empty display class blocks submission outright.
  for (const displayType of facts.requiredDisplayTypes) {
    const count = facts.screenshotCounts[displayType] ?? 0;
    if (count === 0) problems.push(blocker(`no screenshots for ${displayType}`));
  }

  // --- URLs Apple and AdMob follow ---------------------------------------
  // A 404 here is a rejection the reviewer hands you for free: the support URL
  // was once dead while the app sat in WAITING_FOR_REVIEW.
  for (const loc of facts.localizations) {
    if (!loc.supportUrl) {
      problems.push(blocker(`${loc.locale}: no support URL`));
    } else {
      const status = facts.urlStatuses[loc.supportUrl];
      if (status !== 200) problems.push(blocker(`support URL is HTTP ${status}: ${loc.supportUrl}`));
    }
    if (!loc.marketingUrl) {
      // Not a review blocker. It is how AdMob finds app-ads.txt for an iOS
      // app, so leaving it empty caps iOS ad revenue rather than the release.
      problems.push(warning(`${loc.locale}: no marketing URL — AdMob cannot verify the iOS app`));
    } else if (facts.urlStatuses[loc.marketingUrl] !== 200) {
      problems.push(
        blocker(`marketing URL is HTTP ${facts.urlStatuses[loc.marketingUrl]}: ${loc.marketingUrl}`),
      );
    }
  }
  if (!facts.privacyPolicyUrl) {
    problems.push(blocker('no privacy policy URL'));
  } else if (facts.urlStatuses[facts.privacyPolicyUrl] !== 200) {
    problems.push(
      blocker(
        `privacy policy URL is HTTP ${facts.urlStatuses[facts.privacyPolicyUrl]}: ${facts.privacyPolicyUrl}`,
      ),
    );
  }

  // --- subscriptions only -------------------------------------------------
  // Guideline 3.1.2 wants a terms link in the store description, but only for
  // auto-renewable subscriptions. Asserting it for a one-time purchase would
  // be noise, so it is gated on what the app actually sells.
  if (facts.sellsSubscription) {
    for (const loc of facts.localizations) {
      if (!/https?:\/\//.test(loc.description ?? '')) {
        problems.push(blocker(`${loc.locale}: description has no terms-of-use link (3.1.2)`));
      }
    }
  }

  // --- review notes -------------------------------------------------------
  // Notes answering a previous rejection go stale silently, and a reviewer
  // following directions to a feature that no longer exists rejects on exactly
  // that. This cannot be judged mechanically, so surface it for a human.
  if (facts.reviewNotes && facts.reviewNotes.trim() !== '') {
    problems.push(
      warning(`review notes are not empty — re-read them against the build:\n      ${facts.reviewNotes.trim().replace(/\n/g, '\n      ')}`),
    );
  }

  // --- the in-app purchase ------------------------------------------------
  if (facts.iap) {
    if (!SUBMITTABLE_IAP_STATES.has(facts.iap.state)) {
      problems.push(warning(`in-app purchase is ${facts.iap.state}`));
    }
    if (!facts.iap.hasReviewScreenshot) {
      // Apple states this outright: without it the purchase cannot be
      // submitted, and a version submitted without its first purchase is the
      // 2026-08-20 rejection.
      problems.push(blocker(`${facts.iap.productId}: no App Review screenshot`));
    }
    if (!facts.iap.hasLocalization) {
      problems.push(blocker(`${facts.iap.productId}: no localization`));
    }
    if (!facts.iap.hasPrice) {
      problems.push(blocker(`${facts.iap.productId}: no price set`));
    }
  }

  // --- what is actually in the submission ---------------------------------
  if (facts.submissionItems) {
    for (const message of findSubmissionProblems(facts.submissionItems, {
      expectInAppPurchase: facts.iap !== null,
    })) {
      problems.push(blocker(message));
    }
  }

  return problems;
}

/** Formats the report. Blockers first, because they are what stops the release. */
export function formatPreflightReport(problems) {
  if (problems.length === 0) return 'preflight: nothing to fix.';
  const order = { blocker: 0, warning: 1 };
  const sorted = [...problems].sort((a, b) => order[a.severity] - order[b.severity]);
  const lines = sorted.map((p) => `  ${p.severity === 'blocker' ? '✗' : '!'} ${p.message}`);
  const blockers = problems.filter((p) => p.severity === 'blocker').length;
  return (
    `preflight: ${blockers} blocker(s), ${problems.length - blockers} warning(s)\n` +
    lines.join('\n')
  );
}
