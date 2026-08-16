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
const toyama = {
  id: 'toyama',
  nameJa: '富山県',
  nameEn: 'Toyama',
  appNameJa: '富山弁クイズ',
  appNameEn: 'Toyama-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.toyama',
  scheme: 'dialectquiztoyama',
  easProjectId: '',
  theme: {
    primary: '#1B6CA8', // toyama bay / hotaru-ika blue
    secondary: '#FF6F3C', // kaki (persimmon) orange
    accent: '#4CAF50', // tateyama alpine green
    background: '#F5FAFF',
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
    subtitle: 'この富山弁、なんて意味かわかるちゃ?',
    incorrect: 'ちがうちゃ!',
    perfectHeading: '全問正解!きときとやざ!',
    titleTiers: [
      { minScore: 10, title: 'きときと富山人', description: '富山弁を極めた真の富山人ちゃ!' },
      { minScore: 8, title: 'ブラックラーメン級の濃さ', description: 'ほとんど完璧、あとちょっとちゃ!' },
      { minScore: 6, title: '立山連峰なみの貫禄', description: 'ようけ知っとるちゃ、たいしたもんちゃ' },
      { minScore: 4, title: 'ますずしはまだ半人前', description: 'ぼちぼち慣れてきたちゃ' },
      { minScore: 2, title: 'ホタルイカ初心者', description: 'これからちゃ、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ富山へ!', description: '何回も挑戦してみられ!' },
    ],
  },
};

module.exports = toyama;
