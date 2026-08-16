import { useEffect, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getTitle, isPerfectScore } from '../src/quiz/engine';
import { getPrefectureConfig } from '../src/prefectures';
import { saveBestResultIfHigher } from '../src/state/bestResult';
import { startNewQuiz } from '../src/state/startQuiz';
import { useAdFree } from '../src/purchases';
import AdBanner from '../src/ads/AdBanner';
import { TakoyakiMascot, ConfettiBurst, WordMascot } from '../src/components/illustrations';
import { mascots } from '../src/components/illustrations/mascots';

const pref = getPrefectureConfig();
const Mascot = mascots[pref.id];

export default function Result() {
  const { t } = useTranslation();
  const router = useRouter();
  const adFree = useAdFree();
  const params = useLocalSearchParams<{ score?: string; total?: string }>();
  const score = Number(params.score ?? 0);
  const total = Number(params.total ?? 10);
  const perfect = isPerfectScore(score, total);
  const title = useMemo(() => getTitle(score, total, pref.copy?.titleTiers), [score, total]);

  useEffect(() => {
    // Only record a result that actually came from finishing a quiz (has a
    // score param) — otherwise visiting /result directly would write a
    // phantom 0/10 "best" record.
    if (params.score !== undefined) {
      saveBestResultIfHigher(pref.id, { score, title: title.title });
    }
  }, [params.score, score, title]);

  function handleRetry() {
    startNewQuiz(pref.id);
    router.replace('/quiz');
  }

  function handleHome() {
    router.replace('/');
  }

  return (
    <View style={[styles.container, { backgroundColor: pref.theme.background }]}>
      {perfect && (
        <View style={styles.confettiWrap} pointerEvents="none">
          <ConfettiBurst size={260} />
        </View>
      )}

      <Text style={styles.heading}>
        {perfect ? pref.copy?.perfectHeading ?? t('result.perfectHeading') : t('result.title')}
      </Text>
      {pref.id === 'osaka' ? (
        <TakoyakiMascot size={120} mood={perfect ? 'excited' : score >= total / 2 ? 'happy' : 'neutral'} />
      ) : Mascot ? (
        <Mascot size={120} mood={perfect ? 'excited' : score >= total / 2 ? 'happy' : 'neutral'} />
      ) : (
        <WordMascot
          size={120}
          mood={perfect ? 'excited' : score >= total / 2 ? 'happy' : 'neutral'}
          color={pref.theme.primary}
        />
      )}
      <Text style={styles.score}>{t('result.score', { score, total })}</Text>

      <View style={[styles.titleCard, perfect && { borderColor: pref.theme.secondary, borderWidth: 3 }]}>
        <Text style={styles.titleLabel}>{t('result.yourTitle')}</Text>
        <Text style={[styles.titleValue, { color: pref.theme.primary }]}>{title.title}</Text>
        <Text style={styles.titleDescription}>{title.description}</Text>
      </View>

      <Pressable style={[styles.button, { backgroundColor: pref.theme.primary }]} onPress={handleRetry}>
        <Text style={styles.buttonText}>{t('result.retry')}</Text>
      </Pressable>
      <Pressable onPress={handleHome} hitSlop={8}>
        <Text style={styles.homeLink}>{t('result.home')}</Text>
      </Pressable>

      <AdBanner visible={!adFree} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 24,
    gap: 12,
  },
  confettiWrap: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#5A3B1E',
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A5B3E',
  },
  titleCard: {
    marginTop: 8,
    width: '100%',
    backgroundColor: '#ffffffcc',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
  },
  titleLabel: {
    fontSize: 12,
    color: '#9A8367',
  },
  titleValue: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  titleDescription: {
    fontSize: 13,
    color: '#7A5B3E',
    marginTop: 6,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 999,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  homeLink: {
    marginTop: 4,
    fontSize: 13,
    color: '#9A8367',
    textDecorationLine: 'underline',
  },
});
