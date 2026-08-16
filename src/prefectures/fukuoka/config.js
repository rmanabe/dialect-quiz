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
const fukuoka = {
  id: 'fukuoka',
  nameJa: '福岡県',
  nameEn: 'Fukuoka',
  appNameJa: '福岡弁（博多弁）クイズ',
  appNameEn: 'Fukuoka-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.fukuoka',
  scheme: 'dialectquizfukuoka',
  easProjectId: '9a46fefc-3411-4acc-9fd4-af69b7ec4f24',
  theme: {
    primary: '#D6412F', // mentaiko red
    secondary: '#F2B705', // hakata dontaku gold
    accent: '#274C77', // hakata-ori obi blue
    background: '#FFF6EC',
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
    subtitle: 'この博多弁、なんて言いよっとかわかる?',
    incorrect: 'そいはちがうばい',
    perfectHeading: '全問正解たい!でかしたばい!',
    titleTiers: [
      { minScore: 10, title: '生粋の博多っ子', description: '博多弁ば極めた真の博多っ子たい!' },
      { minScore: 8, title: '山笠かき手', description: '博多祇園山笠ば担げるくらい一人前たい!' },
      { minScore: 6, title: '屋台の達人', description: '屋台のうまかもんに詳しかね、たいしたもんたい' },
      { minScore: 4, title: 'どんたく見習い', description: 'どんたく祭りで踊れるごつ、ぼちぼち慣れてきたね' },
      { minScore: 2, title: 'とんこつ初心者', description: 'これからたい、いっしょに覚えていこう' },
      { minScore: 0, title: 'ようこそ博多へ!', description: 'まずは何回も挑戦してみんしゃい' },
    ],
  },
};

module.exports = fukuoka;
