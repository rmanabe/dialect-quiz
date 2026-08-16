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
const shimane = {
  id: 'shimane',
  nameJa: '島根県',
  nameEn: 'Shimane',
  appNameJa: '島根弁（出雲弁）クイズ',
  appNameEn: 'Shimane-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.shimane',
  scheme: 'dialectquizshimane',
  easProjectId: '',
  theme: {
    primary: '#B03A2E', // 出雲大社の朱
    secondary: '#37474F', // 神話の夜色
    accent: '#D4AF37', // しめ縄の金
    background: '#FBF6EE',
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
    subtitle: 'この出雲弁、なんて意味だが?',
    incorrect: 'ちがうだに!',
    perfectHeading: '全問正解だんだん!えらいもんだに!',
    titleTiers: [
      { minScore: 10, title: '生粋の出雲人', description: '出雲弁を極めた、だんだんね!' },
      { minScore: 8, title: '縁結びの達人', description: 'ほとんど完璧、たいしたもんだに' },
      { minScore: 6, title: '縁結び見習い', description: 'ようけ知っとってからに、えらいわ' },
      { minScore: 4, title: '出雲弁のひよこ', description: 'ぼちぼち慣れてきただねぇ' },
      { minScore: 2, title: '神在月初心者', description: 'これからだけん、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ出雲へ!', description: 'まずは何回も挑戦してごしないよ' },
    ],
  },
};

module.exports = shimane;
