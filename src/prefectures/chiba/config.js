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
const chiba = {
  id: 'chiba',
  nameJa: '千葉県',
  nameEn: 'Chiba',
  appNameJa: '千葉弁（房総弁）クイズ',
  appNameEn: 'Chiba-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.chiba',
  scheme: 'dialectquizchiba',
  easProjectId: '67176b16-81f2-4908-a40b-053f3bf4f7de',
  theme: {
    primary: '#1B6CA8', // 九十九里浜・太平洋の海の青
    secondary: '#F5A623', // 落花生の殻の色
    accent: '#4CAF50', // 房総の山の緑
    background: '#F0F9FF',
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
    subtitle: 'この千葉弁、なんて意味だっぺ?',
    incorrect: 'ちがうっぺ!',
    perfectHeading: '全問正解だっぺ!たいしたもんだっぺ!',
    titleTiers: [
      { minScore: 10, title: '生粋の房州っ子', description: '千葉弁を極めた真の千葉県民だっぺ!' },
      { minScore: 8, title: '成田山レベル', description: 'ほとんど完璧だっぺ、あとちょっとだっぺ!' },
      { minScore: 6, title: '九十九里浜通', description: 'いっぺえ知ってるなあ、たいしたもんだっぺ' },
      { minScore: 4, title: '房総半島見習い', description: 'ぼちぼち慣れてきただっぺ' },
      { minScore: 2, title: '落花生初心者', description: 'これからだっぺ、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ千葉へ!', description: 'まずは何べんも挑戦してみっぺ' },
    ],
  },
};

module.exports = chiba;
