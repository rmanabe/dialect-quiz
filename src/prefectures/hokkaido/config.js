const TEST_ADMOB = {
  androidAppId: 'ca-app-pub-3940256099942544~3347511713',
  iosAppId: 'ca-app-pub-3940256099942544~1458002511',
  androidBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
};

/** @type {import('../types').PrefectureConfig} */
const hokkaido = {
  id: 'hokkaido',
  nameJa: '北海道',
  nameEn: 'Hokkaido',
  appNameJa: '北海道弁クイズ',
  appNameEn: 'Hokkaido-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.hokkaido',
  scheme: 'dialectquizhokkaido',
  easProjectId: 'a5378362-e4ff-44db-96f3-ecbf85e0b38a',
  theme: {
    primary: '#2E6F8E', // 雪解けの空の青
    secondary: '#F4A300', // とうもろこし畑の黄色
    accent: '#8B6BA8', // 富良野ラベンダーの紫
    background: '#F7FAFC', // 雪原の白
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
    subtitle: 'この北海道弁、なんも困らんとわかるっしょ?',
    incorrect: 'んー、ちがうっしょ〜',
    perfectHeading: '全問正解、なまらすごいっしょ!',
    titleTiers: [
      { minScore: 10, title: '生粋の道産子', description: '北海道弁をなまら極めた本物の道産子だべさ!' },
      { minScore: 8, title: '雪まつり通', description: 'あとちょっとで満点、なまら惜しいっしょ!' },
      { minScore: 6, title: 'そだねー名人', description: 'なまら詳しいっしょ、そだねーが板についてきたべ' },
      { minScore: 4, title: '毛ガニ見習い', description: 'ぼちぼち覚えてきたっしょ' },
      { minScore: 2, title: 'とうきび初心者', description: 'これからだべ、いっしょに覚えるしょ' },
      { minScore: 0, title: 'ようこそ北海道へ!', description: 'まずはなんも気にせず挑戦してみてね' },
    ],
  },
};

module.exports = hokkaido;
