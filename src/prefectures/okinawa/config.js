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
const okinawa = {
  id: 'okinawa',
  nameJa: '沖縄県',
  nameEn: 'Okinawa',
  appNameJa: '沖縄弁（うちなーぐち）クイズ',
  appNameEn: 'Okinawa-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.okinawa',
  scheme: 'dialectquizokinawa',
  easProjectId: '',
  theme: {
    primary: '#1E9E9E', // churaumi coral sea teal
    secondary: '#F2A93C', // shisa gold
    accent: '#E85C4A', // hibiscus red
    background: '#FBF9EE',
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
    subtitle: 'この沖縄の言葉、なんて意味かわかる?めんそーれ!',
    incorrect: 'ありゃ、ちがうさー',
    perfectHeading: '全問正解!でーじすごい!',
    titleTiers: [
      { minScore: 10, title: '生粋の沖縄人', description: '沖縄の言葉をでーじ極めた、真のウチナーンチュさー!' },
      { minScore: 8, title: 'エイサー名人', description: 'エイサーも踊れるくらい、あとちょっとだよ、ちばりよー!' },
      { minScore: 6, title: '三線弾き', description: '三線の音色みたいに耳が慣れてきたね、たいしたもんさー' },
      { minScore: 4, title: 'シーサー見習い', description: 'ぼちぼち慣れてきたね、この調子!' },
      { minScore: 2, title: 'ゴーヤー初心者', description: 'なんくるないさ、一緒に覚えていこう' },
      { minScore: 0, title: 'めんそーれ沖縄へ!', description: 'まずは何度も挑戦してみてね' },
    ],
  },
};

module.exports = okinawa;
