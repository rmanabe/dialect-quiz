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
const wakayama = {
  id: 'wakayama',
  nameJa: '和歌山県',
  nameEn: 'Wakayama',
  appNameJa: '和歌山弁（紀州弁）クイズ',
  appNameEn: 'Wakayama-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.wakayama',
  scheme: 'dialectquizwakayama',
  easProjectId: '',
  theme: {
    primary: '#E67E22', // mikan orange
    secondary: '#A8322D', // Kumano-hongu shrine vermillion
    accent: '#1F6F8B', // Pacific Ocean blue
    background: '#FFF7EC',
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
    subtitle: 'この紀州弁、やにこーわかるか?',
    incorrect: 'わやくちゃやーん',
    perfectHeading: '全問正解や!やにこーようやった!',
    titleTiers: [
      { minScore: 10, title: '生粋の紀州もん', description: '紀州弁をやにこー極めた、ほんまの和歌山人や' },
      { minScore: 8, title: '熊野古道級', description: '熊野古道を歩き切るくらいの根性、ついてきたで' },
      { minScore: 6, title: '那智の滝レベル', description: '那智の滝みたいに、ようさん知識が流れ込んどるで' },
      { minScore: 4, title: 'うめぼし修行中', description: 'ぼちぼちわかってきたで' },
      { minScore: 2, title: 'みかん初心者', description: 'なっとうしよう思うけど、これからやで' },
      { minScore: 0, title: 'ごんしょ、和歌山へ!', description: '何度でも挑戦してみてや' },
    ],
  },
};

module.exports = wakayama;
