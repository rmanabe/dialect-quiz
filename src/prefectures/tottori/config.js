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
const tottori = {
  id: 'tottori',
  nameJa: '鳥取県',
  nameEn: 'Tottori',
  appNameJa: '鳥取弁クイズ',
  appNameEn: 'Tottori-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.tottori',
  scheme: 'dialectquiztottori',
  easProjectId: '',
  theme: {
    primary: '#D9A566', // 鳥取砂丘の砂色
    secondary: '#4FA8D8', // 日本海の青
    accent: '#8BC34A', // 二十世紀梨の緑
    background: '#FFF9F0',
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
    subtitle: 'この鳥取弁、なんて意味かいや?',
    incorrect: 'ちがうけん!',
    perfectHeading: '全問正解だがな!がいにすごいわ!',
    titleTiers: [
      { minScore: 10, title: '生粋のトットリアン', description: '鳥取弁をがいに極めた本物の鳥取もんだけん!' },
      { minScore: 8, title: 'がいに鳥取通', description: 'ほとんど完璧、がいにすごいで!' },
      { minScore: 6, title: 'ちょんぼし鳥取通', description: 'ようけ知っとるなあ、たいしたもんだけん' },
      { minScore: 4, title: '鳥取弁のたまご', description: 'ぼちぼち慣れてきただらか' },
      { minScore: 2, title: '砂丘初心者', description: 'これからだけん、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ鳥取へ!', description: 'まずは何回も挑戦してみられぇ' },
    ],
  },
};

module.exports = tottori;
