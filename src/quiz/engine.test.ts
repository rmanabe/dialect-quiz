import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuiz, getTitle, isPerfectScore, DEFAULT_TITLE_TIERS } from './engine.ts';
import type { RawQuestion, TitleTier } from './types.ts';

function pool(size: number): RawQuestion[] {
  return Array.from({ length: size }, (_, i) => ({
    id: i + 1,
    word: `word${i + 1}`,
    meaning_ja: `意味${i + 1}`,
  }));
}

// buildQuiz shuffles, so every invariant is checked over many runs rather than
// once — a one-shot assertion would pass by luck.
const RUNS = 200;

test('buildQuiz returns the requested number of questions', () => {
  for (let i = 0; i < RUNS; i++) {
    assert.equal(buildQuiz(pool(144), 10).length, 10);
  }
});

test('buildQuiz never repeats a question within one quiz', () => {
  for (let i = 0; i < RUNS; i++) {
    const items = buildQuiz(pool(144), 10);
    assert.equal(new Set(items.map((q) => q.id)).size, items.length);
  }
});

test('buildQuiz gives every question four distinct choices', () => {
  for (let i = 0; i < RUNS; i++) {
    for (const item of buildQuiz(pool(144), 10)) {
      assert.equal(item.choices.length, 4);
      assert.equal(new Set(item.choices).size, 4, `duplicate choice in ${JSON.stringify(item)}`);
    }
  }
});

test('buildQuiz points correctIndex at the real meaning', () => {
  const source = pool(144);
  const meaningById = new Map(source.map((q) => [q.id, q.meaning_ja]));
  for (let i = 0; i < RUNS; i++) {
    for (const item of buildQuiz(source, 10)) {
      assert.equal(item.choices[item.correctIndex], meaningById.get(item.id));
    }
  }
});

test('buildQuiz spreads the correct answer across all four positions', () => {
  // A correctIndex that is always 0 would make the quiz trivially winnable.
  const seen = new Set<number>();
  for (let i = 0; i < RUNS; i++) {
    for (const item of buildQuiz(pool(144), 10)) seen.add(item.correctIndex);
  }
  assert.deepEqual([...seen].sort(), [0, 1, 2, 3]);
});

test('buildQuiz caps the quiz at the pool size when the bank is tiny', () => {
  const items = buildQuiz(pool(3), 10);
  assert.equal(items.length, 3);
});

test('buildQuiz survives a pool too small to fill four choices', () => {
  // Fewer distractors than slots must not crash or emit an empty choice.
  const items = buildQuiz(pool(2), 2);
  for (const item of items) {
    assert.ok(item.choices.length >= 1 && item.choices.length <= 4);
    assert.ok(item.choices.every((c) => typeof c === 'string' && c.length > 0));
    assert.ok(item.correctIndex >= 0 && item.correctIndex < item.choices.length);
  }
});

test('buildQuiz does not mutate the pool it was given', () => {
  const source = pool(20);
  const before = source.map((q) => q.id);
  buildQuiz(source, 10);
  assert.deepEqual(
    source.map((q) => q.id),
    before,
  );
});

// --- getTitle -------------------------------------------------------------

test('getTitle returns the tier matching the score', () => {
  assert.equal(getTitle(10).title, '方言マスター');
  assert.equal(getTitle(9).title, '方言上級者');
  assert.equal(getTitle(6).title, '方言中級者');
  assert.equal(getTitle(0).title, 'ようこそ!');
});

test('getTitle normalises a score out of a different total', () => {
  // 5/5 is a perfect run and must read as one, not as the mid tier.
  assert.equal(getTitle(5, 5).title, '方言マスター');
  assert.equal(getTitle(0, 5).title, 'ようこそ!');
});

test('getTitle prefers custom tiers when a prefecture defines them', () => {
  const custom: TitleTier[] = [
    { minScore: 5, title: '生粋のオオサカン', description: '' },
    { minScore: 0, title: 'ようこそ大阪へ!', description: '' },
  ];
  assert.equal(getTitle(10, 10, custom).title, '生粋のオオサカン');
  assert.equal(getTitle(1, 10, custom).title, 'ようこそ大阪へ!');
});

test('getTitle falls back to the defaults when custom tiers are empty', () => {
  assert.equal(getTitle(10, 10, []).title, '方言マスター');
});

test('getTitle always resolves to a tier for every reachable score', () => {
  for (let score = 0; score <= 10; score++) {
    const tier = getTitle(score);
    assert.ok(tier && tier.title, `no tier for score ${score}`);
  }
});

test('DEFAULT_TITLE_TIERS are ordered high-to-low so find() picks the best match', () => {
  const mins = DEFAULT_TITLE_TIERS.map((t) => t.minScore);
  assert.deepEqual(mins, [...mins].sort((a, b) => b - a));
  assert.equal(mins[mins.length - 1], 0, 'the lowest tier must catch a score of 0');
});

// --- isPerfectScore -------------------------------------------------------

test('isPerfectScore is true only for a full score', () => {
  assert.equal(isPerfectScore(10, 10), true);
  assert.equal(isPerfectScore(9, 10), false);
});

test('isPerfectScore is false when no questions were asked', () => {
  assert.equal(isPerfectScore(0, 0), false);
});
