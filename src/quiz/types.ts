export interface RawQuestion {
  id: number;
  word: string;
  meaning_ja: string;
}

export interface QuizItem {
  id: number;
  word: string;
  choices: string[];
  correctIndex: number;
}

export interface QuizAnswer {
  item: QuizItem;
  selectedIndex: number;
}

export interface TitleTier {
  minScore: number;
  title: string;
  description: string;
}
