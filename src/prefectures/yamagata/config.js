const TEST_ADMOB = {
  androidAppId: 'ca-app-pub-3940256099942544~3347511713',
  iosAppId: 'ca-app-pub-3940256099942544~1458002511',
  androidBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
};

/** @type {import('../types').PrefectureConfig} */
const yamagata = {
  id: 'yamagata',
  nameJa: '山形県',
  nameEn: 'Yamagata',
  appNameJa: '山形弁クイズ',
  appNameEn: 'Yamagata-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.yamagata',
  scheme: 'dialectquizyamagata',
  easProjectId: '07e6356e-8229-4609-9754-5157354cb428',
  theme: {
    primary: '#E0245E', // さくらんぼの赤
    secondary: '#4C7A3D', // さくらんぼの葉の緑
    accent: '#F5D547', // 紅花の黄色
    background: '#FFF6F2', // さくらんぼの花の白
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
    subtitle: 'この山形弁、なんて言ってんだがわがるが?',
    incorrect: 'いんめ、はずれだず',
    perfectHeading: '全問正解!おしょうしな、たいしたもんだず!',
    titleTiers: [
      { minScore: 10, title: '生粋の山形衆', description: '山形弁を極めた、んだんだ本物だず!' },
      { minScore: 8, title: '花笠まつり通', description: 'あどちょっとで満点だず、けっぱれ!' },
      { minScore: 6, title: '芋煮会名人', description: 'たいした詳しいんだず、大したもんだ' },
      { minScore: 4, title: '米沢牛見習い', description: 'ぼちぼち覚えできたんだず' },
      { minScore: 2, title: 'さくらんぼ初心者', description: 'これがらだず、いっしょに覚えっぺ' },
      { minScore: 0, title: 'ようこそ山形へ!', description: 'まず挑戦してみへ、いっぺ楽しんでけろ' },
    ],
  },
};

module.exports = yamagata;
