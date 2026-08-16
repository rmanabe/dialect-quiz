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
const hiroshima = {
  id: 'hiroshima',
  nameJa: '広島県',
  nameEn: 'Hiroshima',
  appNameJa: '広島弁クイズ',
  appNameEn: 'Hiroshima-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.hiroshima',
  scheme: 'dialectquizhiroshima',
  easProjectId: '1346ba07-2dfd-4a7b-a574-b2a6b11bdd7b',
  theme: {
    primary: '#C0392B', // もみじ饅頭の紅葉
    secondary: '#5D8AA8', // 牡蠣いかだの海
    accent: '#E67E22', // 厳島鳥居の朱橙
    background: '#FFF8F2',
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
    subtitle: 'この広島弁、なんて意味かのう?',
    incorrect: 'ちがうっちゃ!',
    perfectHeading: '全問正解じゃけえ!ぶちすごいで!',
    titleTiers: [
      { minScore: 10, title: '生粋の広島人', description: '広島弁をぶち極めた本物の広島人じゃけえ!' },
      { minScore: 8, title: 'ぶち広島通', description: 'ほとんど完璧、ぶちすごいのう!' },
      { minScore: 6, title: 'もみじ饅頭一人前', description: 'ようけ知っとるのう、たいしたもんじゃ' },
      { minScore: 4, title: 'もみじ饅頭半人前', description: 'ぼちぼち慣れてきたっちゃ' },
      { minScore: 2, title: 'もみじ饅頭初心者', description: 'これからじゃけえ、いっしょに覚えようや' },
      { minScore: 0, title: 'ようこそ広島へ!', description: 'まずは何回も挑戦してみんさい' },
    ],
  },
};

module.exports = hiroshima;
