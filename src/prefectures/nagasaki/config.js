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
const nagasaki = {
  id: 'nagasaki',
  nameJa: '長崎県',
  nameEn: 'Nagasaki',
  appNameJa: '長崎弁クイズ',
  appNameEn: 'Nagasaki-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.nagasaki',
  scheme: 'dialectquiznagasaki',
  easProjectId: '80a512fc-deb7-4068-81ac-d50c874ac5e8',
  theme: {
    primary: '#1F5C8B', // nagasaki harbor blue
    secondary: '#E8A33D', // castella sponge gold
    accent: '#B4335A', // kunchi festival crimson
    background: '#FBF7F1',
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
    subtitle: 'この長崎弁、なんて言いよっとかわかる?',
    incorrect: 'そいはちがうばい',
    perfectHeading: '全問正解たい!よかね!',
    titleTiers: [
      { minScore: 10, title: '生粋の長崎んもん', description: '長崎弁ば極めた真の長崎んもんたい!' },
      { minScore: 8, title: '龍踊り名人', description: '長崎くんちの龍踊りば踊れるくらい、あとちょっとばい!' },
      { minScore: 6, title: '眼鏡橋通', description: '出島や眼鏡橋にも詳しか、たいしたもんばい' },
      { minScore: 4, title: 'ちゃんぽん見習い', description: 'ぼちぼち慣れてきたばってん、まだまだたい' },
      { minScore: 2, title: 'カステラ初心者', description: 'これからたい、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ長崎へ!', description: 'まずは何回も挑戦してみんしゃい' },
    ],
  },
};

module.exports = nagasaki;
