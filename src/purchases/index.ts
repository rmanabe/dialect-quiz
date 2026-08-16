import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';
import Purchases, { type CustomerInfo } from 'react-native-purchases';
import { getPrefectureConfig } from '../prefectures';

type PurchaseResult = { success: boolean; error?: 'cancelled' | 'no_offering' | 'not_configured' | string };
type RestoreResult = { success: boolean; restored: boolean };

let currentIsAdFree = false;
let configured = false;
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
  const apiKey = Platform.OS === 'ios' ? pref.revenueCat.apiKeyIos : pref.revenueCat.apiKeyAndroid;
  if (!apiKey) {
    console.warn('[purchases] No RevenueCat API key configured for this build; remove-ads purchase is disabled.');
    return;
  }
  Purchases.configure({ apiKey });
  configured = true;
  Purchases.addCustomerInfoUpdateListener(updateFromCustomerInfo);
  try {
    const info = await Purchases.getCustomerInfo();
    updateFromCustomerInfo(info);
  } catch (e) {
    console.warn('[purchases] failed to fetch initial customer info', e);
  }
}

export async function purchaseRemoveAds(): Promise<PurchaseResult> {
  if (!configured) return { success: false, error: 'not_configured' };
  const pref = getPrefectureConfig();
  try {
    const offerings = await Purchases.getOfferings();
    const pkg =
      offerings.current?.availablePackages.find((p) => p.product.identifier === pref.revenueCat.productId) ??
      offerings.current?.availablePackages[0];
    if (!pkg) return { success: false, error: 'no_offering' };

    const { customerInfo } = await Purchases.purchasePackage(pkg);
    updateFromCustomerInfo(customerInfo);
    return { success: true };
  } catch (e: any) {
    if (e?.userCancelled) return { success: false, error: 'cancelled' };
    return { success: false, error: e?.message ?? 'unknown' };
  }
}

export async function restorePurchases(): Promise<RestoreResult> {
  if (!configured) return { success: false, restored: false };
  try {
    const info = await Purchases.restorePurchases();
    updateFromCustomerInfo(info);
    return { success: true, restored: currentIsAdFree };
  } catch {
    return { success: false, restored: false };
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
