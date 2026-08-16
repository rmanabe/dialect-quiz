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
const gifu = {
  id: 'gifu',
  nameJa: '岐阜県',
  nameEn: 'Gifu',
  appNameJa: '岐阜弁クイズ',
  appNameEn: 'Gifu-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.gifu',
  scheme: 'dialectquizgifu',
  easProjectId: '',
  theme: {
    primary: '#2A5D8A', // nagara river blue
    secondary: '#E8B84B', // gifu chochin lantern gold
    accent: '#7A8B4E',
    background: '#F8F6EF',
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
    subtitle: 'この岐阜弁、わかるなも?',
    incorrect: 'だちかんて!',
    perfectHeading: '全問正解!あんばようできたなも!',
    titleTiers: [
      { minScore: 10, title: '生粋の岐阜人', description: '岐阜弁を極めた真の岐阜人だがや!' },
      { minScore: 8, title: '鵜飼師匠級', description: 'ほとんど完璧、あとちょっとやて!' },
      { minScore: 6, title: '白川郷なみの趣', description: 'ようけ知っとるなも、たいしたもんや' },
      { minScore: 4, title: '五平餅見習い', description: 'ぼちぼち慣れてきたでら' },
      { minScore: 2, title: '鮎初心者', description: 'これからやて、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ岐阜へ!', description: 'まずは何べんも挑戦してみりん!' },
    ],
  },
};

module.exports = gifu;
