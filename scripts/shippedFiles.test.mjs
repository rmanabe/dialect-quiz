import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// A .gitignore pattern broad enough to be convenient is broad enough to swallow
// a file nobody thought about. The failure is quiet in the worst way: the file
// is on this machine, so every test passes and the app runs — and the build
// that matters, from a clean checkout, ships without it.
//
// Note on `git check-ignore`: it reports nothing for a file that is already
// tracked, because tracked files are never ignored. Asserting "not ignored"
// over committed files therefore passes no matter what .gitignore says — this
// file did exactly that at first, and adding the swallowing pattern on purpose
// changed nothing. Trackedness is the property that actually matters, so that
// is what is asserted; check-ignore is only used where it can still speak, on
// paths that are not in the index.

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });

/** Non-zero exit from check-ignore means git is not ignoring the path. */
function isIgnored(relative) {
  try {
    execFileSync('git', ['check-ignore', '-q', relative], { cwd: root });
    return true;
  } catch {
    return false;
  }
}

const prefectures = readdirSync(path.join(root, 'src', 'prefectures'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const tracked = new Set(git(['ls-files', 'src/prefectures']).trim().split('\n'));

test('every prefecture is on disk', () => {
  // Guards the loops below from passing by iterating over nothing.
  assert.equal(prefectures.length, 47, `expected 47 prefectures, found ${prefectures.length}`);
});

test('every question bank is committed, so a clean checkout has all 47', () => {
  const missing = prefectures
    .map((id) => `src/prefectures/${id}/questions.json`)
    .filter((file) => !tracked.has(file));
  assert.deepEqual(missing, [], `on disk but not in git: ${missing}`);
});

test('every prefecture config is committed', () => {
  const missing = prefectures
    .map((id) => `src/prefectures/${id}/config.js`)
    .filter((file) => !tracked.has(file));
  assert.deepEqual(missing, [], `on disk but not in git: ${missing}`);
});

test('nothing under src/prefectures is invisible to git', () => {
  // The forward-looking half: a file that is neither tracked nor ignorable-by
  // accident shows up as untracked, but one swallowed by a pattern shows up
  // nowhere at all. Ask git directly which paths it is hiding.
  const hidden = git(['status', '--porcelain', '--ignored=matching', '--', 'src/prefectures'])
    .split('\n')
    .filter((line) => line.startsWith('!!'))
    .map((line) => line.slice(3));
  assert.deepEqual(hidden, [], `ignored by .gitignore and therefore never shipped: ${hidden}`);
});

test('signing material stays ignored', () => {
  // The other direction of the same rule, and here check-ignore does work:
  // none of these are tracked, so its answer is meaningful.
  for (const file of ['AuthKey_TEST.p8', 'release.jks', 'private.key']) {
    assert.ok(isIgnored(file), `${file} is not ignored — check .gitignore`);
  }
});
