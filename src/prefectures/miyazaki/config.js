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
const miyazaki = {
  id: 'miyazaki',
  nameJa: '宮崎県',
  nameEn: 'Miyazaki',
  appNameJa: '宮崎弁クイズ',
  appNameEn: 'Miyazaki-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.miyazaki',
  scheme: 'dialectquizmiyazaki',
  easProjectId: '',
  theme: {
    primary: '#E8823C', // hyuga-natsu citrus orange
    secondary: '#3E8E7E', // aoshima subtropical teal
    accent: '#C94B4B', // mangoes / phoenix flame red
    background: '#FFF9EF',
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
    subtitle: 'この宮崎弁、なんしよっとか意味わかる?',
    incorrect: 'ちがうちゃが',
    perfectHeading: '全問正解ちゃが!てげすごか!',
    titleTiers: [
      { minScore: 10, title: '生粋の日向んし', description: '宮崎弁をてげ極めた真の日向んしちゃが!' },
      { minScore: 8, title: '高千穂神楽通', description: '高千穂の神楽も踊れるくらい、あとちょっとちゃが!' },
      { minScore: 6, title: 'チキン南蛮通', description: 'チキン南蛮の美味さも語れる、たいしたもんちゃが' },
      { minScore: 4, title: '宮崎牛見習い', description: 'ぼちぼち慣れてきたっちゃが' },
      { minScore: 2, title: 'マンゴー初心者', description: 'よだきがらんで、いっしょに覚えよわ' },
      { minScore: 0, title: 'ようこそ宮崎へ!', description: 'まずは何回も挑戦してみやい' },
    ],
  },
};

module.exports = miyazaki;
