import { adRequestConfiguration } from './requestConfiguration';
import { getAdsSdk } from './sdk';

export async function initAds(): Promise<void> {
  const sdk = getAdsSdk();
  if (!sdk) return; // native module missing — the app runs without ads

  const mobileAds = sdk.default;
  await mobileAds().setRequestConfiguration(adRequestConfiguration(sdk.MaxAdContentRating));
  await mobileAds().initialize();
}
