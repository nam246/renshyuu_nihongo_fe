export type Lesson = {
  id: string;
  lessonNumber: number;
  level: Level;
  source: string;
};

export type Vocabulary = {
  id: string;
  word: string;
  romaji: string;
  meaning: string;
  wordType: WordType;
  level: Level;
  kanjiId: string[];
  exampleId: string[];
  mediaId: string[];
  lessonId?: string;
};

export type Grammar = {
  id: string;
  pattern: string;
  structure: string;
  meaning?: string;
  explaination?: string;
  notes: string;
  level: Level;
  exampleId: string[];
  lessonId?: string;
};

export type Kanji = {
  id: string;
  character: string;
  onyomi?: string;
  kunyomi?: string;
  meaning: string;
  level: Level;
  strokeCount?: number;
  exampleId?: string[];
  lessonId?: string;
};

export type Example = {
  id: string;
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
