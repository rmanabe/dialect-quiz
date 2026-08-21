import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  APP_VERSION,
  IN_APP_PURCHASE,
  findSubmissionProblems,
  submissionErrorMessage,
} from './reviewSubmission.mjs';

const version = { kind: APP_VERSION, state: 'READY_FOR_REVIEW' };
const purchase = { kind: IN_APP_PURCHASE, state: 'READY_FOR_REVIEW' };

test('a version submitted together with its in-app purchase is accepted', () => {
  assert.deepEqual(findSubmissionProblems([version, purchase]), []);
});

// --- the rejection this file exists to prevent ------------------------------

test('a lone app version is refused', () => {
  // Exactly the shape of the submission Apple rejected on 2026-08-20.
  const problems = findSubmissionProblems([version]);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /no in-app purchase/);
});

test('a lone in-app purchase is refused', () => {
  // The first IAP cannot be reviewed without an app version.
  assert.deepEqual(findSubmissionProblems([purchase]), ['no app version in the submission']);
});

test('an empty submission reports both halves, not just the first', () => {
  const problems = findSubmissionProblems([]);
  assert.equal(problems.length, 2);
});

// --- states that look present but are not -----------------------------------

test('a removed item does not count as present', () => {
  // Removed items keep showing up in the listing, so a naive length check on
  // the item list would pass here.
  const problems = findSubmissionProblems([version, { ...purchase, state: 'REMOVED' }]);
  assert.equal(problems.length, 2);
  assert.match(problems.join('\n'), /no in-app purchase/);
  assert.match(problems.join('\n'), /REMOVED/);
});

test('a removed app version is caught even when the purchase is fine', () => {
  // Two problems, not one: the submission has no live version *and* the reason
  // why. Reporting only the second would read as "just re-add it" when the
  // submission is in fact empty of anything reviewable.
  const problems = findSubmissionProblems([{ ...version, state: 'REMOVED' }, purchase]);
  assert.deepEqual(problems, [
    'no app version in the submission',
    `item ${APP_VERSION} is REMOVED, not submittable`,
  ]);
});

test('two app versions in one submission are refused', () => {
  assert.deepEqual(findSubmissionProblems([version, version, purchase]), [
    '2 app versions in the submission',
  ]);
});

// --- apps without a purchase ------------------------------------------------

test('an app with no in-app purchase may submit the version alone', () => {
  assert.deepEqual(findSubmissionProblems([version], { expectInAppPurchase: false }), []);
});

test('an unexpected in-app purchase is refused', () => {
  assert.deepEqual(findSubmissionProblems([version, purchase], { expectInAppPurchase: false }), [
    'an in-app purchase is attached but the app is not expected to have one',
  ]);
});

test('the refusal message lists every problem', () => {
  const message = submissionErrorMessage(findSubmissionProblems([]));
  assert.match(message, /no app version/);
  assert.match(message, /no in-app purchase/);
});
