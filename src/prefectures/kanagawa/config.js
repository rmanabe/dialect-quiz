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
const kanagawa = {
  id: 'kanagawa',
  nameJa: '神奈川県',
  nameEn: 'Kanagawa',
  appNameJa: '神奈川弁クイズ',
  appNameEn: 'Kanagawa-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.kanagawa',
  scheme: 'dialectquizkanagawa',
  easProjectId: 'f9d5dc17-81b9-4d59-8947-93599acc21d1',
  theme: {
    primary: '#1E5AA8', // 横浜港・湘南の海の青
    secondary: '#E85D3D', // みなとみらいの夕焼けオレンジ
    accent: '#4CAF50', // 丹沢山地の緑
    background: '#F0F7FA',
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
    subtitle: 'この神奈川弁、意味わかるじゃん?',
    incorrect: 'ちがうじゃん!',
    perfectHeading: '全問正解じゃん!すごいじゃん!',
    titleTiers: [
      { minScore: 10, title: '生粋の横浜っ子', description: '神奈川弁を極めた本物の県民じゃん!' },
      { minScore: 8, title: '中華街レベル', description: 'ほとんど完璧、あとちょっとじゃん!' },
      { minScore: 6, title: '江の島通', description: 'けっこう知ってるじゃん、たいしたもんじゃん' },
      { minScore: 4, title: 'しらす丼見習い', description: 'ぼちぼち慣れてきたじゃん' },
      { minScore: 2, title: '鎌倉大仏初心者', description: 'これからじゃん、いっしょに覚えよう' },
      { minScore: 0, title: 'ようこそ神奈川へ!', description: 'まずは何回も挑戦してみて!' },
    ],
  },
};

module.exports = kanagawa;
