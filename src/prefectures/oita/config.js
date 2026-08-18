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
const oita = {
  id: 'oita',
  nameJa: '大分県',
  nameEn: 'Oita',
  appNameJa: '大分弁クイズ',
  appNameEn: 'Oita-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.oita',
  scheme: 'dialectquizoita',
  easProjectId: 'abffc0ee-9389-4c71-bfd3-4fa33976df35',
  theme: {
    primary: '#3C7A5C', // beppu onsen steam green
    secondary: '#E0A63E', // kabosu citrus gold
    accent: '#8C4A3C', // bungo bull brown
    background: '#FBF8EF',
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
    subtitle: 'この大分弁、なんちゅう意味かわかるかえ?',
    incorrect: 'ちがうわい',
    perfectHeading: '全問正解じゃ!たいしたもんじゃ!',
    titleTiers: [
      { minScore: 10, title: '生粋の大分んし', description: '大分弁を極めた真の大分んしじゃ!' },
      { minScore: 8, title: '別府温泉通', description: '別府の湯にも詳しか、あとちょっとじゃわい' },
      { minScore: 6, title: '地獄めぐり名人', description: '地獄めぐりも制覇した、たいしたもんじゃ' },
      { minScore: 4, title: 'とり天見習い', description: 'ぼちぼち慣れてきたっちゃ' },
      { minScore: 2, title: 'かぼす初心者', description: 'よだきがらんで、いっしょに覚えよわい' },
      { minScore: 0, title: 'ようこそ大分へ!', description: 'まずは何回も挑戦してみんちゃい' },
    ],
  },
};

module.exports = oita;
