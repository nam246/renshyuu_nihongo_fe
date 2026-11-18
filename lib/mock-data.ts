import {
	Grammar,
	Kanji,
	Lesson,
	Level,
	Source,
	Vocabulary,
	WordType,
} from '@/types/types';

const createdAt = '2026-01-01T00:00:00.000Z';

export const mockVocabularies: Vocabulary[] = [
	{
		id: 'mock-vocab-n5-1',
		word: '学校',
		romaji: 'gakkou',
		meaning: 'trường học',
		source: Source.MINNA_NO_NIHONGO,
		wordType: WordType.NOUN,
		level: Level.N5,
		kanjiId: ['mock-kanji-n5-1'],
		examples: [
			{
				id: 'mock-example-v1',
				title: '学校へ行きます。',
				description: 'Tôi đi đến trường.',
			},
		],
		mediaId: [],
		lessonId: 'mock-lesson-n5-1',
		createdAt,
		updatedAt: createdAt,
	},
	{
		id: 'mock-vocab-n5-2',
		word: '食べる',
		romaji: 'taberu',
		meaning: 'ăn',
		source: Source.MINNA_NO_NIHONGO,
		wordType: WordType.VERB,
		level: Level.N5,
		kanjiId: [],
		examples: [
			{
				id: 'mock-example-v2',
				title: 'りんごを食べます。',
				description: 'Tôi ăn táo.',
			},
		],
		mediaId: [],
		lessonId: 'mock-lesson-n5-1',
		createdAt,
		updatedAt: createdAt,
	},
	{
		id: 'mock-vocab-n4-1',
		word: '旅行',
		romaji: 'ryokou',
		meaning: 'du lịch',
		source: Source.MINNA_NO_NIHONGO,
		wordType: WordType.NOUN,
		level: Level.N4,
		kanjiId: [],
		examples: [
			{
				id: 'mock-example-v3',
				title: '日本を旅行します。',
				description: 'Tôi đi du lịch Nhật Bản.',
			},
		],
		mediaId: [],
		lessonId: 'mock-lesson-n4-1',
		createdAt,
		updatedAt: createdAt,
	},
];

export const mockGrammars: Grammar[] = [
	{
		id: 'mock-grammar-n5-1',
		pattern: 'N は N です',
		structure: 'Danh từ 1 は Danh từ 2 です',
		meaning: 'A là B',
		explanation: 'Mẫu câu dùng để giới thiệu hoặc xác định một sự vật.',
		notes: 'は được đọc là wa trong mẫu câu này.',
		source: Source.MINNA_NO_NIHONGO,
		level: Level.N5,
		examples: [
			{
				id: 'mock-example-g1',
				title: 'わたしは学生です。',
				description: 'Tôi là học sinh.',
			},
		],
		lessonId: 'mock-lesson-n5-1',
		createdAt: new Date(createdAt),
		updatedAt: new Date(createdAt),
	},
	{
		id: 'mock-grammar-n4-1',
		pattern: 'Vたことがあります',
		structure: 'Động từ thể た + ことがあります',
		meaning: 'Đã từng làm gì',
		explanation: 'Dùng để nói về một trải nghiệm đã có trong quá khứ.',
		notes: 'Không dùng cho một hành động vừa mới xảy ra.',
		source: Source.MINNA_NO_NIHONGO,
		level: Level.N4,
		examples: [
			{
				id: 'mock-example-g2',
				title: '日本へ行ったことがあります。',
				description: 'Tôi đã từng đến Nhật Bản.',
			},
		],
		lessonId: 'mock-lesson-n4-1',
		createdAt: new Date(createdAt),
		updatedAt: new Date(createdAt),
	},
];

export const mockKanjis: Kanji[] = [
	{
		id: 'mock-kanji-n5-1',
		character: '学',
		onyomi: 'ガク',
		kunyomi: 'まな.ぶ',
		meaning: 'học',
		source: Source.MINNA_NO_NIHONGO,
		level: Level.N5,
		strokeCount: 8,
		examples: [
			{ id: 'mock-example-k1', title: '学生', description: 'がくせい — học sinh' },
		],
		lessonId: 'mock-lesson-n5-1',
		createdAt,
		updatedAt: createdAt,
	},
	{
		id: 'mock-kanji-n4-1',
		character: '旅',
		onyomi: 'リョ',
		kunyomi: 'たび',
		meaning: 'du lịch, chuyến đi',
		source: Source.MINNA_NO_NIHONGO,
		level: Level.N4,
		strokeCount: 10,
		examples: [
			{ id: 'mock-example-k2', title: '旅行', description: 'りょこう — du lịch' },
		],
		lessonId: 'mock-lesson-n4-1',
		createdAt,
		updatedAt: createdAt,
	},
];

export const mockLessons: Lesson[] = [
	{
		id: 'mock-lesson-n5-1',
		lessonTitle: 'Giới thiệu bản thân và trường học',
		level: Level.N5,
		source: Source.MINNA_NO_NIHONGO,
		grammars: mockGrammars.filter((item) => item.level === Level.N5),
		vocabularies: mockVocabularies.filter((item) => item.level === Level.N5),
		kanjis: mockKanjis.filter((item) => item.level === Level.N5),
		createdAt: new Date(createdAt),
		updateAt: new Date(createdAt),
	},
	{
		id: 'mock-lesson-n4-1',
		lessonTitle: 'Kể về trải nghiệm du lịch',
		level: Level.N4,
		source: Source.MINNA_NO_NIHONGO,
		grammars: mockGrammars.filter((item) => item.level === Level.N4),
		vocabularies: mockVocabularies.filter((item) => item.level === Level.N4),
		kanjis: mockKanjis.filter((item) => item.level === Level.N4),
		createdAt: new Date(createdAt),
		updateAt: new Date(createdAt),
	},
];

export function getMockDashboardStats() {
	return {
		learningStats: {
			lessonsCompleted: 3,
			vocabularyLearned: 24,
			grammarPatterns: 8,
			totalLessons: 12,
			totalVocab: 120,
			totalGrammar: 36,
		},
		progressLevels: [
			{ level: 'N5', total: 12, completed: 3 },
			{ level: 'N4', total: 10, completed: 0 },
			{ level: 'N3', total: 8, completed: 0 },
			{ level: 'N2', total: 6, completed: 0 },
			{ level: 'N1', total: 4, completed: 0 },
		],
		recentLessons: mockLessons.map((lesson) => ({
			id: lesson.id,
			title: lesson.lessonTitle,
			level: lesson.level,
			lastStudied: createdAt,
			status: 'in-progress' as const,
			progress: 25,
		})),
		weeklyActivity: [
			{ day: 'T2', lessons: 1, vocabulary: 5, grammar: 1 },
			{ day: 'T3', lessons: 0, vocabulary: 3, grammar: 1 },
			{ day: 'T4', lessons: 1, vocabulary: 4, grammar: 0 },
			{ day: 'T5', lessons: 0, vocabulary: 2, grammar: 1 },
			{ day: 'T6', lessons: 1, vocabulary: 6, grammar: 2 },
			{ day: 'T7', lessons: 0, vocabulary: 4, grammar: 1 },
			{ day: 'CN', lessons: 0, vocabulary: 0, grammar: 0 },
		],
	};
}
