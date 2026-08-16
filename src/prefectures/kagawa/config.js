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
const kagawa = {
  id: 'kagawa',
  nameJa: '香川県',
  nameEn: 'Kagawa',
  appNameJa: '香川弁（讃岐弁）クイズ',
  appNameEn: 'Kagawa-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.kagawa',
  scheme: 'dialectquizkagawa',
  easProjectId: '',
  theme: {
    primary: '#EADFC4', // うどんの生成り
    secondary: '#6B8E4E', // 小豆島オリーブの緑
    accent: '#3B7FB5', // 瀬戸内海の青
    background: '#FFFDF7',
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
    subtitle: 'この香川弁、なんて意味なんかいな?',
    incorrect: 'ちがうがな!',
    perfectHeading: '全問正解けん!べっちょない、たいしたもんじゃ!',
    titleTiers: [
      { minScore: 10, title: '生粋の讃岐人', description: '香川弁を極めた本物の讃岐もんじゃけん!' },
      { minScore: 8, title: 'うどん通', description: 'ほとんど完璧、たいしたもんじゃ!' },
      { minScore: 6, title: '麺のコシ通', description: 'ようけ知っとるなあ、大したもんじゃ' },
      { minScore: 4, title: 'うどん巡り中', description: 'ぼちぼち慣れてきたけんど' },
      { minScore: 2, title: 'うどん初心者', description: 'これからじゃけん、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ香川へ!', description: 'まずは何回も挑戦してみいや' },
    ],
  },
};

module.exports = kagawa;
