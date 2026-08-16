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
const aichi = {
  id: 'aichi',
  nameJa: '愛知県',
  nameEn: 'Aichi',
  appNameJa: '愛知弁（名古屋弁）クイズ',
  appNameEn: 'Aichi-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.aichi',
  scheme: 'dialectquizaichi',
  easProjectId: '',
  theme: {
    primary: '#B8342E', // hatcho-miso red
    secondary: '#E3B23C', // kinshachi (golden shachihoko) gold
    accent: '#4A7A9C',
    background: '#FBF3EC',
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
    subtitle: 'この愛知弁、わかるだがや?',
    incorrect: 'ちがうにゃー!',
    perfectHeading: '全問正解!でらうみゃー気分だがや!',
    titleTiers: [
      { minScore: 10, title: '生粋の名古屋人', description: '愛知弁を極めた真の愛知人だがや!' },
      { minScore: 8, title: '金シャチ級の輝き', description: 'ほとんど完璧、あとちょっとだがね!' },
      { minScore: 6, title: 'モーニング文化なみの手厚さ', description: 'どえりゃあ知っとるなも、たいしたもんだがや' },
      { minScore: 4, title: '天むす見習い', description: 'ぼちぼち慣れてきたにゃー' },
      { minScore: 2, title: 'ひつまぶし初心者', description: 'これからだがや、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ愛知へ!', description: 'まずは何べんも挑戦してみりん!' },
    ],
  },
};

module.exports = aichi;
