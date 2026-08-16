import { buildQuiz } from '../quiz/engine';
import { getQuestionBank } from '../quiz/questionBank';
import { startSession } from './quizSession';

export function startNewQuiz(prefectureId: string, count = 10): void {
  const bank = getQuestionBank(prefectureId);
  const items = buildQuiz(bank, count);
  startSession(items);
}
