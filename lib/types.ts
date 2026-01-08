export type Lesson = {
	id: string;
	lessonTitle: string;
	level: Level;
	source: Source;
	createdAt: string;
	updatedAt: string;
};

export type Vocabulary = {
	id: string;
	word: string;
	romaji: string;
	meaning: string;
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
	title: string;
	description: string;
};

export enum Level {
	N5 = 'n5',
	N4 = 'n4',
	N3 = 'n3',
	N2 = 'n2',
	N1 = 'n1',
}

export enum WordType {
	NOUN = 'noun',
	VERB = 'verb',
	ADJECTIVE = 'adjective',
}

export enum Source {
	MINNA_NO_NIHONGO = 'Minna no Nihongo',
	SOUMATOME = 'Soumatome',
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
