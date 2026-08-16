import type { QuizAnswer, QuizItem } from '../quiz/types';

interface QuizSession {
  items: QuizItem[];
  answers: QuizAnswer[];
}

let session: QuizSession | null = null;

export function startSession(items: QuizItem[]): void {
  session = { items, answers: [] };
}

export function getSession(): QuizSession | null {
  return session;
}

export function recordAnswer(item: QuizItem, selectedIndex: number): void {
  session?.answers.push({ item, selectedIndex });
}

export function computeScore(): number {
  if (!session) return 0;
  return session.answers.filter((a) => a.selectedIndex === a.item.correctIndex).length;
}

export function clearSession(): void {
  session = null;
}
