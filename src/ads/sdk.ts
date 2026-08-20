// Loads the AdMob native module on demand instead of at import time.
//
// A top-level `import` is hoisted and evaluated before any of our code runs, so
// if the native side fails to register — a version downgrade that removed a
// constant, a module that did not get autolinked — the app dies at startup with
// no JS error to catch and no screen to show. That is a crash on launch, which
// is an instant store rejection. Ads are not the product; they must not be able
// to take the app with them.
//
// Wrapped in try/catch and cached, so a failure disables ads only.

type AdsSdk = typeof import('react-native-google-mobile-ads');

// undefined = not attempted yet, null = attempted and unavailable.
let cached: AdsSdk | null | undefined;

export function getAdsSdk(): AdsSdk | null {
  if (cached !== undefined) return cached;
  try {
    cached = require('react-native-google-mobile-ads') as AdsSdk;
  } catch (e) {
    console.warn('[ads] native module unavailable; ads are disabled', e);
    cached = null;
  }
  return cached;
}

/** True when banners can actually be rendered. */
export function isAdsAvailable(): boolean {
  return getAdsSdk() !== null;
}
