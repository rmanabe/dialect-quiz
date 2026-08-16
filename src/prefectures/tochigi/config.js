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
const tochigi = {
  id: 'tochigi',
  nameJa: '栃木県',
  nameEn: 'Tochigi',
  appNameJa: '栃木弁クイズ',
  appNameEn: 'Tochigi-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.tochigi',
  scheme: 'dialectquiztochigi',
  easProjectId: 'de4ccd51-94bc-4a38-8854-b44335401011',
  theme: {
    primary: '#E60033', // とちおとめ(いちご)の赤
    secondary: '#4CAF50', // かんぴょう・日光の緑
    accent: '#8D6E63', // 宇都宮餃子の焼き色
    background: '#FFF5F5',
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
    subtitle: 'この栃木弁、なんて意味だんべ?',
    incorrect: 'ちがうべ!',
    perfectHeading: '全問正解だんべ!たいしたもんだんべ!',
    titleTiers: [
      { minScore: 10, title: 'でえじマイスター', description: '栃木弁を極めた本物だんべ!' },
      { minScore: 8, title: '日光東照宮レベル', description: 'ほとんど完璧だんべ、あとちょっとだんべ!' },
      { minScore: 6, title: 'かんぴょう通', description: 'いっぺえ知ってるなあ、たいしたもんだんべ' },
      { minScore: 4, title: 'とちおとめ見習い', description: 'ぼちぼち慣れてきただんべ' },
      { minScore: 2, title: '餃子初心者', description: 'これからだんべ、いっしょに覚えような' },
      { minScore: 0, title: 'ようこそ栃木へ!', description: 'まずは何回も挑戦してみっぺ' },
    ],
  },
};

module.exports = tochigi;
