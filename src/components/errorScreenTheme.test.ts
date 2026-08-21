import { test } from 'node:test';
import assert from 'node:assert/strict';

import { errorScreenTheme, FALLBACK_THEME } from './errorScreenTheme.ts';

test('a healthy theme is used as-is', () => {
  const theme = errorScreenTheme(() => ({ background: '#001122', primary: '#334455' }) as never);
  assert.deepEqual(theme, { background: '#001122', primary: '#334455' });
});

test('a throwing theme lookup falls back instead of crashing the crash screen', () => {
  // The whole point of the boundary is that it works when other things do not.
  const theme = errorScreenTheme(() => {
    throw new Error('registry unavailable');
  });
  assert.deepEqual(theme, FALLBACK_THEME);
});

test('a config that lost its colours falls back per colour', () => {
  const theme = errorScreenTheme(() => ({ background: '#001122' }) as never);
  assert.equal(theme.background, '#001122');
  assert.equal(theme.primary, FALLBACK_THEME.primary);
});

test('an empty colour string is not treated as a colour', () => {
  // '' is a string and truthy checks on it silently pass, which would paint the
  // retry button with nothing.
  const theme = errorScreenTheme(() => ({ background: '', primary: '' }) as never);
  assert.deepEqual(theme, FALLBACK_THEME);
});

test('a null theme falls back rather than throwing on property access', () => {
  assert.deepEqual(
    errorScreenTheme(() => null as never),
    FALLBACK_THEME,
  );
});

test('the fallback is copied, so a caller cannot mutate it for everyone', () => {
  const theme = errorScreenTheme(() => {
    throw new Error('boom');
  });
  theme.primary = '#000000';
  assert.equal(FALLBACK_THEME.primary, '#E8572B');
});
