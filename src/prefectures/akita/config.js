const TEST_ADMOB = {
  androidAppId: 'ca-app-pub-3940256099942544~3347511713',
  iosAppId: 'ca-app-pub-3940256099942544~1458002511',
  androidBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
};

/** @type {import('../types').PrefectureConfig} */
const akita = {
  id: 'akita',
  nameJa: '秋田県',
  nameEn: 'Akita',
  appNameJa: '秋田弁クイズ',
  appNameEn: 'Akita-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.akita',
  scheme: 'dialectquizakita',
  easProjectId: '359a0a1c-f1c2-4c47-998b-46e6d5939992',
  theme: {
    primary: '#B5321D', // なまはげの赤
    secondary: '#3C3C3C', // なまはげの黒
    accent: '#F2C230', // 稲穂の黄金色
    background: '#FBF7EC', // 稲穂畑のクリーム色
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
    subtitle: 'この秋田弁、めごい言葉だんが、わがるが?',
    incorrect: 'んだねぇ、ちがうんだ',
    perfectHeading: '全問正解!めごいぐらいすごいんだ!',
    titleTiers: [
      { minScore: 10, title: '生粋の秋田衆', description: '秋田弁を極めた、んだんだ本物だ!' },
      { minScore: 8, title: '竿燈まつり通', description: 'あどちょっとで満点だ、けっぱれ!' },
      { minScore: 6, title: 'なまはげ名人', description: 'たいした詳しいんだ、大したもんだ' },
      { minScore: 4, title: '比内地鶏見習い', description: 'ぼちぼち覚えできたんだ' },
      { minScore: 2, title: 'きりたんぽ初心者', description: 'これがらだんが、いっしょに覚えるべ' },
      { minScore: 0, title: 'ようこそ秋田へ!', description: 'まず挑戦してみへ、なんもさすけねぇ' },
    ],
  },
};

module.exports = akita;
