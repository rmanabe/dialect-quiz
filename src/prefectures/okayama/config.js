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
const okayama = {
  id: 'okayama',
  nameJa: '岡山県',
  nameEn: 'Okayama',
  appNameJa: '岡山弁クイズ',
  appNameEn: 'Okayama-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.okayama',
  scheme: 'dialectquizokayama',
  easProjectId: '',
  theme: {
    primary: '#F28FA2', // 白桃のピンク
    secondary: '#3F51B5', // 鬼退治の青
    accent: '#6B8E23', // きびだんごの葉
    background: '#FFF6F5',
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
    subtitle: 'この岡山弁、なんて意味なんじゃろ?',
    incorrect: 'ちがうんじゃ!',
    perfectHeading: '全問正解じゃがな!でーれーすごいで!',
    titleTiers: [
      { minScore: 10, title: '生粋の岡山っ子', description: '岡山弁をでーれー極めた本物の岡山人じゃ!' },
      { minScore: 8, title: 'でーれー岡山通', description: 'ほとんど完璧、ぼっけーすごいで!' },
      { minScore: 6, title: 'きびだんご一人前', description: 'ようけ知っとるがな、たいしたもんじゃ' },
      { minScore: 4, title: 'きびだんご半人前', description: 'ぼちぼち慣れてきたんちゃ' },
      { minScore: 2, title: '桃太郎初心者', description: 'これからじゃけえ、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ岡山へ!', description: 'まずは何回も挑戦してみんちゃい' },
    ],
  },
};

module.exports = okayama;
