import { View, StyleSheet, Platform } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { getPrefectureConfig } from '../prefectures';

interface Props {
  visible?: boolean;
}

export default function AdBanner({ visible = true }: Props) {
  if (!visible) return null;

  const pref = getPrefectureConfig();
  const unitId = Platform.OS === 'ios' ? pref.admob.iosBannerUnitId : pref.admob.androidBannerUnitId;

  return (
    <View style={styles.container}>
      <BannerAd unitId={unitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
