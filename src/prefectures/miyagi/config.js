const TEST_ADMOB = {
  androidAppId: 'ca-app-pub-3940256099942544~3347511713',
  iosAppId: 'ca-app-pub-3940256099942544~1458002511',
  androidBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
};

/** @type {import('../types').PrefectureConfig} */
const miyagi = {
  id: 'miyagi',
  nameJa: '宮城県',
  nameEn: 'Miyagi',
  appNameJa: '宮城弁（仙台弁）クイズ',
  appNameEn: 'Miyagi-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.miyagi',
  scheme: 'dialectquizmiyagi',
  easProjectId: '98579538-df85-48a4-9c80-96781d854162',
  theme: {
    primary: '#1C3D5A', // 伊達の甲冑紺
    secondary: '#C9A227', // 伊達の三日月の金
    accent: '#8FBF3F', // 笹かまぼこの笹の緑
    background: '#F5F2E9', // 松島の砂浜色
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
    subtitle: 'この仙台弁、いきなりわがるっちゃ?',
    incorrect: 'んー、ちがうっちゃ〜',
    perfectHeading: '全問正解だっちゃ!おめでとう!',
    titleTiers: [
      { minScore: 10, title: '生粋の仙台っ子', description: '仙台弁をいきなり極めただっちゃ!' },
      { minScore: 8, title: '七夕まつり通', description: 'あとちょっとで満点だっちゃ、けっぱれ!' },
      { minScore: 6, title: '笹かまぼこ通', description: 'いきなり詳しいっちゃね、たいしたもんだ' },
      { minScore: 4, title: 'ずんだ餅見習い', description: 'ぼちぼち覚えできたっちゃ' },
      { minScore: 2, title: '牛タン初心者', description: 'これからだっちゃ、いっしょに覚えるべ' },
      { minScore: 0, title: 'ようこそ仙台へ!', description: 'まんずどうもね、まず挑戦してみでね' },
    ],
  },
};

module.exports = miyagi;
