import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

// CommonJS on purpose (see the file header), so load it the way Expo does.
const require_ = createRequire(import.meta.url);
const { findProductionConfigProblems, productionConfigErrorMessage } =
  require_('./productionGuard.js') as typeof import('./productionGuard.js');

const REAL_ENV = {
  EXPO_PUBLIC_ADMOB_IOS_APP_ID: 'ca-app-pub-4795670403486628~1111111111',
  EXPO_PUBLIC_ADMOB_ANDROID_APP_ID: 'ca-app-pub-4795670403486628~8958097928',
  EXPO_PUBLIC_ADMOB_IOS_BANNER_ID: 'ca-app-pub-4795670403486628/2222222222',
  EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID: 'ca-app-pub-4795670403486628/3333333333',
};

const REAL_KEYS = { apiKeyIos: 'appl_realkey', apiKeyAndroid: 'goog_realkey' };

function check(overrides: {
  revenueCat?: Partial<typeof REAL_KEYS>;
  env?: Record<string, string | undefined>;
}) {
  return findProductionConfigProblems({
    prefectureId: 'osaka',
    revenueCat: { ...REAL_KEYS, ...overrides.revenueCat },
    env: { ...REAL_ENV, ...overrides.env },
  });
}

test('a fully configured production environment passes', () => {
  assert.deepEqual(check({}), []);
});

// --- the bug that actually shipped -----------------------------------------

test('an empty RevenueCat iOS key is caught', () => {
  // This is precisely how 1.0 (build 3) went to Apple.
  const problems = check({ revenueCat: { apiKeyIos: '' } });
  assert.deepEqual(problems, ['EXPO_PUBLIC_REVENUECAT_IOS_KEY is missing']);
});

test('an undefined RevenueCat Android key is caught', () => {
  const problems = check({ revenueCat: { apiKeyAndroid: undefined } });
  assert.deepEqual(problems, ['EXPO_PUBLIC_REVENUECAT_ANDROID_KEY is missing']);
});

test('a whitespace-only key counts as missing', () => {
  assert.deepEqual(check({ revenueCat: { apiKeyIos: '   ' } }), [
    'EXPO_PUBLIC_REVENUECAT_IOS_KEY is missing',
  ]);
});

// --- AdMob ------------------------------------------------------------------

test('each missing AdMob variable is reported', () => {
  for (const name of Object.keys(REAL_ENV)) {
    const problems = check({ env: { [name]: undefined } });
    assert.deepEqual(problems, [`${name} is missing`], `${name} was not reported`);
  }
});

test('a Google test ad unit left in a production variable is caught', () => {
  // The variable is set, so a presence-only check would wave this through and
  // the app would ship serving Google's demo ads for zero revenue.
  const problems = check({
    env: { EXPO_PUBLIC_ADMOB_ANDROID_APP_ID: 'ca-app-pub-3940256099942544~3347511713' },
  });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /EXPO_PUBLIC_ADMOB_ANDROID_APP_ID is set to a Google test ad unit/);
});

test('a test banner unit is caught too', () => {
  const problems = check({
    env: { EXPO_PUBLIC_ADMOB_IOS_BANNER_ID: 'ca-app-pub-3940256099942544/2934735716' },
  });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /Google test ad unit/);
});

// --- reporting --------------------------------------------------------------

test('every problem in a completely unconfigured environment is listed at once', () => {
  const problems = findProductionConfigProblems({
    prefectureId: 'osaka',
    revenueCat: { apiKeyIos: '', apiKeyAndroid: '' },
    env: {},
  });
  // Two RevenueCat keys plus four AdMob variables — one round of fixing, not six.
  assert.equal(problems.length, 6);
});

test('the error message names the prefecture and every problem', () => {
  const problems = ['EXPO_PUBLIC_REVENUECAT_IOS_KEY is missing'];
  const message = productionConfigErrorMessage('hokkaido', problems);
  assert.match(message, /hokkaido/);
  assert.match(message, /EXPO_PUBLIC_REVENUECAT_IOS_KEY is missing/);
  assert.match(message, /eas env:create/);
});
