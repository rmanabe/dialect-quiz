import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

// index.js is CommonJS on purpose (app.config.ts require()s it under node
// without transpilation), so load it the same way the Expo config does.
const require_ = createRequire(import.meta.url);
const { registry, getActivePrefectureId, getPrefectureConfig } = require_('./index.js');

interface PrefectureConfig {
  id: string;
  nameJa: string;
  appNameJa: string;
  bundleId: string;
  scheme: string;
  theme: { primary: string; secondary: string; accent: string; background: string };
  revenueCat: { entitlementId: string; productId: string };
}

const all: PrefectureConfig[] = Object.values(registry);

test('the registry holds all 47 prefectures', () => {
  assert.equal(all.length, 47);
});

test('each entry is filed under its own id', () => {
  for (const [key, config] of Object.entries(registry) as [string, PrefectureConfig][]) {
    assert.equal(config.id, key, `registry["${key}"] has id "${config.id}"`);
  }
});

test('bundle ids are unique', () => {
  // Two prefectures sharing a bundle id would overwrite each other on the
  // store, and the mistake is invisible until upload is rejected.
  const ids = all.map((p) => p.bundleId);
  const duplicates = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  assert.deepEqual(duplicates, []);
});

test('url schemes are unique', () => {
  // A shared scheme means deep links open whichever app the OS picked.
  const schemes = all.map((p) => p.scheme);
  const duplicates = [...new Set(schemes.filter((s, i) => schemes.indexOf(s) !== i))];
  assert.deepEqual(duplicates, []);
});

test('bundle ids and schemes follow the established shape', () => {
  for (const p of all) {
    assert.equal(p.bundleId, `com.robonetc.dialectquiz.${p.id}`, `${p.id}: unexpected bundleId`);
    assert.equal(p.scheme, `dialectquiz${p.id}`, `${p.id}: unexpected scheme`);
  }
});

test('every prefecture carries the display strings the UI reads', () => {
  for (const p of all) {
    for (const field of ['nameJa', 'appNameJa'] as const) {
      assert.ok(
        typeof p[field] === 'string' && p[field].trim().length > 0,
        `${p.id}: empty ${field}`,
      );
    }
  }
});

test('theme colours are complete hex values', () => {
  for (const p of all) {
    for (const slot of ['primary', 'secondary', 'accent', 'background'] as const) {
      assert.match(p.theme[slot], /^#[0-9A-Fa-f]{6}$/, `${p.id}: bad theme.${slot}`);
    }
  }
});

test('every prefecture sells the same entitlement and product', () => {
  // The purchase code looks these up by name; a typo in one prefecture would
  // leave that app unable to unlock what the user paid for.
  for (const p of all) {
    assert.equal(p.revenueCat.entitlementId, 'remove_ads', `${p.id}: wrong entitlementId`);
    assert.equal(p.revenueCat.productId, 'remove_ads_lifetime', `${p.id}: wrong productId`);
  }
});

// --- prefecture selection ---------------------------------------------------

test('getActivePrefectureId falls back to osaka', () => {
  // Documented footgun: any tooling run without EXPO_PUBLIC_PREFECTURE set
  // silently targets the released Osaka app.
  const saved = process.env.EXPO_PUBLIC_PREFECTURE;
  try {
    delete process.env.EXPO_PUBLIC_PREFECTURE;
    assert.equal(getActivePrefectureId(), 'osaka');
    process.env.EXPO_PUBLIC_PREFECTURE = 'hokkaido';
    assert.equal(getActivePrefectureId(), 'hokkaido');
  } finally {
    if (saved === undefined) delete process.env.EXPO_PUBLIC_PREFECTURE;
    else process.env.EXPO_PUBLIC_PREFECTURE = saved;
  }
});

test('getPrefectureConfig rejects an unknown id instead of returning undefined', () => {
  assert.throws(() => getPrefectureConfig('atlantis'), /Unknown prefecture id "atlantis"/);
});

test('getPrefectureConfig returns the requested prefecture', () => {
  assert.equal(getPrefectureConfig('osaka').appNameJa, '大阪弁クイズ');
});
