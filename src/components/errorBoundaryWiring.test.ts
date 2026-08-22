import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// An ErrorBoundary that is no longer wired in changes nothing about how the app
// looks or behaves — until the day something throws, and then the app is white.
// Nothing else in this suite would notice, so this file watches the wiring.
//
// It reads source rather than rendering: node's type stripping cannot load .tsx
// at all (ERR_UNKNOWN_FILE_EXTENSION), and react-native ships untranspiled, so
// there is no way to mount a component here without adding a bundler to the
// test path. A structural check is weaker than a render test — it proves the
// element is in the tree, not that the fallback screen looks right — so pair it
// with the manual "throw on purpose and look" check whenever the screen itself
// changes.

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (relative: string) => readFileSync(path.join(here, '..', '..', relative), 'utf8');

const layout = read('app/_layout.tsx');
const boundary = read('src/components/ErrorBoundary.tsx');

test('the root layout imports the ErrorBoundary', () => {
  assert.match(layout, /import\s+ErrorBoundary\s+from\s+'[^']*components\/ErrorBoundary'/);
});

test('the root layout wraps the navigation tree in the ErrorBoundary', () => {
  // Not just "the name appears somewhere": the opening tag has to come before
  // the navigator and the closing tag after it, or it is wrapping nothing.
  const open = layout.indexOf('<ErrorBoundary>');
  const stack = layout.indexOf('<Stack');
  const close = layout.indexOf('</ErrorBoundary>');
  assert.ok(open !== -1, 'no <ErrorBoundary> element in app/_layout.tsx');
  assert.ok(stack !== -1, 'no <Stack> navigator in app/_layout.tsx');
  assert.ok(open < stack && stack < close, '<Stack> is not inside <ErrorBoundary>');
});

test('the status bar is set outside the boundary, so the crash screen keeps it', () => {
  // Inside, it belongs to the subtree the boundary replaces: the crash screen
  // then renders with light status bar content over a cream background and the
  // clock is unreadable. Verified on a device by throwing on purpose.
  const statusBar = layout.indexOf('<StatusBar');
  const boundary = layout.indexOf('<ErrorBoundary>');
  assert.ok(statusBar !== -1, 'no <StatusBar> in app/_layout.tsx');
  assert.ok(statusBar < boundary, '<StatusBar> is inside <ErrorBoundary>');
});

test('the boundary still catches render errors', () => {
  // Without this static React never switches the component into its fallback.
  assert.match(boundary, /static\s+getDerivedStateFromError/);
});

test('the boundary renders its children when nothing has failed', () => {
  assert.match(boundary, /return\s+this\.props\.children/);
});

test('the boundary offers a way back', () => {
  // The retry has to clear the error, otherwise the screen is a dead end and
  // the only way out is force-quitting the app.
  assert.match(boundary, /setState\(\{\s*error:\s*null\s*\}\)/);
  assert.match(boundary, /onPress=\{this\.handleRetry\}/);
});

test('the boundary depends on nothing that could fail to load', () => {
  // Its imports are the UI framework and the theme helper, and the theme helper
  // is itself guarded (see errorScreenTheme). Anything heavier — analytics, a
  // native SDK, a store client — could be the very thing that crashed.
  const imports = [...boundary.matchAll(/^import[^;]*from\s+'([^']+)'/gm)].map((m) => m[1]);
  const allowed = new Set(['react', 'react-native', '../prefectures', './errorScreenTheme']);
  const unexpected = imports.filter((source) => !allowed.has(source));
  assert.deepEqual(unexpected, [], `unexpected imports in ErrorBoundary: ${unexpected.join(', ')}`);
});
