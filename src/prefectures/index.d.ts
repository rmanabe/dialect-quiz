import type { PrefectureConfig } from './types';

export function getActivePrefectureId(): string;
export function getPrefectureConfig(id?: string): PrefectureConfig;
export const registry: Record<string, PrefectureConfig>;
