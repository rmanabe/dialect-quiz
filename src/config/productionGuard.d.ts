export interface ProductionConfigInput {
  prefectureId: string;
  revenueCat: { apiKeyIos?: string; apiKeyAndroid?: string };
  env: Record<string, string | undefined>;
}

/** Human-readable problems; empty means the build is safe to cut. */
export function findProductionConfigProblems(input: ProductionConfigInput): string[];

export function productionConfigErrorMessage(prefectureId: string, problems: string[]): string;
