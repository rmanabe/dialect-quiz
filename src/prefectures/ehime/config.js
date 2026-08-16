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
const ehime = {
  id: 'ehime',
  nameJa: '愛媛県',
  nameEn: 'Ehime',
  appNameJa: '愛媛弁（伊予弁）クイズ',
  appNameEn: 'Ehime-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.ehime',
  scheme: 'dialectquizehime',
  easProjectId: 'cde277e8-42e5-483f-8ab3-7a4967196310',
  theme: {
    primary: '#F4A536', // みかんのオレンジ
    secondary: '#2E7D5B', // 道後温泉の緑
    accent: '#C0392B', // 道後温泉本館の赤い塔
    background: '#FFF9EE',
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
    subtitle: 'この愛媛弁、なんて意味ぞなもし?',
    incorrect: 'ちがうぞな!',
    perfectHeading: '全問正解ぞなもし!たいしたもんぞな!',
    titleTiers: [
      { minScore: 10, title: '生粋の伊予人', description: '愛媛弁を極めた本物の伊予もんぞなもし!' },
      { minScore: 8, title: 'みかん農家級', description: 'ほとんど完璧、たいしたもんぞな!' },
      { minScore: 6, title: 'みかん狩り名人', description: 'ようけ知っとるらい、大したもんじゃ' },
      { minScore: 4, title: '青みかん級', description: 'ぼちぼち慣れてきたちゃ' },
      { minScore: 2, title: 'みかん初心者', description: 'これからじゃけん、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ愛媛へ!', description: 'まずは何回も挑戦してみんさいや' },
    ],
  },
};

module.exports = ehime;
