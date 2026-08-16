import fs from 'fs';
import path from 'path';
import type { ExpoConfig, ConfigContext } from 'expo/config';
import { getPrefectureConfig } from './src/prefectures/index.js';

const pref = getPrefectureConfig();

// Each prefecture gets its own mascot-based icon/splash set under
// assets/prefectures/<id>/ (generated via scripts/generate-icons.js).
// Prefectures without a generated set yet (shouldn't happen post-launch,
// but keeps local dev unblocked) fall back to the shared placeholder assets.
const iconDir = fs.existsSync(path.join(__dirname, 'assets', 'prefectures', pref.id, 'icon.png'))
  ? `./assets/prefectures/${pref.id}`
  : './assets';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: pref.appNameJa,
  slug: `dialect-quiz-${pref.id}`,
  version: '1.0.0',
  orientation: 'portrait',
  icon: `${iconDir}/icon.png`,
  scheme: pref.scheme,
  userInterfaceStyle: 'light',
  backgroundColor: pref.theme.background,
  ios: {
    ...config.ios,
    supportsTablet: true,
    bundleIdentifier: pref.bundleId,
    infoPlist: {
      ...config.ios?.infoPlist,
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    ...config.android,
    package: pref.bundleId,
    adaptiveIcon: {
      backgroundColor: pref.theme.background,
      foregroundImage: `${iconDir}/android-icon-foreground.png`,
      backgroundImage: `${iconDir}/android-icon-background.png`,
      monochromeImage: `${iconDir}/android-icon-monochrome.png`,
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    ...config.web,
    favicon: `${iconDir}/favicon.png`,
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    'expo-status-bar',
    'expo-localization',
    [
      'expo-splash-screen',
      {
        image: `${iconDir}/splash-icon.png`,
        imageWidth: 220,
        resizeMode: 'contain',
        backgroundColor: pref.theme.background,
      },
    ],
    [
      'react-native-google-mobile-ads',
      {
        androidAppId: pref.admob.androidAppId,
        iosAppId: pref.admob.iosAppId,
      },
    ],
  ],
  extra: {
    ...config.extra,
    prefectureId: pref.id,
    eas: {
      projectId: pref.easProjectId,
    },
  },
});
