const TEST_ADMOB = {
  androidAppId: 'ca-app-pub-3940256099942544~3347511713',
  iosAppId: 'ca-app-pub-3940256099942544~1458002511',
  androidBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
};

/** @type {import('../types').PrefectureConfig} */
const iwate = {
  id: 'iwate',
  nameJa: '岩手県',
  nameEn: 'Iwate',
  appNameJa: '岩手弁クイズ',
  appNameEn: 'Iwate-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.iwate',
  scheme: 'dialectquiziwate',
  easProjectId: '14af6641-99f1-4b36-8986-716aa3130ae6',
  theme: {
    primary: '#3D6B4C', // 早池峰山の緑
    secondary: '#D9502B', // わんこそば漆器の朱
    accent: '#2B2B2B', // 南部鉄器の黒
    background: '#F7F3EC', // 南部せんべいのクリーム色
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
    subtitle: 'この岩手の言葉、わんつかわがるが?',
    incorrect: 'んにゃ、ちがうがら',
    perfectHeading: '全問正解!たいした立派だない!',
    titleTiers: [
      { minScore: 10, title: '生粋の岩手衆', description: '岩手弁をきわめた、まさに本物だない!' },
      { minScore: 8, title: '南部鉄器通', description: 'あとわんつかで満点だない、けっぱれ!' },
      { minScore: 6, title: 'チャグチャグ馬コ名人', description: 'たいしたもんだ、よぐ知ってるない' },
      { minScore: 4, title: '前沢牛見習い', description: 'わんつかずつ覚えできたない' },
      { minScore: 2, title: 'わんこそば初心者', description: 'これがらだない、いっしょにけっぱるべ' },
      { minScore: 0, title: 'ようこそ岩手へ!', description: 'おもさげねぐらいまだまだだ、まず挑戦してみでね' },
    ],
  },
};

module.exports = iwate;
