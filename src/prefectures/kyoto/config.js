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
const kyoto = {
  id: 'kyoto',
  nameJa: '京都府',
  nameEn: 'Kyoto',
  appNameJa: '京都弁クイズ',
  appNameEn: 'Kyoto-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.kyoto',
  scheme: 'dialectquizkyoto',
  easProjectId: '',
  theme: {
    primary: '#B7282E', // Kiyomizu-dera vermillion torii red
    secondary: '#D4A017', // Kinkaku-ji gold leaf
    accent: '#4A7A5C', // matcha green
    background: '#FBF3E7', // washi paper cream
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
    subtitle: 'この京ことば、なんどすやろ?',
    incorrect: 'ちゃいますえ',
    perfectHeading: '全問正解どす!おおきに!',
    titleTiers: [
      { minScore: 10, title: '生粋の京都はん', description: '京ことばを極めた、ほんまもんの京都人どす' },
      { minScore: 8, title: '祇園の常連はん', description: '舞妓はんかて驚くえ、ぎょうさん覚えはった' },
      { minScore: 6, title: '清水の舞台級', description: 'あとちょっとで飛び降りられそうどすなあ' },
      { minScore: 4, title: '花見小路の駆け出し', description: 'ぼちぼち慣れてきはりましたな' },
      { minScore: 2, title: '舞妓はん見習い', description: 'これからどす、いっしょに覚えとくれやす' },
      { minScore: 0, title: 'おこしやす京都へ!', description: 'まずは何度でも挑戦しとくれやす' },
    ],
  },
};

module.exports = kyoto;
