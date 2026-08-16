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
const mie = {
  id: 'mie',
  nameJa: '三重県',
  nameEn: 'Mie',
  appNameJa: '三重弁クイズ',
  appNameEn: 'Mie-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.mie',
  scheme: 'dialectquizmie',
  easProjectId: '',
  theme: {
    primary: '#2E7D6B', // Ise-Shima ocean green
    secondary: '#C9A227', // Ise-jingu gold
    accent: '#B23A48', // akafuku mochi red
    background: '#F7F4EC',
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
    subtitle: 'この三重弁、きしょくええくらいわかるか試してみ!',
    incorrect: 'あかへんがな!',
    perfectHeading: '全問正解やで!きしょくええなあ!',
    titleTiers: [
      { minScore: 10, title: '生粋の三重んもん', description: '三重弁をきしょくええくらい極めた、ほんまもんやで' },
      { minScore: 8, title: 'お伊勢さん級', description: 'お伊勢さんもうなずく仕上がりやで' },
      { minScore: 6, title: '伊賀忍者レベル', description: '伊賀忍者も顔負けの早業やで、たいしたもんや' },
      { minScore: 4, title: '赤福もち初心者', description: 'だんねんな、ぼちぼち慣れてきたやん' },
      { minScore: 2, title: 'ケッタ初心者', description: 'あんごやなんて言わんとき、これからやで' },
      { minScore: 0, title: 'ようこそ三重へ!', description: '何度でも挑戦してみてや' },
    ],
  },
};

module.exports = mie;
