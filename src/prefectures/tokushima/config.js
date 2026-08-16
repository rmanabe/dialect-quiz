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
const tokushima = {
  id: 'tokushima',
  nameJa: '徳島県',
  nameEn: 'Tokushima',
  appNameJa: '徳島弁（阿波弁）クイズ',
  appNameEn: 'Tokushima-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.tokushima',
  scheme: 'dialectquiztokushima',
  easProjectId: '',
  theme: {
    primary: '#264E70', // 阿波藍の藍色
    secondary: '#E8843C', // 阿波おどりの提灯
    accent: '#8FAE3C', // すだちの緑
    background: '#FAF6EF',
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
    subtitle: 'この徳島弁、意味わかるでよ?',
    incorrect: 'ちがうでよ!',
    perfectHeading: '全問正解じょ!たいしたもんでよ!',
    titleTiers: [
      { minScore: 10, title: '生粋の阿波人', description: '徳島弁を極めた本物の阿波もんじょ!' },
      { minScore: 8, title: '阿波おどり連長級', description: 'ほとんど完璧、たいしたもんでよ!' },
      { minScore: 6, title: '阿波おどり踊り子', description: 'ようけ知っとるなあ、大したもんじゃ' },
      { minScore: 4, title: 'にわか連員', description: 'ぼちぼち慣れてきたわい' },
      { minScore: 2, title: '阿波おどり初心者', description: 'これからけん、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ徳島へ!', description: 'まずは何回も挑戦してみいや' },
    ],
  },
};

module.exports = tokushima;
