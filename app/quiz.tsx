import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getSession, recordAnswer, computeScore, clearSession } from '../src/state/quizSession';
import { getPrefectureConfig } from '../src/prefectures';
import { useAdFree } from '../src/purchases';
import AdBanner from '../src/ads/AdBanner';
import { TakoyakiMascot, WordMascot } from '../src/components/illustrations';
import { mascots } from '../src/components/illustrations/mascots';

const pref = getPrefectureConfig();
// Prefer the parenthesized colloquial name (e.g. "福岡弁（博多弁）クイズ" -> "博多弁")
// since it reads more naturally in the quiz question than the full "県弁（通称）" form.
const dialectName = (() => {
  const base = pref.appNameJa.replace(/クイズ$/, '');
  const match = base.match(/[（(]([^）)]+)[）)]/);
  return match ? match[1] : base;
})();
const Mascot = mascots[pref.id];

export default function Quiz() {
  const { t } = useTranslation();
  const router = useRouter();
  const adFree = useAdFree();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const session = getSession();

  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [session, router]);

  if (!session || session.items.length === 0) {
    return null;
  }

  const items = session.items;
  const current = items[index];
  const total = items.length;
  const isCorrect = selected !== null && selected === current.correctIndex;

  function handleSelect(choiceIndex: number) {
    if (selected !== null) return;
    setSelected(choiceIndex);
    recordAnswer(current, choiceIndex);
  }

  function handleNext() {
    if (index + 1 >= total) {
      const score = computeScore();
      clearSession();
      router.replace({ pathname: '/result', params: { score: String(score), total: String(total) } });
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: pref.theme.background }]}>
      <Text style={styles.progress}>{t('quiz.progress', { current: index + 1, total })}</Text>

      <View style={styles.card}>
        {pref.id === 'osaka' ? (
          <TakoyakiMascot size={70} mood={selected === null ? 'neutral' : isCorrect ? 'excited' : 'neutral'} />
        ) : Mascot ? (
          <Mascot size={70} mood={selected === null ? 'neutral' : isCorrect ? 'excited' : 'neutral'} />
        ) : (
          <WordMascot
            size={70}
            mood={selected === null ? 'neutral' : isCorrect ? 'excited' : 'neutral'}
            color={pref.theme.primary}
          />
        )}
        <Text style={styles.question}>{t('quiz.question', { dialect: dialectName })}</Text>
        <Text style={[styles.word, { color: pref.theme.primary }]}>{current.word}</Text>
      </View>

      <View style={styles.choices}>
        {current.choices.map((choice, i) => {
          const showCorrect = selected !== null && i === current.correctIndex;
          const showWrong = selected === i && !isCorrect;
          return (
            <Pressable
              key={i}
              style={[styles.choiceButton, showCorrect && styles.choiceCorrect, showWrong && styles.choiceWrong]}
              onPress={() => handleSelect(i)}
              disabled={selected !== null}
            >
              <Text style={styles.choiceText}>{choice}</Text>
            </Pressable>
          );
        })}
      </View>

      {selected !== null && (
        <View style={styles.feedback}>
          <Text style={isCorrect ? styles.correctText : styles.incorrectText}>
            {isCorrect ? t('quiz.correct') : pref.copy?.incorrect ?? t('quiz.incorrect')}
          </Text>
          {!isCorrect && (
            <Text style={styles.correctAnswer}>
              {t('quiz.correctAnswerWas', { answer: current.choices[current.correctIndex] })}
            </Text>
          )}
          <Pressable style={[styles.nextButton, { backgroundColor: pref.theme.primary }]} onPress={handleNext}>
            <Text style={styles.nextButtonText}>{t('quiz.next')}</Text>
          </Pressable>
        </View>
      )}

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
    gap: 16,
  },
  progress: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9A8367',
  },
  card: {
    alignItems: 'center',
    gap: 8,
  },
  question: {
    fontSize: 14,
    color: '#7A5B3E',
  },
  word: {
    fontSize: 30,
    fontWeight: '800',
  },
  choices: {
    width: '100%',
    gap: 10,
  },
  choiceButton: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#ffffffcc',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  choiceCorrect: {
    borderColor: '#2E7D32',
    backgroundColor: '#E4F3E5',
  },
  choiceWrong: {
    borderColor: '#C0392B',
    backgroundColor: '#FBE5E2',
  },
  choiceText: {
    fontSize: 15,
    color: '#3A2412',
  },
  feedback: {
    alignItems: 'center',
    gap: 6,
  },
  correctText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2E7D32',
  },
  incorrectText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#C0392B',
  },
  correctAnswer: {
    fontSize: 13,
    color: '#7A5B3E',
  },
  nextButton: {
    marginTop: 6,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
