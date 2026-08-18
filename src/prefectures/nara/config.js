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
const nara = {
  id: 'nara',
  nameJa: '奈良県',
  nameEn: 'Nara',
  appNameJa: '奈良弁クイズ',
  appNameEn: 'Nara-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.nara',
  scheme: 'dialectquiznara',
  easProjectId: '4dbb775b-885c-4a24-9c26-4cf84a1ce5cd',
  theme: {
    primary: '#8B5A2B', // Nara deer coat brown
    secondary: '#C9A66B', // Nara ink / persimmon
    accent: '#2E6B4F', // Kasuga-taisha cedar green
    background: '#FBF6EC',
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
    subtitle: 'この奈良弁、あんじょうわかるか試してみ',
    incorrect: 'てれこやったなあ',
    perfectHeading: '全問正解や!だんない、ようやった!',
    titleTiers: [
      { minScore: 10, title: '生粋の大和人', description: '奈良弁をあんじょう極めた、ほんまもんやで' },
      { minScore: 8, title: '大仏はん級', description: '東大寺の大仏はんもうなずくレベルやで' },
      { minScore: 6, title: '若草山レベル', description: '若草山みたいにようけ知っとるがな' },
      { minScore: 4, title: '鹿せんべい初心者', description: 'ぼちぼちやけど、だんないで' },
      { minScore: 2, title: 'てれこ初心者', description: 'まだてれこになるけど、だんないだんない' },
      { minScore: 0, title: 'ようこそ大和へ!', description: 'なんじゅーせんと、何度でも挑戦しいな' },
    ],
  },
};

module.exports = nara;
