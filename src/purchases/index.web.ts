// RevenueCat's native SDK has no web target. The web build never sells the
// remove-ads purchase and never shows ads either (see AdBanner.web.tsx), so
// this is intentionally a no-op stub.

export async function initPurchases(): Promise<void> {}

export async function purchaseRemoveAds(): Promise<{ success: boolean; error?: string }> {
  return { success: false, error: 'web_unavailable' };
}

export async function restorePurchases(): Promise<{ success: boolean; restored: boolean }> {
  return { success: false, restored: false };
}

export function useAdFree(): boolean {
  return false;
}
