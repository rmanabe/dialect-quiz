// RevenueCat's native SDK has no web target. The web build never sells the
// remove-ads purchase and never shows ads either (see AdBanner.web.tsx), so
// this is intentionally a no-op stub. It must still export the same surface as
// index.ts or the web bundle breaks at import time.

// Re-exported from the shared logic module so the two entry points can never
// drift apart on what a failure code is allowed to be.
export type { PurchaseErrorCode } from './logic';

type PurchaseErrorCode = import('./logic').PurchaseErrorCode;

export async function initPurchases(): Promise<void> {}

export function isPurchaseAvailable(): boolean {
  return false;
}

export function getInitFailure(): string | null {
  return 'web_unavailable';
}

export async function purchaseRemoveAds(): Promise<{
  success: boolean;
  error?: PurchaseErrorCode;
  detail?: string;
}> {
  return { success: false, error: 'not_configured', detail: 'web_unavailable' };
}

export async function restorePurchases(): Promise<{
  success: boolean;
  restored: boolean;
  detail?: string;
}> {
  return { success: false, restored: false, detail: 'web_unavailable' };
}

export function useAdFree(): boolean {
  return false;
}

export function usePurchaseAvailable(): boolean {
  return false;
}
