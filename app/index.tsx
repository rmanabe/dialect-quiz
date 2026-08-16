import { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getPrefectureConfig } from '../src/prefectures';
import { startNewQuiz } from '../src/state/startQuiz';
import { getBestResult, type BestResult } from '../src/state/bestResult';
import { useAdFree, purchaseRemoveAds, restorePurchases } from '../src/purchases';
import AdBanner from '../src/ads/AdBanner';
import { TakoyakiMascot, OsakaCastle, WordMascot } from '../src/components/illustrations';
import { mascots } from '../src/components/illustrations/mascots';

const pref = getPrefectureConfig();
const Mascot = mascots[pref.id];

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const adFree = useAdFree();
  const [best, setBest] = useState<BestResult | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    getBestResult(pref.id).then(setBest);
  }, []);

  const handleStart = useCallback(() => {
    startNewQuiz(pref.id);
    router.push('/quiz');
  }, [router]);

  const handleRemoveAds = useCallback(async () => {
    setPurchasing(true);
    await purchaseRemoveAds();
    setPurchasing(false);
  }, []);

  const handleRestore = useCallback(async () => {
    setPurchasing(true);
    await restorePurchases();
    setPurchasing(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: pref.theme.background }]}
    >
      <View style={styles.hero}>
        {pref.id === 'osaka' ? (
          <>
            <TakoyakiMascot size={110} mood="happy" />
            <OsakaCastle size={80} />
          </>
        ) : Mascot ? (
          <Mascot size={110} mood="happy" />
        ) : (
          <WordMascot size={110} mood="happy" color={pref.theme.primary} />
        )}
      </View>
      <Text style={[styles.title, { color: pref.theme.primary }]}>{pref.appNameJa}</Text>
      <Text style={styles.subtitle}>{pref.copy?.subtitle ?? t('home.subtitle')}</Text>

      <Pressable style={[styles.startButton, { backgroundColor: pref.theme.primary }]} onPress={handleStart}>
        <Text style={styles.startButtonText}>{t('home.start')}</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>{t('home.bestTitle')}</Text>
        {best ? (
          <Text style={styles.cardValue}>
            {best.title} ({best.score}/10)
          </Text>
        ) : (
          <Text style={styles.cardValueMuted}>{t('home.noBestTitleYet')}</Text>
        )}
      </View>

      {Platform.OS !== 'web' && !adFree && (
        <Pressable style={styles.secondaryButton} onPress={handleRemoveAds} disabled={purchasing}>
          <Text style={styles.secondaryButtonText}>
            {purchasing ? t('purchase.processing') : t('home.removeAds')}
          </Text>
        </Pressable>
      )}
      {adFree && <Text style={styles.adFreeLabel}>{t('home.adsRemoved')}</Text>}
      {Platform.OS !== 'web' && (
        <Pressable onPress={handleRestore} disabled={purchasing} hitSlop={8}>
          <Text style={styles.restoreLink}>{t('home.restorePurchases')}</Text>
        </Pressable>
      )}

      <AdBanner visible={!adFree} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    color: '#7A5B3E',
    textAlign: 'center',
  },
  startButton: {
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 999,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  hint: {
    fontSize: 12,
    color: '#9A8367',
  },
  card: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#ffffffaa',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 12,
    color: '#9A8367',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5A3B1E',
  },
  cardValueMuted: {
    fontSize: 14,
    color: '#B4A385',
  },
  secondaryButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D9924A',
  },
  secondaryButtonText: {
    color: '#8A5A2A',
    fontWeight: '600',
  },
  adFreeLabel: {
    marginTop: 8,
    color: '#2E7D32',
    fontWeight: '600',
  },
  restoreLink: {
    marginTop: 6,
    fontSize: 12,
    color: '#9A8367',
    textDecorationLine: 'underline',
  },
});
