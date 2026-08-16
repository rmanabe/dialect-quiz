import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

export async function initAds(): Promise<void> {
  await mobileAds().setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.G,
    tagForChildDirectedTreatment: true,
    tagForUnderAgeOfConsent: true,
  });
  await mobileAds().initialize();
}
