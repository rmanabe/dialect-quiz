import fs from 'fs';
import path from 'path';
import type { ExpoConfig, ConfigContext } from 'expo/config';
import { getPrefectureConfig } from './src/prefectures/index.js';
// .js, like ./src/prefectures/index.js — Expo require()s this config under Node
// and does not transpile what it imports, so a nested .ts import cannot resolve.
import {
  findProductionConfigProblems,
  productionConfigErrorMessage,
} from './src/config/productionGuard.js';

const pref = getPrefectureConfig();

// Each prefecture gets its own mascot-based icon/splash set under
// assets/prefectures/<id>/ (generated via scripts/generate-icons.js).
// Prefectures without a generated set yet (shouldn't happen post-launch,
// but keeps local dev unblocked) fall back to the shared placeholder assets.
const iconDir = fs.existsSync(path.join(__dirname, 'assets', 'prefectures', pref.id, 'icon.png'))
  ? `./assets/prefectures/${pref.id}`
  : './assets';

// Guard against shipping a store build that silently lost its production
// config. 1.0 (build 3) was cut one day before the RevenueCat keys were added
// to EAS, so it went to Apple with an empty API key: the SDK never configured,
// the remove-ads button did nothing, and App Review rejected it under
// Guideline 2.1(b). Nothing in the build surfaced the problem. Fail loudly here
// instead — a broken paid feature is far more expensive than a failed build.
if (process.env.EAS_BUILD_PROFILE === 'production') {
  const problems = findProductionConfigProblems({
    prefectureId: pref.id,
    revenueCat: pref.revenueCat,
    env: process.env,
  });
  if (problems.length > 0) {
    throw new Error(productionConfigErrorMessage(pref.id, problems));
  }
}

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
