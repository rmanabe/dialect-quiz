import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The banks are read from disk rather than through questionBank.ts because that
// module imports 47 JSON files through Metro's resolver, which plain node does
// not have. What matters here is the shipped data, and this reads exactly that.
const prefecturesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'prefectures');

const EXPECTED_PREFECTURES = 47;
// A floor, not an exact size: a few prefectures carry a handful of extra words
// and throwing content away to hit a round number would be a pointless loss.
const MIN_QUESTIONS = 144;

interface RawQuestion {
  id: number;
  word: string;
  meaning_ja: string;
}

const prefectureIds = fs
  .readdirSync(prefecturesDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(prefecturesDir, e.name, 'questions.json')))
  .map((e) => e.name)
  .sort();

function loadBank(id: string): RawQuestion[] {
  return JSON.parse(fs.readFileSync(path.join(prefecturesDir, id, 'questions.json'), 'utf8'));
}

test('all 47 prefectures ship a question bank', () => {
  assert.equal(prefectureIds.length, EXPECTED_PREFECTURES, `found: ${prefectureIds.join(', ')}`);
});

test('every bank holds at least 144 questions', () => {
  const short = prefectureIds
    .map((id) => [id, loadBank(id).length] as const)
    .filter(([, n]) => n < MIN_QUESTIONS);
  assert.deepEqual(short, [], `banks below ${MIN_QUESTIONS}: ${JSON.stringify(short)}`);
});

test('every question is a well-formed row', () => {
  for (const id of prefectureIds) {
    for (const q of loadBank(id)) {
      assert.equal(typeof q.id, 'number', `${id}: non-numeric id in ${JSON.stringify(q)}`);
      assert.ok(
        typeof q.word === 'string' && q.word.trim().length > 0,
        `${id}: empty word in ${JSON.stringify(q)}`,
      );
      assert.ok(
        typeof q.meaning_ja === 'string' && q.meaning_ja.trim().length > 0,
        `${id}: empty meaning in ${JSON.stringify(q)}`,
      );
    }
  }
});

test('ids are unique and sequential from 1 within each bank', () => {
  for (const id of prefectureIds) {
    const ids = loadBank(id).map((q) => q.id);
    assert.deepEqual(
      ids,
      Array.from({ length: ids.length }, (_, i) => i + 1),
      `${id}: ids are not 1..${ids.length}`,
    );
  }
});

test('no bank repeats a word', () => {
  for (const id of prefectureIds) {
    const words = loadBank(id).map((q) => q.word);
    const duplicates = words.filter((w, i) => words.indexOf(w) !== i);
    assert.deepEqual([...new Set(duplicates)], [], `${id}: duplicate words`);
  }
});

test('every bank has at least four distinct meanings so a quiz can be built', () => {
  // buildQuiz needs three distractors with meanings different from the answer.
  for (const id of prefectureIds) {
    const meanings = new Set(loadBank(id).map((q) => q.meaning_ja));
    assert.ok(meanings.size >= 4, `${id}: only ${meanings.size} distinct meanings`);
  }
});

test('osaka is present — it is the released app', () => {
  assert.ok(prefectureIds.includes('osaka'));
});

test('every bank keeps one question per line', () => {
  // Content edits are usually scripted, and a script that re-serialises with
  // JSON.stringify(..., 2) explodes each row across four lines and rewrites the
  // whole file — which buries a five-word change in an 800-line diff. Pinning
  // the layout keeps future diffs readable.
  for (const id of prefectureIds) {
    const raw = fs.readFileSync(path.join(prefecturesDir, id, 'questions.json'), 'utf8');
    const lines = raw.replace(/\r\n/g, '\n').trimEnd().split('\n');
    const count = JSON.parse(raw).length;
    assert.equal(lines.length, count + 2, `${id}: expected '[', ${count} rows, then ']'`);
    assert.equal(lines[0], '[');
    assert.equal(lines[lines.length - 1], ']');
  }
});
