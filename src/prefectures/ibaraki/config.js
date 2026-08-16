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
const ibaraki = {
  id: 'ibaraki',
  nameJa: '茨城県',
  nameEn: 'Ibaraki',
  appNameJa: '茨城弁クイズ',
  appNameEn: 'Ibaraki-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.ibaraki',
  scheme: 'dialectquizibaraki',
  easProjectId: '7f0f3bf4-7356-41b7-8fbe-ff29b51c62c9',
  theme: {
    primary: '#C8102E', // 水戸納豆パッケージの赤
    secondary: '#FFD700', // 干し芋・メロンの黄金色
    accent: '#2E7D32', // 筑波山の緑
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
    subtitle: 'この茨城弁、なんて意味だっぺ?',
    incorrect: 'ちがうっぺ!',
    perfectHeading: '全問正解だっぺ!おみごとだっぺ!',
    titleTiers: [
      { minScore: 10, title: 'だっぺマイスター', description: '茨城弁を極めた本物だっぺ!' },
      { minScore: 8, title: '偕楽園レベル', description: 'ほとんど完璧だっぺ、あとちょっとだっぺ!' },
      { minScore: 6, title: 'アンコウ鍋通', description: 'いっぺー知ってるなあ、たいしたもんだっぺ' },
      { minScore: 4, title: '干し芋見習い', description: 'ぼちぼち慣れてきただっぺ' },
      { minScore: 2, title: 'メロン初心者', description: 'これからだっぺ、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ茨城へ!', description: 'まずは何回も挑戦してみっぺ' },
    ],
  },
};

module.exports = ibaraki;
