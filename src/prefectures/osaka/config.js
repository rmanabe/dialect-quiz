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
const osaka = {
  id: 'osaka',
  nameJa: '大阪',
  nameEn: 'Osaka',
  appNameJa: '大阪弁クイズ',
  appNameEn: 'Osaka-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.osaka',
  scheme: 'dialectquizosaka',
  easProjectId: 'ccf6d775-0e33-4dcd-be21-73bf9e5c82d5',
  theme: {
    primary: '#E8572B', // takoyaki sauce orange-red
    secondary: '#FFC93C', // egg-yolk yellow
    accent: '#2E7D32', // aonori green
    background: '#FFF8ED',
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
    subtitle: 'この大阪弁、なんて言うてるかわかる?',
    incorrect: 'ちゃうで〜',
    perfectHeading: '全問正解や!おめでとう!',
    titleTiers: [
      { minScore: 10, title: '生粋のオオサカン', description: '大阪弁を極めた真の大阪人や!' },
      { minScore: 8, title: '大阪弁マスター', description: 'ほとんど完璧、あとちょっとやで!' },
      { minScore: 6, title: '大阪弁上級者', description: 'ようけ知っとるなあ、たいしたもんや' },
      { minScore: 4, title: '大阪弁見習い', description: 'ぼちぼち慣れてきたな' },
      { minScore: 2, title: 'たこ焼き初心者', description: 'これからやで、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ大阪へ!', description: 'まずは何べんも挑戦してみてな' },
    ],
  },
};

module.exports = osaka;
