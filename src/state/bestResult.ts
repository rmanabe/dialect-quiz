import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BestResult {
  score: number;
  title: string;
}

const keyFor = (prefectureId: string) => `dialect-quiz.best.${prefectureId}`;

function isValidBestResult(value: unknown): value is BestResult {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.score === 'number' && typeof candidate.title === 'string';
}

export async function getBestResult(prefectureId: string): Promise<BestResult | null> {
  try {
    const raw = await AsyncStorage.getItem(keyFor(prefectureId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Guards against stale shapes from an older app version (e.g. pre-i18n-removal).
    return isValidBestResult(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function saveBestResultIfHigher(prefectureId: string, result: BestResult): Promise<void> {
  // The result screen derives its score from a URL param, so a deep link like
  // dialectquizosaka://result?score=abc arrives here as NaN. JSON.stringify
  // turns that into {"score":null}, which the validator then rejects on the
  // way back out — a record that exists but can never be read. Refuse it here
  // instead of writing garbage.
  if (!Number.isFinite(result.score)) return;
  try {
    const existing = await getBestResult(prefectureId);
    if (!existing || result.score > existing.score) {
      await AsyncStorage.setItem(keyFor(prefectureId), JSON.stringify(result));
    }
  } catch {
    // ignore storage errors
  }
}
