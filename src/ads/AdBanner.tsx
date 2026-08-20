import { View, StyleSheet, Platform } from 'react-native';
import { getPrefectureConfig } from '../prefectures';
import { getAdsSdk } from './sdk';

interface Props {
  visible?: boolean;
}

export default function AdBanner({ visible = true }: Props) {
  if (!visible) return null;

  // Resolved here rather than imported at the top of the file, so a native
  // module that failed to register costs us the banner, not the app.
  const sdk = getAdsSdk();
  if (!sdk) return null;

  const { BannerAd, BannerAdSize } = sdk;
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
