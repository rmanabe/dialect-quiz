import { test } from 'node:test';
import assert from 'node:assert/strict';

import { adRequestConfiguration } from './requestConfiguration.ts';

// The real enum is a plain string map at runtime.
const RATINGS = { G: 'G', PG: 'PG', T: 'T', MA: 'MA' } as never;

test('the app no longer declares itself child-directed', () => {
  const config = adRequestConfiguration(RATINGS);
  assert.equal(config.tagForChildDirectedTreatment, false);
  assert.equal(config.tagForUnderAgeOfConsent, false);
});

test('ad content stays capped at PG for a listing rated for everyone', () => {
  assert.equal(adRequestConfiguration(RATINGS).maxAdContentRating, 'PG');
});

test('a missing enum falls back to the literal instead of throwing', () => {
  // An SDK downgrade that drops the enum would otherwise make this
  // `undefined.PG` — a TypeError during startup, which is a launch crash in a
  // release build and an instant store rejection.
  assert.equal(adRequestConfiguration(undefined).maxAdContentRating, 'PG');
});
