export type Lesson = {
	id: string;
	lessonTitle: string;
	level: Level;
	source: Source;
	grammars: Grammar[];
	vocabularies: Vocabulary[];
	kanjis: Kanji[];
	createdAt: Date;
	updateAt: Date;
};

export type Vocabulary = {
	id: string;
	word: string;
	romaji: string;
	meaning: string;
	source: Source;
	wordType: WordType;
	level: Level;
	kanjiId: string[];
	examples: Example[];
	mediaId: string[];
	lessonId?: string;
	createdAt: string;
	updatedAt: string;
};

export type Grammar = {
	id: string;
	pattern: string;
	structure: string;
	meaning?: string;
	explaination?: string;
	notes: string;
	source: Source;
	level: Level;
	examples: Example[];
	lessonId?: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Kanji = {
	id: string;
	character: string;
	onyomi?: string;
	kunyomi?: string;
	meaning: string;
	source: Source;
	level: Level;
	strokeCount?: number;
	examples: Example[];
	lessonId?: string;
	createdAt: string;
	updatedAt: string;
};

export type Example = {
	id: string;
	title: string;
	description: string;
};

export type Flashcard = {
	id: string;
	front: string;
	reading?: string;
	meaning: string;
	example?: string;
	exampleMeaning?: string;
};

export type Deck = {
	id: string;
	title: string;
	description: string;
	level: Level;
	type: 'Vocabulary' | 'Kanji' | 'Grammar';
	count: number;
	cards: Flashcard[];
};

export enum Level {
	N5 = 'N5',
	N4 = 'N4',
	N3 = 'N3',
	N2 = 'N2',
	N1 = 'N1',
}

export enum WordType {
	NOUN = 'noun',
	VERB = 'verb',
	I_ADJECTIVE = 'I_ADJECTIVE',
	NA_ADJECTIVE = 'NA_ADJECTIVE',
	ADVERB = 'ADVERB',
	PARTICLE = 'PARTICLE',
	CONJUNCTION = 'CONJUNCTION',
	PRONOUN = 'PRONOUN',
	EXPRESSION = 'EXPRESSION',
	COUNTER = 'COUNTER',
	OTHER = 'OTHER',
}

export enum Source {
	MINNA_NO_NIHONGO = 'Minna no Nihongo',
	SOUMATOME = 'Soumatome',
	TRY = 'Try',
	OTHER = 'Orther',
}

export enum VocabularyPracticeContent {
	KANJI_READING = 'kanji_reading', // Cách đọc Kanji
	HIRAGANA_READING = 'hiragana_reading', // Cách đọc Hiragana
	WORD_EXPRESSIONS = 'word_expressions', // Biểu hiện từ
	SYNONYMS = 'synonyms', // Từ đồng nghĩa
}

export enum GrammarPracticeContent {
	GRAMMAR_PATTERNS = 'grammar_patterns', // Dạng ngữ pháp
	SENTENCE_FORMATION = 'sentence_formation', // Thành lập câu
	CONTEXT_GRAMMAR = 'context_grammar', // Ngữ pháp theo đoạn văn
}

export enum ReadingPracticeContent {
	SHORT_PASSAGE = 'short_passage', // Đoạn văn ngắn
	MEDIUM_PASSAGE = 'medium_passage', // Đoạn văn trung bình
	INFORMATION_SEARCH = 'information_search', // Tìm thông tin
}

export enum ListeningContentType {
	TOPIC_COMPREHENSION = 'topic_comprehension', // Nghe hiểu chủ đề
	MAIN_IDEA_COMPREHENSION = 'main_idea_comprehension', // Nghe hiểu điểm chính
	EXPRESSION_COMPREHENSION = 'expression_comprehension', // Nghe hiểu diễn đạt
	QUICK_RESPONSE = 'quick_response', // Trả lời nhanh
}

export type Bookmarked = {
	id: string;
	userId: string;
	vocabulary: Vocabulary;
	grammar: Grammar;
	kanji: Kanji;
	createdAt: Date;
};
