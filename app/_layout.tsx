import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { initI18n } from '../src/i18n';
import { initAds } from '../src/ads/initAds';
import { initPurchases } from '../src/purchases';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function RootLayout() {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    // Render either way. This used to be a bare .then(): if initI18n() ever
    // rejected, i18nReady stayed false and the app sat on the spinner forever
    // — an app that never finishes loading, which is both a dead end for the
    // user and a rejection for App Review. Untranslated keys beat that.
    initI18n()
      .catch((e) => console.warn('[i18n] init failed; rendering anyway', e))
      .finally(() => setI18nReady(true));
    // Ads/purchases init independently; screens degrade gracefully while pending.
    initAds().catch((e) => console.warn('[ads] init failed', e));
    initPurchases().catch((e) => console.warn('[purchases] init failed', e));
  }, []);

  if (!i18nReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#E8572B" />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8ED',
  },
});
