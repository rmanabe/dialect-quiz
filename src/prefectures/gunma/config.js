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
const gunma = {
  id: 'gunma',
  nameJa: '群馬県',
  nameEn: 'Gunma',
  appNameJa: '群馬弁（上州弁）クイズ',
  appNameEn: 'Gunma-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.gunma',
  scheme: 'dialectquizgunma',
  easProjectId: 'b88391da-b679-4104-ab2b-550f4da94c2d',
  theme: {
    primary: '#7B3F00', // 焼きまんじゅうの焦げ茶
    secondary: '#F4A300', // 絹産業・かかあ天下の織物金
    accent: '#3E7CB1', // 赤城山麓の空色
    background: '#FFF9F0',
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
    subtitle: 'この上州弁、なんて意味だんべぇ?',
    incorrect: 'ちがうべぇ!',
    perfectHeading: '全問正解だんべぇ!たいしたもんだんべぇ!',
    titleTiers: [
      { minScore: 10, title: '生粋の上州人', description: '上州弁を極めた本物の群馬人だんべぇ!' },
      { minScore: 8, title: '草津温泉レベル', description: 'ほとんど完璧だんべぇ、あとちょっとだんべぇ!' },
      { minScore: 6, title: 'からっ風通', description: 'うんと知ってるなあ、たいしたもんだんべぇ' },
      { minScore: 4, title: 'だるま見習い', description: 'ぼちぼち慣れてきただんべぇ' },
      { minScore: 2, title: '焼きまんじゅう初心者', description: 'これからだんべぇ、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ上州へ!', description: 'まずは何回も挑戦してみりゃあ' },
    ],
  },
};

module.exports = gunma;
