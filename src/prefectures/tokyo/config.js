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
const tokyo = {
  id: 'tokyo',
  nameJa: '東京都',
  nameEn: 'Tokyo',
  appNameJa: '東京弁（江戸弁）クイズ',
  appNameEn: 'Tokyo-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.tokyo',
  scheme: 'dialectquiztokyo',
  easProjectId: 'd0549d46-3cfb-407a-9249-ae1a3368f728',
  theme: {
    primary: '#1A1A2E', // 江戸紫・藍色
    secondary: '#C41E3A', // 歌舞伎の紅
    accent: '#D4AF37', // 金箔・粋な金
    background: '#F7F3E9',
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
    subtitle: 'この江戸言葉、意味わかるかい?',
    incorrect: 'べらぼうめ、ちげえよ!',
    perfectHeading: '全問正解でえ!てえしたもんだい!',
    titleTiers: [
      { minScore: 10, title: '生粋の江戸っ子', description: '江戸言葉を極めた粋な江戸っ子でえ!' },
      { minScore: 8, title: '浅草仲見世レベル', description: 'ほとんど完璧、あとちょっとでえ!' },
      { minScore: 6, title: '神輿担ぎ通', description: 'てえした知識だ、大したもんでえ' },
      { minScore: 4, title: '銭湯見習い', description: 'ぼちぼち慣れてきたかい' },
      { minScore: 2, title: '招き猫初心者', description: 'これからでえ、いっしょに覚えていこうぜ' },
      { minScore: 0, title: 'ようこそ東京へ!', description: 'まずは何度も挑戦してみてくんな' },
    ],
  },
};

module.exports = tokyo;
