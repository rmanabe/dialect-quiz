import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';
import Purchases, { type CustomerInfo, type PurchasesStoreProduct } from 'react-native-purchases';
import { getPrefectureConfig } from '../prefectures';
import { selectApiKey, pickPackage, pickProduct, classifyPurchaseError } from './logic';

// Every failure mode is surfaced to the caller as a distinct code so the UI can
// explain what happened. A silently-dead purchase button is an App Review
// rejection under Guideline 2.1(b) — that is exactly what happened to the
// 1.0 (build 3) submission, which shipped before the RevenueCat API keys were
// added to EAS and therefore never configured the SDK at all.
// The decision rules live in ./logic.ts, which is unit-tested; this file is only
// the SDK plumbing around them.
export type { PurchaseErrorCode } from './logic';

type PurchaseErrorCode = import('./logic').PurchaseErrorCode;

type PurchaseResult = { success: boolean; error?: PurchaseErrorCode; detail?: string };
type RestoreResult = { success: boolean; restored: boolean; detail?: string };

let currentIsAdFree = false;
let configured = false;
let initFailure: string | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function updateFromCustomerInfo(info: CustomerInfo) {
  const pref = getPrefectureConfig();
  currentIsAdFree = !!info.entitlements.active[pref.revenueCat.entitlementId];
  notify();
}

export async function initPurchases(): Promise<void> {
  const pref = getPrefectureConfig();
  const apiKey = selectApiKey(Platform.OS, pref.revenueCat);
  if (!apiKey) {
    initFailure = 'missing_api_key';
    console.warn('[purchases] No RevenueCat API key configured for this build; remove-ads purchase is disabled.');
    notify();
    return;
  }
  try {
    Purchases.configure({ apiKey });
    configured = true;
    initFailure = null;
  } catch (e: any) {
    initFailure = e?.message ?? 'configure_failed';
    console.warn('[purchases] Purchases.configure failed', e);
    notify();
    return;
  }
  notify();
  Purchases.addCustomerInfoUpdateListener(updateFromCustomerInfo);
  try {
    const info = await Purchases.getCustomerInfo();
    updateFromCustomerInfo(info);
  } catch (e) {
    console.warn('[purchases] failed to fetch initial customer info', e);
  }
}

/**
 * True once the SDK is configured. The UI hides the buy button when this is
 * false so the user is never offered a control that cannot work.
 */
export function isPurchaseAvailable(): boolean {
  return configured;
}

export function getInitFailure(): string | null {
  return initFailure;
}

export async function purchaseRemoveAds(): Promise<PurchaseResult> {
  if (!configured) {
    return { success: false, error: 'not_configured', detail: initFailure ?? undefined };
  }
  const pref = getPrefectureConfig();
  try {
    // Preferred path: the configured Offering. Fall back to fetching the
    // product straight from the store, so a missing/misconfigured Offering
    // cannot leave the user with a dead button.
    const offerings = await Purchases.getOfferings();
    const pkg = pickPackage(offerings.current?.availablePackages, pref.revenueCat.productId);

    if (pkg) {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      updateFromCustomerInfo(customerInfo);
      return { success: true };
    }

    const products: PurchasesStoreProduct[] = await Purchases.getProducts([pref.revenueCat.productId]);
    const product = pickProduct(products, pref.revenueCat.productId);
    if (!product) return { success: false, error: 'no_offering' };

    const { customerInfo } = await Purchases.purchaseStoreProduct(product);
    updateFromCustomerInfo(customerInfo);
    return { success: true };
  } catch (e: any) {
    return { success: false, error: classifyPurchaseError(e), detail: e?.message ?? String(e) };
  }
}

export async function restorePurchases(): Promise<RestoreResult> {
  if (!configured) {
    return { success: false, restored: false, detail: initFailure ?? 'not_configured' };
  }
  try {
    const info = await Purchases.restorePurchases();
    updateFromCustomerInfo(info);
    return { success: true, restored: currentIsAdFree };
  } catch (e: any) {
    return { success: false, restored: false, detail: e?.message ?? String(e) };
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): boolean {
  return currentIsAdFree;
}

export function useAdFree(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

function getAvailableSnapshot(): boolean {
  return configured;
}

/** Re-renders the caller when the SDK finishes configuring (or fails to). */
export function usePurchaseAvailable(): boolean {
  return useSyncExternalStore(subscribe, getAvailableSnapshot, () => false);
}
