import { test, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';

// Exercises the real module, not a copy of its logic — the interesting bugs
// here live in the storage round-trip (key naming, JSON parsing, the
// only-if-higher comparison), not in any one pure function.
// Needs --experimental-test-module-mocks; see the "test" script in package.json.
const store = new Map<string, string>();
let failNextGet = false;
let failNextSet = false;

mock.module('@react-native-async-storage/async-storage', {
  defaultExport: {
    getItem: async (key: string) => {
      if (failNextGet) {
        failNextGet = false;
        throw new Error('storage unavailable');
      }
      return store.has(key) ? store.get(key)! : null;
    },
    setItem: async (key: string, value: string) => {
      if (failNextSet) {
        failNextSet = false;
        throw new Error('disk full');
      }
      store.set(key, value);
    },
  },
});

const { getBestResult, saveBestResultIfHigher } = await import('./bestResult.ts');

const KEY = 'dialect-quiz.best.osaka';

beforeEach(() => {
  store.clear();
  failNextGet = false;
  failNextSet = false;
});

test('no record yet reads as null', async () => {
  assert.equal(await getBestResult('osaka'), null);
});

test('a saved result reads back unchanged', async () => {
  await saveBestResultIfHigher('osaka', { score: 7, title: '大阪弁上級者' });
  assert.deepEqual(await getBestResult('osaka'), { score: 7, title: '大阪弁上級者' });
});

test('the storage key is namespaced per prefecture', async () => {
  await saveBestResultIfHigher('osaka', { score: 7, title: 'A' });
  assert.deepEqual([...store.keys()], [KEY]);
});

test('one prefecture cannot overwrite another prefecture best score', async () => {
  // 47 apps share this codebase; a shared key would have every app showing
  // whichever one was played last.
  await saveBestResultIfHigher('osaka', { score: 9, title: 'Osaka' });
  await saveBestResultIfHigher('hokkaido', { score: 3, title: 'Hokkaido' });
  assert.deepEqual(await getBestResult('osaka'), { score: 9, title: 'Osaka' });
  assert.deepEqual(await getBestResult('hokkaido'), { score: 3, title: 'Hokkaido' });
});

// --- only-if-higher ---------------------------------------------------------

test('a higher score replaces the record', async () => {
  await saveBestResultIfHigher('osaka', { score: 5, title: 'old' });
  await saveBestResultIfHigher('osaka', { score: 8, title: 'new' });
  assert.deepEqual(await getBestResult('osaka'), { score: 8, title: 'new' });
});

test('a lower score leaves the record alone', async () => {
  await saveBestResultIfHigher('osaka', { score: 8, title: 'best' });
  await saveBestResultIfHigher('osaka', { score: 2, title: 'worse' });
  assert.deepEqual(await getBestResult('osaka'), { score: 8, title: 'best' });
});

test('an equal score does not rewrite the record', async () => {
  await saveBestResultIfHigher('osaka', { score: 8, title: 'first' });
  await saveBestResultIfHigher('osaka', { score: 8, title: 'second' });
  assert.deepEqual(await getBestResult('osaka'), { score: 8, title: 'first' });
});

test('an equal score of zero does not rewrite the record either', async () => {
  // The score-8 case above passes even if the "nothing saved yet" check is
  // written as `!existing?.score`, because 0 is falsy — this is the case that
  // tells the two apart.
  await saveBestResultIfHigher('osaka', { score: 0, title: 'first' });
  await saveBestResultIfHigher('osaka', { score: 0, title: 'second' });
  assert.deepEqual(await getBestResult('osaka'), { score: 0, title: 'first' });
});

test('a zero score is still recorded when nothing exists yet', async () => {
  // "0 is falsy" is the classic way this check gets broken.
  await saveBestResultIfHigher('osaka', { score: 0, title: 'ようこそ大阪へ!' });
  assert.deepEqual(await getBestResult('osaka'), { score: 0, title: 'ようこそ大阪へ!' });
});

test('any score above an existing zero replaces it', async () => {
  await saveBestResultIfHigher('osaka', { score: 0, title: 'zero' });
  await saveBestResultIfHigher('osaka', { score: 1, title: 'one' });
  assert.deepEqual(await getBestResult('osaka'), { score: 1, title: 'one' });
});

// --- data that predates or outlives the current app version -----------------

test('a stale shape from an older version reads as null, not as a broken record', async () => {
  store.set(KEY, JSON.stringify({ score: 7, titleKey: 'result.master' }));
  assert.equal(await getBestResult('osaka'), null);
});

test('corrupted JSON reads as null instead of throwing', async () => {
  store.set(KEY, '{not json');
  assert.equal(await getBestResult('osaka'), null);
});

test('a JSON value of the wrong type reads as null', async () => {
  for (const raw of ['null', '"a string"', '42', '[]']) {
    store.clear();
    store.set(KEY, raw);
    assert.equal(await getBestResult('osaka'), null, `raw=${raw}`);
  }
});

test('a record with the wrong field types reads as null', async () => {
  store.set(KEY, JSON.stringify({ score: '7', title: 'A' }));
  assert.equal(await getBestResult('osaka'), null);
});

test('an unreadable stale record is replaced by the next result', async () => {
  // Otherwise a user with corrupted storage could never set a best score again.
  store.set(KEY, '{not json');
  await saveBestResultIfHigher('osaka', { score: 4, title: 'fresh' });
  assert.deepEqual(await getBestResult('osaka'), { score: 4, title: 'fresh' });
});

// --- storage failures -------------------------------------------------------

test('a read failure reads as null rather than crashing the home screen', async () => {
  failNextGet = true;
  assert.equal(await getBestResult('osaka'), null);
});

test('a write failure is swallowed so finishing a quiz never crashes', async () => {
  failNextSet = true;
  await assert.doesNotReject(saveBestResultIfHigher('osaka', { score: 5, title: 'A' }));
});
