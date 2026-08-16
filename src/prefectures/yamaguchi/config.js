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
const yamaguchi = {
  id: 'yamaguchi',
  nameJa: '山口県',
  nameEn: 'Yamaguchi',
  appNameJa: '山口弁クイズ',
  appNameEn: 'Yamaguchi-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.yamaguchi',
  scheme: 'dialectquizyamaguchi',
  easProjectId: '',
  theme: {
    primary: '#E74C3C', // ふぐ提灯の赤
    secondary: '#2C3E50', // 関門海峡の紺
    accent: '#ECF0F1', // ふぐ刺しの白
    background: '#FFF9F5',
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
    subtitle: 'この山口弁、なんて意味っちゃ?',
    incorrect: 'ちがうんじゃけぇ!',
    perfectHeading: '全問正解っちゃ!ぶちすごいのう!',
    titleTiers: [
      { minScore: 10, title: '生粋の山口人', description: '山口弁をぶち極めた本物の山口人っちゃ!' },
      { minScore: 8, title: 'とらふぐ級', description: 'ほとんど完璧、ぶちすごいっちゃ!' },
      { minScore: 6, title: 'ふぐ刺し級', description: 'ようけ知っとるのう、たいしたもんじゃ' },
      { minScore: 4, title: 'ふぐの子', description: 'ぼちぼち慣れてきたのう' },
      { minScore: 2, title: 'ふぐ提灯初心者', description: 'これからじゃけぇ、いっしょに覚えようや' },
      { minScore: 0, title: 'ようこそ山口へ!', description: 'まずは何回も挑戦してみんさい' },
    ],
  },
};

module.exports = yamaguchi;
