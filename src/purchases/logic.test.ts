import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  selectApiKey,
  pickPackage,
  pickProduct,
  classifyPurchaseError,
  describePurchaseOutcome,
  shouldShowPurchaseControls,
  shouldShowPrice,
} from './logic.ts';

// --- selectApiKey ---------------------------------------------------------
// This is the exact failure that shipped in 1.0 (build 3) and got the app
// rejected: the production env vars did not exist yet, so the config fell back
// to '' and the SDK was configured with an empty key.

test('selectApiKey picks the key for the running platform', () => {
  const keys = { apiKeyIos: 'appl_ios', apiKeyAndroid: 'goog_android' };
  assert.equal(selectApiKey('ios', keys), 'appl_ios');
  assert.equal(selectApiKey('android', keys), 'goog_android');
});

test('selectApiKey returns null for an empty key so init can refuse to configure', () => {
  assert.equal(selectApiKey('ios', { apiKeyIos: '', apiKeyAndroid: 'goog' }), null);
  assert.equal(selectApiKey('android', { apiKeyIos: 'appl', apiKeyAndroid: '' }), null);
});

test('selectApiKey treats a whitespace-only key as missing', () => {
  assert.equal(selectApiKey('ios', { apiKeyIos: '   ', apiKeyAndroid: 'goog' }), null);
});

test('selectApiKey trims surrounding whitespace from a real key', () => {
  assert.equal(selectApiKey('ios', { apiKeyIos: '  appl_ios\n', apiKeyAndroid: '' }), 'appl_ios');
});

// --- pickPackage / pickProduct -------------------------------------------

test('pickPackage prefers the exact product id', () => {
  const packages = [
    { product: { identifier: 'test_product' } },
    { product: { identifier: 'remove_ads_lifetime' } },
  ];
  assert.equal(pickPackage(packages, 'remove_ads_lifetime'), packages[1]);
});

test('pickPackage falls back only when there is exactly one package', () => {
  const only = [{ product: { identifier: 'renamed_product' } }];
  assert.equal(pickPackage(only, 'remove_ads_lifetime'), only[0]);
});

test('pickPackage refuses to guess between several non-matching packages', () => {
  const ambiguous = [
    { product: { identifier: 'test_product_a' } },
    { product: { identifier: 'test_product_b' } },
  ];
  assert.equal(pickPackage(ambiguous, 'remove_ads_lifetime'), null);
});

test('pickPackage handles an empty or missing offering', () => {
  assert.equal(pickPackage([], 'remove_ads_lifetime'), null);
  assert.equal(pickPackage(undefined, 'remove_ads_lifetime'), null);
});

test('pickProduct applies the same rules to raw store products', () => {
  const products = [{ identifier: 'other' }, { identifier: 'remove_ads_lifetime' }];
  assert.equal(pickProduct(products, 'remove_ads_lifetime'), products[1]);
  assert.equal(pickProduct([{ identifier: 'other' }], 'remove_ads_lifetime')?.identifier, 'other');
  assert.equal(pickProduct(products, 'nothing_matches'), null);
  assert.equal(pickProduct([], 'remove_ads_lifetime'), null);
});

// --- classifyPurchaseError ------------------------------------------------

test('classifyPurchaseError recognises a deliberate cancel', () => {
  assert.equal(classifyPurchaseError({ userCancelled: true }), 'cancelled');
});

test('classifyPurchaseError treats everything else as unknown', () => {
  assert.equal(classifyPurchaseError({ userCancelled: false }), 'unknown');
  assert.equal(classifyPurchaseError(new Error('network down')), 'unknown');
  assert.equal(classifyPurchaseError(null), 'unknown');
  assert.equal(classifyPurchaseError(undefined), 'unknown');
});

// --- describePurchaseOutcome ---------------------------------------------
// The rejection cause in UI form: every non-cancel outcome must produce
// visible feedback.

test('describePurchaseOutcome reports success', () => {
  assert.deepEqual(describePurchaseOutcome({ success: true }), { kind: 'success' });
});

test('describePurchaseOutcome stays silent only for a user cancel', () => {
  assert.deepEqual(describePurchaseOutcome({ success: false, error: 'cancelled' }), {
    kind: 'silent',
  });
});

test('describePurchaseOutcome explains an unusable store', () => {
  assert.deepEqual(describePurchaseOutcome({ success: false, error: 'not_configured' }), {
    kind: 'unavailable',
  });
  assert.deepEqual(describePurchaseOutcome({ success: false, error: 'no_offering' }), {
    kind: 'unavailable',
  });
});

test('every non-cancel failure produces visible feedback', () => {
  const codes = ['not_configured', 'no_offering', 'unknown', undefined] as const;
  for (const error of codes) {
    const feedback = describePurchaseOutcome({ success: false, error });
    assert.notEqual(feedback.kind, 'silent', `error=${error} must not be swallowed`);
  }
});

// --- shouldShowPurchaseControls ------------------------------------------

test('purchase controls appear only when a purchase can actually happen', () => {
  assert.equal(
    shouldShowPurchaseControls({ platformOS: 'ios', purchaseAvailable: true, adFree: false }),
    true,
  );
});

test('purchase controls are hidden on web, when unconfigured, or once ad-free', () => {
  assert.equal(
    shouldShowPurchaseControls({ platformOS: 'web', purchaseAvailable: true, adFree: false }),
    false,
  );
  assert.equal(
    shouldShowPurchaseControls({ platformOS: 'ios', purchaseAvailable: false, adFree: false }),
    false,
  );
  assert.equal(
    shouldShowPurchaseControls({ platformOS: 'ios', purchaseAvailable: true, adFree: true }),
    false,
  );
});

// --- shouldShowPrice ------------------------------------------------------

test('shouldShowPrice requires the currencies to match', () => {
  assert.equal(shouldShowPrice('JPY', 'JPY'), true);
  assert.equal(shouldShowPrice('jpy', 'JPY'), true);
  assert.equal(shouldShowPrice('USD', 'JPY'), false);
});

test('shouldShowPrice refuses when either currency is unknown', () => {
  assert.equal(shouldShowPrice(null, 'JPY'), false);
  assert.equal(shouldShowPrice('JPY', undefined), false);
  assert.equal(shouldShowPrice('', 'JPY'), false);
});
