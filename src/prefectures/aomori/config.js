const TEST_ADMOB = {
  androidAppId: 'ca-app-pub-3940256099942544~3347511713',
  iosAppId: 'ca-app-pub-3940256099942544~1458002511',
  androidBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  iosBannerUnitId: 'ca-app-pub-3940256099942544/2934735716',
};

/** @type {import('../types').PrefectureConfig} */
const aomori = {
  id: 'aomori',
  nameJa: '青森県',
  nameEn: 'Aomori',
  appNameJa: '青森弁（津軽弁）クイズ',
  appNameEn: 'Aomori-ben Quiz',
  bundleId: 'com.robonetc.dialectquiz.aomori',
  scheme: 'dialectquizaomori',
  easProjectId: '83818064-9c98-453f-ae2b-dd8dedc7e2bd',
  theme: {
    primary: '#C8102E', // りんごの赤
    secondary: '#7CB342', // りんごの葉の緑
    accent: '#FFD54F', // ねぶた祭りの金
    background: '#FFF7F0', // りんごの花の白
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
    subtitle: 'この津軽の言葉、わがるびょんか?',
    incorrect: 'まいねびょん、ちがうびょん',
    perfectHeading: '全問正解!けっぱったな!',
    titleTiers: [
      { minScore: 10, title: '生粋の津軽衆', description: '津軽弁を極めた、んだんだ本物だびょん!' },
      { minScore: 8, title: 'ねぶた祭り通', description: 'あどちょっとで満点だびょん、けっぱれ!' },
      { minScore: 6, title: '津軽三味線名人', description: 'たげ詳しいな、大したもんだびょん' },
      { minScore: 4, title: 'ホタテ見習い', description: 'んだんだ、ぼちぼち覚えできたな' },
      { minScore: 2, title: 'りんご初心者', description: 'これがらだびょん、いっしょにけっぱるべ' },
      { minScore: 0, title: 'ようこそ津軽へ!', description: 'まいねなんてこどねぇ、まず挑戦してみでな' },
    ],
  },
};

module.exports = aomori;
