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
const fukui = {
  id: 'fukui',
  nameJa: '福井県',
  nameEn: 'Fukui',
  appNameJa: '福井弁クイズ',
  appNameEn: 'Fukui-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.fukui',
  scheme: 'dialectquizfukui',
  easProjectId: '',
  theme: {
    primary: '#2C5F8A', // echizen coast sea blue
    secondary: '#E07A3E', // echizen crab orange
    accent: '#5A7D5A',
    background: '#F7F5F0',
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
    subtitle: 'この福井弁、わかるのう?',
    incorrect: 'ちがうざ!',
    perfectHeading: '全問正解!ひっでうれしいざ!',
    titleTiers: [
      { minScore: 10, title: '生粋の福井人', description: '福井弁を極めた真の福井人やざ!' },
      { minScore: 8, title: '恐竜博士級', description: 'ほとんど完璧、あとちょっとやざ!' },
      { minScore: 6, title: '東尋坊なみの迫力', description: 'よーけ知っとるのう、たいしたもんや' },
      { minScore: 4, title: '羽二重餅はまだ半人前', description: 'ぼちぼち慣れてきたのう' },
      { minScore: 2, title: '越前がに初心者', description: 'これからやざ、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ福井へ!', description: '何回も挑戦してみまいか!' },
    ],
  },
};

module.exports = fukui;
