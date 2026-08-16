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
const saitama = {
  id: 'saitama',
  nameJa: '埼玉県',
  nameEn: 'Saitama',
  appNameJa: '埼玉弁クイズ',
  appNameEn: 'Saitama-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.saitama',
  scheme: 'dialectquizsaitama',
  easProjectId: '6b07e356-a2a2-4178-8d95-8904f140aa97',
  theme: {
    primary: '#4A7729', // 深谷ねぎ・狭山茶の緑
    secondary: '#F2C94C', // 小江戸川越の黄金
    accent: '#B33A3A', // 草加せんべいの焦げ茶赤
    background: '#FAFAF0',
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
    subtitle: 'あーね、この埼玉弁、なんて意味だべ?',
    incorrect: 'ちがうべ!',
    perfectHeading: '全問正解だべ!あーね、たいしたもんだべ!',
    titleTiers: [
      { minScore: 10, title: '生粋の埼玉県民', description: '埼玉弁を極めた本物のさいたま人だべ!' },
      { minScore: 8, title: '小江戸川越レベル', description: 'ほとんど完璧、あとちょっとだべ!' },
      { minScore: 6, title: '深谷ねぎ通', description: 'けっこう知ってるね、たいしたもんだべ' },
      { minScore: 4, title: '秩父見習い', description: 'ぼちぼち慣れてきたね' },
      { minScore: 2, title: '草加せんべい初心者', description: 'これからだべ、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ埼玉へ!', description: 'まずは何回も挑戦してみてね' },
    ],
  },
};

module.exports = saitama;
