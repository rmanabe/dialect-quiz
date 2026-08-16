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
const niigata = {
  id: 'niigata',
  nameJa: '新潟県',
  nameEn: 'Niigata',
  appNameJa: '新潟弁クイズ',
  appNameEn: 'Niigata-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.niigata',
  scheme: 'dialectquizniigata',
  easProjectId: '',
  theme: {
    primary: '#4A6FA5', // shinano river blue
    secondary: '#F2C94C', // koshihikari rice gold
    accent: '#7CB342', // rice paddy green
    background: '#FBF7EE',
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
    subtitle: 'この新潟弁、わかるろ?',
    incorrect: 'ちがうねっか!',
    perfectHeading: '全問正解!じょんのびしたろ!',
    titleTiers: [
      { minScore: 10, title: 'じょんのび名人', description: '新潟弁を極めた真の新潟人だすけ!' },
      { minScore: 8, title: 'コシヒカリ級の腕前', description: 'ほとんど完璧、あとちょっとだすけ!' },
      { minScore: 6, title: '錦鯉なみの鮮やかさ', description: 'ようけ知っとるねっか、たいしたもんだすけ' },
      { minScore: 4, title: '三尺玉見習い', description: 'ぼちぼち慣れてきたろ' },
      { minScore: 2, title: '笹団子初心者', description: 'これからだすけ、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ新潟へ!', description: 'まずは何回も挑戦してみてねっか' },
    ],
  },
};

module.exports = niigata;
