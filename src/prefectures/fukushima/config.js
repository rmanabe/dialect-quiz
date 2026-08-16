const TEST_ADMOB = {
  androidAppId: 'ca-app-pub-3940256099942544~3347511713',
  iosAppId: 'ca-app-pub-3940256099942544~1458002511',
  androidBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
};

/** @type {import('../types').PrefectureConfig} */
const fukushima = {
  id: 'fukushima',
  nameJa: '福島県',
  nameEn: 'Fukushima',
  appNameJa: '福島弁クイズ',
  appNameEn: 'Fukushima-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.fukushima',
  scheme: 'dialectquizfukushima',
  easProjectId: '8bf7eac6-b4d9-49f6-8073-978ac5954b0c',
  theme: {
    primary: '#E88AA0', // 花見山の桃色
    secondary: '#4C7A3D', // 磐梯山の緑
    accent: '#3A5FA0', // 猪苗代湖の青
    background: '#FFF7F5', // 桃の花びらの白
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
    subtitle: 'この福島弁、なんて言ってんだかわがっぺ?',
    incorrect: 'んにゃ、ちがうだない',
    perfectHeading: '全問正解!ありがとなし、たいしたもんだない!',
    titleTiers: [
      { minScore: 10, title: '生粋の会津衆', description: '福島弁を極めた、たいした本物だない!' },
      { minScore: 8, title: '赤べこ通', description: 'あどちょっとで満点だない!' },
      { minScore: 6, title: '喜多方ラーメン名人', description: 'たいした詳しいんだない、大したもんだ' },
      { minScore: 4, title: '円盤餃子見習い', description: 'ばんでねー、ぼちぼち覚えできただない' },
      { minScore: 2, title: '桃初心者', description: 'これがらだない、いっしょに覚えっぺ' },
      { minScore: 0, title: 'ようこそ福島へ!', description: 'ばんでねーがら、まず挑戦してみでない' },
    ],
  },
};

module.exports = fukushima;
