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
const yamanashi = {
  id: 'yamanashi',
  nameJa: '山梨県',
  nameEn: 'Yamanashi',
  appNameJa: '山梨弁（甲州弁）クイズ',
  appNameEn: 'Yamanashi-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.yamanashi',
  scheme: 'dialectquizyamanashi',
  easProjectId: '',
  theme: {
    primary: '#7B3F61', // budo (grape) purple
    secondary: '#F4A300', // momo (peach) orange
    accent: '#4A7A4A', // fuji forest green
    background: '#FDF6F0',
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
    subtitle: 'この山梨弁、わかるずら?',
    incorrect: 'ちがうずら!',
    perfectHeading: '全問正解!よくやっただんべ!',
    titleTiers: [
      { minScore: 10, title: '生粋の山梨人', description: '山梨弁を極めた真の山梨人ずら!' },
      { minScore: 8, title: '富士山級の貫禄', description: 'ほとんど完璧、あとちょっとずら!' },
      { minScore: 6, title: 'ほうとうなみの奥深さ', description: 'よう知っとるじゃん、たいしたもんずら' },
      { minScore: 4, title: '信玄餅見習い', description: 'ぼちぼち慣れてきただら' },
      { minScore: 2, title: 'ぶどう初心者', description: 'これからずら、いっしょに覚えていこ' },
      { minScore: 0, title: 'ようこそ山梨へ!', description: 'まずは何回も挑戦してみてくんない!' },
    ],
  },
};

module.exports = yamanashi;
