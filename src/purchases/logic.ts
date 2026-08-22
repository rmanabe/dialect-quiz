// Pure decision logic for the remove-ads purchase, deliberately kept free of
// react-native / react-native-purchases imports so it can be unit-tested.
//
// Every rule in here exists because its absence shipped a broken build:
// 1.0 (build 3) went to Apple with an empty RevenueCat API key, so the SDK was
// never configured, purchaseRemoveAds() could not start a purchase, and the
// screen threw the failure away — the button simply did nothing. App Review
// rejected it under Guideline 2.1(b). Encoding these decisions as functions
// means a regression fails a test instead of a submission.

export type PurchaseErrorCode = 'cancelled' | 'not_configured' | 'no_offering' | 'unknown';

/** What the screen should do once a purchase attempt has finished. */
export type PurchaseFeedback =
  | { kind: 'success' }
  | { kind: 'silent' } // the user cancelled on purpose; saying anything is noise
  | { kind: 'unavailable' } // the store could not offer the product at all
  | { kind: 'error' };

export interface PurchaseOutcome {
  success: boolean;
  error?: PurchaseErrorCode;
}

interface RevenueCatKeys {
  apiKeyIos: string;
  apiKeyAndroid: string;
}

/**
 * Picks the platform's RevenueCat key. Returns null when the key is missing or
 * blank — a whitespace-only value is just as unusable as an empty one, and an
 * env var that was set to "" is exactly how build 3 shipped.
 */
export function selectApiKey(platformOS: string, keys: RevenueCatKeys): string | null {
  const raw = platformOS === 'ios' ? keys.apiKeyIos : keys.apiKeyAndroid;
  const trimmed = (raw ?? '').trim();
  return trimmed.length > 0 ? trimmed : null;
}

interface PackageLike {
  product: { identifier: string };
}

/**
 * Chooses which package to buy. Prefers an exact product-id match so a stray
 * test product in the Offering can never be sold by accident; only falls back
 * to the sole remaining package when there is exactly one, which is the case
 * this app actually ships.
 */
export function pickPackage<T extends PackageLike>(
  packages: readonly T[] | undefined,
  productId: string,
): T | null {
  if (!packages || packages.length === 0) return null;
  const exact = packages.find((p) => p.product.identifier === productId);
  if (exact) return exact;
  return packages.length === 1 ? packages[0] : null;
}

/** Same rule as pickPackage, applied to raw store products. */
export function pickProduct<T extends { identifier: string }>(
  products: readonly T[] | undefined,
  productId: string,
): T | null {
  if (!products || products.length === 0) return null;
  const exact = products.find((p) => p.identifier === productId);
  if (exact) return exact;
  return products.length === 1 ? products[0] : null;
}

/** A user-cancelled purchase is not a failure worth reporting. */
export function classifyPurchaseError(e: unknown): PurchaseErrorCode {
  const err = e as { userCancelled?: unknown } | null | undefined;
  return err?.userCancelled ? 'cancelled' : 'unknown';
}

/**
 * Maps a purchase result to what the user should see. The only outcome that
 * stays silent is a deliberate cancel; everything else must say something,
 * because a button that reports nothing is indistinguishable from a dead one.
 */
export function describePurchaseOutcome(outcome: PurchaseOutcome): PurchaseFeedback {
  if (outcome.success) return { kind: 'success' };
  if (outcome.error === 'cancelled') return { kind: 'silent' };
  if (outcome.error === 'not_configured' || outcome.error === 'no_offering') {
    return { kind: 'unavailable' };
  }
  return { kind: 'error' };
}

/** What a restore attempt should tell the user. */
export type RestoreFeedback =
  | { kind: 'restored' }
  | { kind: 'nothing-to-restore' }
  | { kind: 'failed' };

/**
 * Maps a restore result to what the user should see.
 *
 * Restore has its own wording for a reason: a failed restore used to reuse the
 * purchase strings, so tapping 購入を復元 with no connection answered "your
 * purchase could not be started" — about an action the user did not take.
 * Restoring is also the one control App Review is guaranteed to press on a
 * non-consumable (Guideline 3.1.2), so what it says has to make sense.
 */
export function describeRestoreOutcome(outcome: {
  success: boolean;
  restored: boolean;
}): RestoreFeedback {
  if (!outcome.success) return { kind: 'failed' };
  return outcome.restored ? { kind: 'restored' } : { kind: 'nothing-to-restore' };
}

/**
 * Whether to render the buy / restore controls. Web has no store, an
 * unconfigured SDK cannot transact, and someone who already paid should not be
 * asked to pay again.
 */
export function shouldShowPurchaseControls(args: {
  platformOS: string;
  purchaseAvailable: boolean;
  adFree: boolean;
}): boolean {
  return args.platformOS !== 'web' && args.purchaseAvailable && !args.adFree;
}

/**
 * Only show a localized price when the store returned it in the currency the
 * device actually bills in. A mismatch means RevenueCat fell back to the base
 * currency (this happens while the IAP is still unapproved), and showing e.g.
 * "$1.99" to a user who will be charged ¥250 is worse than showing nothing.
 */
export function shouldShowPrice(
  productCurrency: string | null | undefined,
  deviceCurrency: string | null | undefined,
): boolean {
  if (!productCurrency || !deviceCurrency) return false;
  return productCurrency.toUpperCase() === deviceCurrency.toUpperCase();
}
