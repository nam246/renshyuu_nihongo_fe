'use client';

import { useMemo, useState } from 'react';
import { VocabularyCard } from '@/components/entities';
import VocabularyFilter from './vocabulary-filter';
import { Card } from '@/components/ui/card';
import { BookmarkX } from 'lucide-react';
import { Vocabulary } from '@/types/types';

interface VocabularyListProps {
	items: Vocabulary[];
	loading?: boolean;
	emptyMessage?: string;
	onBookmarkChange?: (id: string, bookmarked: boolean) => void;
}

const VocabularyList = ({
	items,
	emptyMessage = 'Chưa có từ vựng nào được bookmark',
}: VocabularyListProps) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedLevel, setSelectedLevel] = useState('all');
	const [selectedType, setSelectedType] = useState('all');
	const [sortBy, setSortBy] = useState('newest');

	// Filter and sort items
	const filteredAndSortedItems = useMemo(() => {
		let result = [...items];

		// Search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter((item) => {
				return (
					item.word.toLowerCase().includes(query) ||
					// item.kana.toLowerCase().includes(query) ||
					item.romaji.toLowerCase().includes(query) ||
					item.meaning.toLowerCase().includes(query)
				);
			});
		}

		// Level filter
		if (selectedLevel !== 'all') {
			result = result.filter((item) => item.level === selectedLevel);
		}

		// Type filter
		if (selectedType !== 'all') {
			result = result.filter(
				(item) =>
					item.wordType.toLowerCase() === selectedType.toLowerCase() ||
					item.wordType.includes(selectedType),
			);
		}

		// Sorting
		result.sort((a, b) => {
			switch (sortBy) {
				case 'a-z':
					return a.word.localeCompare(b.word);
				case 'z-a':
					return b.word.localeCompare(a.word);
				case 'oldest':
					return (
						new Date(a.createdAt || 0).getTime() -
						new Date(b.createdAt || 0).getTime()
					);
				case 'newest':
				default:
					return (
						new Date(b.createdAt || 0).getTime() -
						new Date(a.createdAt || 0).getTime()
					);
			}
		});

		return result;
	}, [items, searchQuery, selectedLevel, selectedType, sortBy]);

	return (
		<div>
			<VocabularyFilter
				onSearchChange={setSearchQuery}
				onLevelChange={setSelectedLevel}
				onTypeChange={setSelectedType}
				onSortChange={setSortBy}
				totalItems={items.length}
				filteredItems={filteredAndSortedItems.length}
			/>

			{filteredAndSortedItems.length === 0 ? (
				<Card className='p-12 text-center'>
					<BookmarkX className='size-12 mx-auto mb-4' />
					<p className=''>{emptyMessage}</p>
				</Card>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{filteredAndSortedItems.map((item, index) => (
						<VocabularyCard vocabulary={item} key={index} />
					))}
				</div>
			)}

			{/* Show result count */}
			{filteredAndSortedItems.length > 0 && (
				<div className='mt-6 p-4 text-center text-sm'>
					Tổng cộng:{' '}
					<span className='font-semibold'>{filteredAndSortedItems.length}</span> từ
					vựng
				</div>
			)}
		</div>
	);
};

export default VocabularyList;
