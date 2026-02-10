'use client';

import { useState, useEffect } from 'react';
import KanjiListDisplay from '../_components/kanji-list-display';
import { KanjiItem } from '../_components/kanji-card';
import { Languages } from 'lucide-react';
import PageHeader from '@/components/layout/page-header';

// Mock data - bookmarked kanji items
const MOCK_BOOKMARKED_KANJI: KanjiItem[] = [
	{
		id: '1',
		character: '学',
		onyomi: 'ガク',
		kunyomi: 'まな',
		meaning: 'Học',
		level: 'N5',
		strokeCount: 8,
		examples: [
			{
				word: '勉強',
				meaning: 'Học tập',
			},
			{
				word: '学校',
				meaning: 'Trường học',
			},
		],
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
	},
	{
		id: '2',
		character: '食',
		onyomi: 'ショク、ジキ',
		kunyomi: 'たべ、くら',
		meaning: 'Ăn',
		level: 'N5',
		strokeCount: 9,
		examples: [
			{
				word: '食べる',
				meaning: 'Ăn',
			},
			{
				word: '食事',
				meaning: 'Bữa ăn',
			},
		],
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
	},
	{
		id: '3',
		character: '日',
		onyomi: 'ニチ、ジツ',
		kunyomi: 'ひ、か',
		meaning: 'Ngày, mặt trời',
		level: 'N5',
		strokeCount: 4,
		examples: [
			{
				word: '毎日',
				meaning: 'Mỗi ngày',
			},
			{
				word: '日本',
				meaning: 'Nhật Bản',
			},
		],
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
	},
	{
		id: '4',
		character: '本',
		onyomi: 'ホン',
		kunyomi: 'もと',
		meaning: 'Sách, gốc',
		level: 'N5',
		strokeCount: 5,
		examples: [
			{
				word: '本',
				meaning: 'Sách',
			},
			{
				word: '日本',
				meaning: 'Nhật Bản',
			},
		],
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
	},
	{
		id: '5',
		character: '人',
		onyomi: 'ジン、ニン',
		kunyomi: 'ひと',
		meaning: 'Người',
		level: 'N5',
		strokeCount: 2,
		examples: [
			{
				word: '人',
				meaning: 'Người',
			},
			{
				word: '大人',
				meaning: 'Người lớn',
			},
		],
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
	},
	{
		id: '6',
		character: '水',
		onyomi: 'スイ',
		kunyomi: 'みず',
		meaning: 'Nước',
		level: 'N5',
		strokeCount: 4,
		examples: [
			{
				word: '水',
				meaning: 'Nước',
			},
			{
				word: '水曜日',
				meaning: 'Thứ tư',
			},
		],
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
	},
	{
		id: '7',
		character: '火',
		onyomi: 'カ',
		kunyomi: 'ひ',
		meaning: 'Lửa',
		level: 'N5',
		strokeCount: 4,
		examples: [
			{
				word: '火',
				meaning: 'Lửa',
			},
			{
				word: '火曜日',
				meaning: 'Thứ ba',
			},
		],
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
	},
	{
		id: '8',
		character: '木',
		onyomi: 'モク',
		kunyomi: 'き',
		meaning: 'Cây gỗ',
		level: 'N5',
		strokeCount: 4,
		examples: [
			{
				word: '木',
				meaning: 'Cây',
			},
			{
				word: '木曜日',
				meaning: 'Thứ năm',
			},
		],
		bookmarked: true,
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
	},
];

export default function BookmarkedKanjiPage() {
	const [bookmarkedKanji, setBookmarkedKanji] = useState<KanjiItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate API call
		const timer = setTimeout(() => {
			setBookmarkedKanji(MOCK_BOOKMARKED_KANJI);
			setLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	const handleBookmarkChange = (id: string, bookmarked: boolean) => {
		setBookmarkedKanji((prev) =>
			prev.map((item) => (item.id === id ? { ...item, bookmarked } : item)),
		);
	};

	return (
		<div>
			<PageHeader
				title='Kanji đã bookmark'
				description='Quản lý và ôn tập những ký tự Kanji bạn đã đánh dấu'
			/>

			<KanjiListDisplay
				items={bookmarkedKanji}
				loading={loading}
				emptyMessage='Chưa có kanji nào được bookmark. Hãy bookmark những ký tự bạn muốn ôn tập!'
				onBookmarkChange={handleBookmarkChange}
			/>
		</div>
	);
}
