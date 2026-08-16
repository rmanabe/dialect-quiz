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
const kagoshima = {
  id: 'kagoshima',
  nameJa: '鹿児島県',
  nameEn: 'Kagoshima',
  appNameJa: '鹿児島弁（薩摩弁）クイズ',
  appNameEn: 'Kagoshima-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.kagoshima',
  scheme: 'dialectquizkagoshima',
  easProjectId: '',
  theme: {
    primary: '#B5482A', // sakurajima volcanic ash red-brown
    secondary: '#E8A23D', // satsuma-imo sweet potato gold
    accent: '#2E5C4B', // satsuma-kiriko glass green
    background: '#FBF6EC',
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
    subtitle: 'この鹿児島弁、なんち言うかわかっど?',
    incorrect: 'そいはちごっど',
    perfectHeading: '全問正解じゃっど!わっぜすごか!',
    titleTiers: [
      { minScore: 10, title: '生粋の薩摩っぽ', description: '鹿児島弁をわっぜ極めた真の薩摩っぽじゃっど!' },
      { minScore: 8, title: '桜島名人', description: '桜島の噴煙にも動じん、あとちょっとじゃっど!' },
      { minScore: 6, title: '黒豚通', description: '黒豚の旨さも語れる、たいしたもんじゃっど' },
      { minScore: 4, title: '西郷どん見習い', description: 'ぼちぼち慣れてきたどん、まだまだじゃっど' },
      { minScore: 2, title: 'さつま揚げ初心者', description: 'きばいやんせ、いっしょに覚えもんそ' },
      { minScore: 0, title: 'ようこそ鹿児島へ!', description: 'まずは何回も挑戦してみやんせ' },
    ],
  },
};

module.exports = kagoshima;
