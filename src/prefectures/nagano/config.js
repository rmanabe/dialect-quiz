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
const nagano = {
  id: 'nagano',
  nameJa: '長野県',
  nameEn: 'Nagano',
  appNameJa: '長野弁（信州弁）クイズ',
  appNameEn: 'Nagano-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.nagano',
  scheme: 'dialectquiznagano',
  easProjectId: '',
  theme: {
    primary: '#2E6B3E', // shinshu forest green
    secondary: '#8FAADC', // northern alps sky blue
    accent: '#C0392B', // shinshu apple red
    background: '#F7FAF5',
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
    subtitle: 'この長野弁、わかるだに?',
    incorrect: 'ちがうだに!',
    perfectHeading: '全問正解!たいしたもんだに!',
    titleTiers: [
      { minScore: 10, title: 'ずくのある信州人', description: '長野弁を極めた真の信州人だに!' },
      { minScore: 8, title: '善光寺級のご利益', description: 'ほとんど完璧、あとちょっとずら!' },
      { minScore: 6, title: 'アルプスなみの高さ', description: 'よう知っとるだに、たいしたもんずら' },
      { minScore: 4, title: 'そば打ち見習い', description: 'ぼちぼち慣れてきただに' },
      { minScore: 2, title: 'おやき初心者', description: 'これからだに、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ長野へ!', description: 'まずは何回も挑戦してみないかや!' },
    ],
  },
};

module.exports = nagano;
