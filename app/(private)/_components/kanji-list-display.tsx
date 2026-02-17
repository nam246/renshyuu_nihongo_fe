'use client';

import { useMemo, useState } from 'react';
// import KanjiCard, { KanjiItem } from './kanji-card';
import { KanjiCard } from '@/components/entities';
import KanjiFilter from './kanji-filter';
import { Card } from '@/components/ui/card';
import { BookmarkX } from 'lucide-react';
import { Kanji } from '@/types/types';

interface KanjiListProps {
	items: Kanji[];
	emptyMessage?: string;
}

const KanjiListDisplay = ({
	items,
	emptyMessage = 'Chưa có kanji nào được bookmark',
}: KanjiListProps) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedLevel, setSelectedLevel] = useState('all');
	const [sortBy, setSortBy] = useState('newest');

	// Filter and sort items
	const filteredAndSortedItems = useMemo(() => {
		let result = [...items];

		// Search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter((item) => {
				return (
					item.character.toLowerCase().includes(query) ||
					item.onyomi?.toLowerCase().includes(query) ||
					item.kunyomi?.toLowerCase().includes(query) ||
					item.meaning.toLowerCase().includes(query)
				);
			});
		}

		// Level filter
		if (selectedLevel !== 'all') {
			result = result.filter((item) => item.level === selectedLevel);
		}

		// Sorting
		result.sort((a, b) => {
			switch (sortBy) {
				case 'a-z':
					return a.character.localeCompare(b.character);
				case 'z-a':
					return b.character.localeCompare(a.character);
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
	}, [items, searchQuery, selectedLevel, sortBy]);

	return (
		<div>
			<KanjiFilter
				onSearchChange={setSearchQuery}
				onLevelChange={setSelectedLevel}
				onSortChange={setSortBy}
				totalItems={items.length}
				filteredItems={filteredAndSortedItems.length}
			/>

			{filteredAndSortedItems.length === 0 ? (
				<Card className='p-12 text-center'>
					<BookmarkX className='size-12 text-gray-300 mx-auto mb-4' />
					<p className='text-gray-600'>{emptyMessage}</p>
				</Card>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{filteredAndSortedItems.map((item) => (
						<KanjiCard key={item.id} kanji={item} />
					))}
				</div>
			)}

			{/* Show result count */}
			{filteredAndSortedItems.length > 0 && (
				<div className='mt-6 p-4 text-center text-sm text-gray-600'>
					Tổng cộng:{' '}
					<span className='font-semibold'>{filteredAndSortedItems.length}</span>{' '}
					kanji
				</div>
			)}
		</div>
	);
};

export default KanjiListDisplay;
