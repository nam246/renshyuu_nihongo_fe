export type Lesson = {
	id: string;
	lessonNumber: number;

	grammar: Grammar[] | [];
	level: Level | string;
	source: string;
};

export type Vocabulary = {
	id: string;
	word: string;
	kanji: Kanji | string;
	romaji: string;
	meaning: string;
	wordType: WordType;
	level: Level;
	examples: Example[];
	media?: Media[];
};

export type Grammar = {
	id: string;
	pattern: string;
	structure: string;
	meaning?: string;
	explaination?: string;
	notes: string;
	examples?: Example[] | string;
	level: Level | string;
};
