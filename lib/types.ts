export type Lesson = {
  id: string;
  lessonNumber: number;

  grammar: Grammar[] | [];
  level: Level;
  source: string;
};

export type Vocabulary = {
  id: string;
  word: string;
  kanji: string;
  romaji: string;
  meaning: string;
  wordType: WordType;
  level: Level;
  examples: Example[];
  media?: [];
  // lessonId: string;
};

export type Grammar = {
  id: string;
  pattern: string;
  structure: string;
  meaning?: string;
  explaination?: string;
  notes: string;
  examples: Example[];
  level: Level;
  // lessonId: string;
};

export type Example = {
  japanese: string;
  romaji: string;
  vietnamese: string;
  explanation: string;
};

export enum Level {
  N5 = "n5",
  N4 = "n4",
  N3 = "n3",
  N2 = "n2",
  N1 = "n1",
}

export enum WordType {
  NOUN = "noun",
  VERB = "verb",
  ADJECTIVE = "adjective",
}
