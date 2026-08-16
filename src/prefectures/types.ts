export interface AdMobConfig {
  androidAppId: string;
  iosAppId: string;
  androidBannerUnitId: string;
  iosBannerUnitId: string;
}

export interface RevenueCatConfig {
  apiKeyIos: string;
  apiKeyAndroid: string;
  entitlementId: string;
  productId: string;
}

export interface PrefectureTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface TitleTier {
  minScore: number;
  title: string;
  description: string;
}

/** Optional per-prefecture flavor-text overrides. Omit to use the neutral defaults. */
export interface PrefectureCopy {
  subtitle?: string;
  incorrect?: string;
  perfectHeading?: string;
  titleTiers?: TitleTier[];
}

export interface PrefectureConfig {
  /** short id, also used as folder name / EXPO_PUBLIC_PREFECTURE value */
  id: string;
  nameJa: string;
  nameEn: string;
  appNameJa: string;
  appNameEn: string;
  /** e.g. com.robonetc.dialectquiz.osaka */
  bundleId: string;
  /** deep link scheme, e.g. dialectquizosaka */
  scheme: string;
  /** EAS project id for this prefecture's app, from `eas init` (expo.dev/accounts/.../projects/...) */
  easProjectId: string;
  theme: PrefectureTheme;
  admob: AdMobConfig;
  revenueCat: RevenueCatConfig;
  /** Prefecture-flavored UI text overrides (only Osaka uses this today; others fall back to neutral defaults). */
  copy?: PrefectureCopy;
}
