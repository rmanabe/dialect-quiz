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
const kochi = {
  id: 'kochi',
  nameJa: '高知県',
  nameEn: 'Kochi',
  appNameJa: '高知弁（土佐弁）クイズ',
  appNameEn: 'Kochi-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.kochi',
  scheme: 'dialectquizkochi',
  easProjectId: 'a583a3d8-b557-4610-b763-de8d8cbe6d69',
  theme: {
    primary: '#D9483D', // カツオのたたきの赤
    secondary: '#1B6CA8', // 黒潮の青
    accent: '#F2C230', // よさこいの金
    background: '#FFF8F0',
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
    subtitle: 'この高知弁、なんて意味かわかるぜよ?',
    incorrect: 'ちがうぜよ!',
    perfectHeading: '全問正解ぜよ!まっことすごいがじゃき!',
    titleTiers: [
      { minScore: 10, title: '生粋のいごっそう', description: '高知弁をまっこと極めた本物の土佐人ぜよ!' },
      { minScore: 8, title: '一本釣り級', description: 'ほとんど完璧、まっことすごいぜよ!' },
      { minScore: 6, title: '藁焼き見習い', description: 'ようけ知っちゅうねや、たいしたもんじゃ' },
      { minScore: 4, title: '土佐弁のひよこ', description: 'ぼちぼち慣れてきたきに' },
      { minScore: 2, title: 'はちきん初心者', description: 'これからじゃき、いっしょに覚えようや' },
      { minScore: 0, title: 'ようこそ高知へ!', description: 'まずは何回も挑戦してみいや' },
    ],
  },
};

module.exports = kochi;
