// The crash screen is the last thing standing between a render error and a
// blank app, so nothing it needs may be able to fail. Reading the prefecture
// theme is a plain object lookup today, but this screen only ever runs when
// something has already gone wrong — so the read is guarded and the colours
// have a hardcoded floor.

export interface ScreenTheme {
  background: string;
  primary: string;
}

/** Osaka's colours, inlined so a broken config still yields a readable screen. */
export const FALLBACK_THEME: ScreenTheme = { background: '#FFF8ED', primary: '#E8572B' };

/**
 * Colours for the crash screen. The caller passes the reader rather than this
 * module importing the prefecture registry: keeping it dependency-free is both
 * the point (nothing here can fail to load) and what lets it be tested without
 * a bundler, since the registry is resolved the way Metro does it, not Node.
 */
export function errorScreenTheme(readTheme: () => unknown): ScreenTheme {
  try {
    const theme = readTheme() as { background?: unknown; primary?: unknown } | null;
    // A config that exists but lost its colours would otherwise paint the text
    // with `undefined`, which renders as unstyled — legible on some platforms,
    // invisible on others. An empty string is the same problem wearing a
    // string's type, so require an actual value rather than just the type.
    const colour = (value: unknown, fallback: string) =>
      typeof value === 'string' && value.trim() !== '' ? value : fallback;
    return {
      background: colour(theme?.background, FALLBACK_THEME.background),
      primary: colour(theme?.primary, FALLBACK_THEME.primary),
    };
  } catch {
    return { ...FALLBACK_THEME };
  }
}
