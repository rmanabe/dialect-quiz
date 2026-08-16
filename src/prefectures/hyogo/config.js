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
const hyogo = {
  id: 'hyogo',
  nameJa: '兵庫県',
  nameEn: 'Hyogo',
  appNameJa: '兵庫弁（神戸弁）クイズ',
  appNameEn: 'Hyogo-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.hyogo',
  scheme: 'dialectquizhyogo',
  easProjectId: '39511c80-3522-45ff-a92a-a6576a6ba36a',
  theme: {
    primary: '#1E5AA8', // Kobe harbor blue
    secondary: '#E8B84B', // Nada sake-brewery gold
    accent: '#C0392B', // Kobe beef red
    background: '#F4F7FA', // Himeji white-castle white
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
    subtitle: 'ちょー、この兵庫弁いけるか試してみ!',
    incorrect: 'べっちょない、また今度な',
    perfectHeading: '全問正解や!ごっつい!',
    titleTiers: [
      { minScore: 10, title: '生粋の神戸っ子', description: '兵庫弁をごっつい極めた本物やで!' },
      { minScore: 8, title: '神戸ビーフ級', description: '霜降りみたいに、ええ仕上がりやで' },
      { minScore: 6, title: '白鷺城クラス', description: '白鷺城くらい堂々としてきたやん' },
      { minScore: 4, title: '須磨の浜辺レベル', description: 'ぼちぼちわかってきたな' },
      { minScore: 2, title: 'べっちょない初心者', description: 'まだまだこれからや、べっちょないで' },
      { minScore: 0, title: 'ようこそ兵庫へ!', description: '何回でも挑戦してみいや' },
    ],
  },
};

module.exports = hyogo;
