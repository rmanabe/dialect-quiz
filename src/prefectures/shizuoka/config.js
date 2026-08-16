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
const shizuoka = {
  id: 'shizuoka',
  nameJa: '静岡県',
  nameEn: 'Shizuoka',
  appNameJa: '静岡弁クイズ',
  appNameEn: 'Shizuoka-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.shizuoka',
  scheme: 'dialectquizshizuoka',
  easProjectId: '',
  theme: {
    primary: '#2E7D5E', // ocha (tea) green
    secondary: '#F28C28', // mikan orange
    accent: '#3B6EA5', // suruga bay blue
    background: '#F6FAF3',
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
    subtitle: 'この静岡弁、わかるだら?',
    incorrect: 'ちがうだら!',
    perfectHeading: '全問正解!まっと嬉しいだら!',
    titleTiers: [
      { minScore: 10, title: '生粋の静岡人', description: '静岡弁を極めた真の静岡人だら!' },
      { minScore: 8, title: '富士山級の眺め', description: 'ほとんど完璧、あとちょっとだら!' },
      { minScore: 6, title: 'お茶どころなみの深み', description: 'よう知っとるだに、たいしたもんだら' },
      { minScore: 4, title: 'うなぎパイ見習い', description: 'ぼちぼち慣れてきただら' },
      { minScore: 2, title: 'みかん初心者', description: 'これからだら、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ静岡へ!', description: 'まずは何回も挑戦してみるだら!' },
    ],
  },
};

module.exports = shizuoka;
