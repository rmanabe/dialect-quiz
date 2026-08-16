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
const ishikawa = {
  id: 'ishikawa',
  nameJa: '石川県',
  nameEn: 'Ishikawa',
  appNameJa: '石川弁（金沢弁）クイズ',
  appNameEn: 'Ishikawa-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.ishikawa',
  scheme: 'dialectquizishikawa',
  easProjectId: 'd7fc6f40-3fb9-403a-867e-3425fa167035',
  theme: {
    primary: '#B8860B', // kanazawa gold leaf
    secondary: '#8B0000', // kaga-yuzen red
    accent: '#2F4F4F',
    background: '#FFF8E7',
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
    subtitle: 'この石川弁、教えてまっし!',
    incorrect: 'ちがうがや!',
    perfectHeading: '全問正解!たいしたもんがいや!',
    titleTiers: [
      { minScore: 10, title: '生粋の金沢人', description: '石川弁を極めた真の石川人がや!' },
      { minScore: 8, title: '金箔級のきらめき', description: 'ほとんど完璧、あとちょっとがいや!' },
      { minScore: 6, title: '兼六園なみの風格', description: 'ようけ知っとるまっし、たいしたもんや' },
      { minScore: 4, title: '加賀友禅見習い', description: 'ぼちぼち慣れてきたがや' },
      { minScore: 2, title: '金沢おでん初心者', description: 'これからがや、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ石川へ!', description: 'まっし、何回も挑戦してみて!' },
    ],
  },
};

module.exports = ishikawa;
