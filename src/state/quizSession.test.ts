import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  startSession,
  getSession,
  recordAnswer,
  computeScore,
  clearSession,
} from './quizSession.ts';
import type { QuizItem } from '../quiz/types.ts';

function item(id: number, correctIndex: number): QuizItem {
  return { id, word: `word${id}`, choices: ['a', 'b', 'c', 'd'], correctIndex };
}

// The session is module-level mutable state shared by every screen, so each
// test has to start from a known one.
beforeEach(() => clearSession());

test('there is no session before one is started', () => {
  assert.equal(getSession(), null);
});

test('startSession stores the items with no answers yet', () => {
  const items = [item(1, 0), item(2, 1)];
  startSession(items);
  const session = getSession();
  assert.deepEqual(session?.items, items);
  assert.deepEqual(session?.answers, []);
});

test('starting a second quiz discards the first quiz answers', () => {
  // Play, then hit "もう一度" — a leaked answer would inflate the next score.
  startSession([item(1, 0)]);
  recordAnswer(item(1, 0), 0);
  assert.equal(computeScore(), 1);

  startSession([item(2, 1)]);
  assert.deepEqual(getSession()?.answers, []);
  assert.equal(computeScore(), 0);
});

test('computeScore counts only the answers that matched correctIndex', () => {
  startSession([item(1, 0), item(2, 1), item(3, 2)]);
  recordAnswer(item(1, 0), 0); // correct
  recordAnswer(item(2, 1), 3); // wrong
  recordAnswer(item(3, 2), 2); // correct
  assert.equal(computeScore(), 2);
});

test('a perfect run scores every question', () => {
  const items = [item(1, 0), item(2, 1), item(3, 2), item(4, 3)];
  startSession(items);
  items.forEach((q) => recordAnswer(q, q.correctIndex));
  assert.equal(computeScore(), items.length);
});

test('computeScore is 0 with no session rather than throwing', () => {
  // result.tsx reads the score on mount; a throw here would be a white screen.
  assert.equal(computeScore(), 0);
});

test('recordAnswer without a session is ignored rather than throwing', () => {
  assert.doesNotThrow(() => recordAnswer(item(1, 0), 0));
  assert.equal(computeScore(), 0);
});

test('clearSession removes the session', () => {
  startSession([item(1, 0)]);
  recordAnswer(item(1, 0), 0);
  clearSession();
  assert.equal(getSession(), null);
  assert.equal(computeScore(), 0);
});

test('answers accumulate in the order they were given', () => {
  startSession([item(1, 0), item(2, 1)]);
  recordAnswer(item(1, 0), 3);
  recordAnswer(item(2, 1), 1);
  assert.deepEqual(
    getSession()?.answers.map((a) => [a.item.id, a.selectedIndex]),
    [
      [1, 3],
      [2, 1],
    ],
  );
});

test('a selectedIndex outside the choices is simply wrong, not a crash', () => {
  // -1 is what a "time ran out / skipped" path would plausibly pass.
  startSession([item(1, 0)]);
  recordAnswer(item(1, 0), -1);
  assert.equal(computeScore(), 0);
});
