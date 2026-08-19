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
const saga = {
  id: 'saga',
  nameJa: '佐賀県',
  nameEn: 'Saga',
  appNameJa: '佐賀弁クイズ',
  appNameEn: 'Saga-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.saga',
  scheme: 'dialectquizsaga',
  easProjectId: '0019b2f0-212f-45da-beac-6ed270cb7ba8',
  theme: {
    primary: '#3E6B4F', // arita porcelain celadon green
    secondary: '#C94C4C', // saga nishiki red
    accent: '#2D4059', // ariake sea mudflat blue-grey
    background: '#FAF6EE',
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
    subtitle: 'この佐賀弁、なんて言うとっとかわかる?',
    incorrect: 'がばい違うばい',
    perfectHeading: '全問正解たい!がばいすごかよ!',
    titleTiers: [
      { minScore: 10, title: 'がばい佐賀んもん', description: '佐賀弁ば極めた、がばいすごか佐賀んもんたい!' },
      { minScore: 8, title: 'バルーン名人', description: 'バルーンフェスタも真っ青、がばい上手かばい!' },
      { minScore: 6, title: '唐津くんち通', description: '唐津くんちにも詳しか、たいしたもんたい' },
      { minScore: 4, title: '有田焼見習い', description: 'ぼちぼち慣れてきたばい' },
      { minScore: 2, title: 'がばい初心者', description: 'これからたい、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ佐賀へ!', description: 'まずは何回も挑戦してみんしゃい' },
    ],
  },
};

module.exports = saga;
