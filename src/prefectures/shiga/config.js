// Plain CommonJS on purpose: this file is `require()`d directly by app.config.ts
// under Node (not bundled by Metro), and Expo's config loader does not transpile
// nested TS imports. See src/prefectures/types.ts for the shape (PrefectureConfig).

// Google's shared public test ad unit IDs. Safe to ship as the default —
// replace with real IDs via EAS env vars for the production build profile only.
// https://developers.google.com/admob/android/test-ads
const TEST_ADMOB = {
  androidAppId: 'ca-app-pub-3940256099942544~3347511713',
  iosAppId: 'ca-app-pub-3940256099942544~1458002511',
  androidBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
};

/** @type {import('../types').PrefectureConfig} */
const shiga = {
  id: 'shiga',
  nameJa: '滋賀県',
  nameEn: 'Shiga',
  appNameJa: '滋賀弁（近江弁）クイズ',
  appNameEn: 'Shiga-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.shiga',
  scheme: 'dialectquizshiga',
  easProjectId: '',
  theme: {
    primary: '#1F6F9C', // Lake Biwa blue
    secondary: '#7FB8A4', // Omi rice-paddy green
    accent: '#E0A63E', // canola-flower yellow
    background: '#EFF7F8',
  },
  admob: {
    androidAppId: process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID || TEST_ADMOB.androidAppId,
    iosAppId: process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID || TEST_ADMOB.iosAppId,
    androidBannerUnitId: process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID || TEST_ADMOB.androidBannerUnitId,
    iosBannerUnitId: process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_ID || TEST_ADMOB.iosBannerUnitId,
  },
  revenueCat: {
    apiKeyIos: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY || '',
    apiKeyAndroid: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY || '',
    entitlementId: 'remove_ads',
    productId: 'remove_ads_lifetime',
  },
  copy: {
    subtitle: 'この近江弁、うみのごとふかいで、わかるか?',
    incorrect: 'ちゃうがな、ほっこりするわ',
    perfectHeading: '全問正解や!琵琶湖みたいにでっかい拍手や!',
    titleTiers: [
      { minScore: 10, title: '生粋の近江人', description: '近江弁を極めた、ほんまもんの近江人やで' },
      { minScore: 8, title: '近江牛級', description: '近江牛みたいに、きめ細やかに覚えたなあ' },
      { minScore: 6, title: '甲賀忍者レベル', description: '甲賀忍者も顔負けの覚えの早さやで' },
      { minScore: 4, title: '彦根城の初心者', description: 'ぼちぼちやけど、かなんことはないで' },
      { minScore: 2, title: '琵琶湖初心者', description: 'まだかなんこともあるけど、これからやで' },
      { minScore: 0, title: 'ようこそ近江へ!', description: '何度でも挑戦してみておくれ' },
    ],
  },
};

module.exports = shiga;
