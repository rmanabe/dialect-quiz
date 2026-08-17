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
const kumamoto = {
  id: 'kumamoto',
  nameJa: '熊本県',
  nameEn: 'Kumamoto',
  appNameJa: '熊本弁クイズ',
  appNameEn: 'Kumamoto-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.kumamoto',
  scheme: 'dialectquizkumamoto',
  easProjectId: '6900533d-3663-48e3-8b65-24d50a461b43',
  theme: {
    primary: '#2E7D46', // kumamon-inspired forest green
    secondary: '#C9302C', // aso volcanic red
    accent: '#3A3A3A', // kumamon black
    background: '#FBF8F0',
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
    subtitle: 'この熊本弁、なんばしよっとか意味わかる?',
    incorrect: 'ちがうたい',
    perfectHeading: '全問正解たい!むしゃんよかばい!',
    titleTiers: [
      { minScore: 10, title: '生粋の肥後もっこす', description: '熊本弁ば極めた真の肥後もっこすたい!' },
      { minScore: 8, title: '阿蘇山名人', description: '阿蘇山ば知り尽くしとる、あとちょっとたい!' },
      { minScore: 6, title: '馬刺し通', description: '馬刺しの美味さも語れる、たいしたもんばい' },
      { minScore: 4, title: 'からし蓮根見習い', description: 'ぼちぼち慣れてきたごたるね' },
      { minScore: 2, title: 'くまモン初心者', description: 'これからたい、いっしょにきばろう' },
      { minScore: 0, title: 'ようこそ熊本へ!', description: 'まずは何回も挑戦してみんしゃい' },
    ],
  },
};

module.exports = kumamoto;
