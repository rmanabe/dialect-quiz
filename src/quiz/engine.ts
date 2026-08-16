import type { QuizItem, RawQuestion, TitleTier } from './types';

const CHOICES_PER_QUESTION = 4;

function shuffle<T>(input: readonly T[]): T[] {
  const arr = input.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildChoices(question: RawQuestion, pool: RawQuestion[]): { choices: string[]; correctIndex: number } {
  const correct = question.meaning_ja;
  const distractorPool = shuffle(pool.filter((q) => q.id !== question.id && q.meaning_ja !== correct));
  const distractors = distractorPool.slice(0, CHOICES_PER_QUESTION - 1).map((q) => q.meaning_ja);
  const choices = shuffle([correct, ...distractors]);
  return { choices, correctIndex: choices.indexOf(correct) };
}

export function buildQuiz(pool: RawQuestion[], count = 10): QuizItem[] {
  const selected = shuffle(pool).slice(0, Math.min(count, pool.length));
  return selected.map((question) => {
    const { choices, correctIndex } = buildChoices(question, pool);
    return { id: question.id, word: question.word, choices, correctIndex };
  });
}

// Neutral default tiers used by every prefecture that doesn't define its own
// flavor text via PrefectureConfig.copy.titleTiers (currently only Osaka does).
export const DEFAULT_TITLE_TIERS: TitleTier[] = [
  {
    minScore: 10,
    title: '方言マスター',
    description: 'この方言をきわめました!',
  },
  {
    minScore: 8,
    title: '方言上級者',
    description: 'ほとんど完璧、あとちょっと!',
  },
  {
    minScore: 6,
    title: '方言中級者',
    description: 'よく知っていますね、たいしたものです',
  },
  {
    minScore: 4,
    title: '方言見習い',
    description: 'だんだん慣れてきましたね',
  },
  {
    minScore: 2,
    title: '挑戦者',
    description: 'これからです、いっしょに覚えましょう',
  },
  {
    minScore: 0,
    title: 'ようこそ!',
    description: 'まずは何度でも挑戦してみてください',
  },
];

export function getTitle(score: number, total = 10, customTiers?: TitleTier[]): TitleTier {
  const tiers = customTiers && customTiers.length > 0 ? customTiers : DEFAULT_TITLE_TIERS;
  const normalized = total === 10 ? score : Math.round((score / total) * 10);
  return tiers.find((tier) => normalized >= tier.minScore) ?? tiers[tiers.length - 1];
}

export function isPerfectScore(score: number, total: number): boolean {
  return total > 0 && score === total;
}
