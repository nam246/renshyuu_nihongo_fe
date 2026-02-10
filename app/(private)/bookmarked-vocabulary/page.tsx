'use client';

import { useState, useEffect } from 'react';
import VocabularyListDisplay from '../_components/vocabulary-list-display';
import { VocabularyItem } from '../_components/vocabulary-card';
import { BookmarkIcon } from 'lucide-react';
import PageHeader from '@/components/layout/page-header';

// Mock data - bookmarked vocabulary items
const MOCK_BOOKMARKED_VOCABULARY: VocabularyItem[] = [
	{
		id: '1',
		word: '日本',
		kana: 'にほん',
		romaji: 'nihon',
		meaning: 'Nhật Bản',
		wordType: 'noun',
		level: 'N5',
		example: '私は日本に住んでいます。(Tôi sống ở Nhật Bản)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
	},
	{
		id: '2',
		word: '学ぶ',
		kana: 'まなぶ',
		romaji: 'manabu',
		meaning: 'Học',
		wordType: 'verb',
		level: 'N5',
		example: '毎日日本語を学んでいます。(Tôi học tiếng Nhật mỗi ngày)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
	},
	{
		id: '3',
		word: '食べる',
		kana: 'たべる',
		romaji: 'taberu',
		meaning: 'Ăn',
		wordType: 'verb',
		level: 'N5',
		example: 'ご飯を食べます。(Tôi ăn cơm)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
	},
	{
		id: '4',
		word: '友達',
		kana: 'ともだち',
		romaji: 'tomodachi',
		meaning: 'Bạn bè',
		wordType: 'noun',
		level: 'N5',
		example: '友達と遊びます。(Chơi với bạn bè)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
	},
	{
		id: '5',
		word: '読む',
		kana: 'よむ',
		romaji: 'yomu',
		meaning: 'Đọc',
		wordType: 'verb',
		level: 'N5',
		example: '新聞を読みます。(Tôi đọc báo)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
	},
	{
		id: '6',
		word: '美しい',
		kana: 'うつくしい',
		romaji: 'utsukushii',
		meaning: 'Đẹp',
		wordType: 'adjective',
		level: 'N4',
		example: '美しい花があります。(Có những bông hoa đẹp)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
	},
	{
		id: '7',
		word: '大切',
		kana: 'たいせつ',
		romaji: 'taisetsu',
		meaning: 'Quan trọng',
		wordType: 'adjective',
		level: 'N4',
		example: '時間は大切です。(Thời gian là quan trọng)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
	},
	{
		id: '8',
		word: '仕事',
		kana: 'しごと',
		romaji: 'shigoto',
		meaning: 'Công việc',
		wordType: 'noun',
		level: 'N4',
		example: '朝仕事に行きます。(Sáng tôi đi làm)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
	},
	{
		id: '9',
		word: '考える',
		kana: 'かんがえる',
		romaji: 'kangaeru',
		meaning: 'Suy nghĩ',
		wordType: 'verb',
		level: 'N4',
		example: 'これについて考えます。(Tôi suy nghĩ về điều này)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
	},
	{
		id: '10',
		word: '説明する',
		kana: 'せつめいする',
		romaji: 'setsumei suru',
		meaning: 'Giải thích',
		wordType: 'verb',
		level: 'N3',
		example: '先生が文法を説明します。(Giáo viên giải thích ngữ pháp)',
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
	},
];

export default function BookmarkedVocabularyPage() {
	const [bookmarkedVocab, setBookmarkedVocab] = useState<VocabularyItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate API call
		const timer = setTimeout(() => {
			setBookmarkedVocab(MOCK_BOOKMARKED_VOCABULARY);
			setLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	const handleBookmarkChange = (id: string, bookmarked: boolean) => {
		setBookmarkedVocab((prev) =>
			prev.map((item) => (item.id === id ? { ...item, bookmarked } : item)),
		);
	};

	return (
		<div>
			<PageHeader
				title='Từ vựng đã bookmark'
				description='Quản lý và ôn tập những từ vựng bạn đã đánh dấu'
			/>

			<VocabularyListDisplay
				items={bookmarkedVocab}
				loading={loading}
				emptyMessage='Chưa có từ vựng nào được bookmark. Hãy bookmark những từ bạn muốn ôn tập!'
				onBookmarkChange={handleBookmarkChange}
			/>
		</div>
	);
}
