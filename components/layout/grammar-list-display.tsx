'use client';

import { useCallback, useMemo, useState } from 'react';
import GrammarCard from './grammar-card';
import GrammarFilter from './grammar-filter';
import { Card } from '@/components/ui/card';
import { BookmarkX, Loader2 } from 'lucide-react';
import { Grammar } from '@/types/types';

interface GrammarListProps {
	items: Grammar[];
	emptyMessage?: string;
}

const GrammarListDisplay = ({
	items,
	emptyMessage = 'Chưa có ngữ pháp nào được bookmark',
}: GrammarListProps) => {
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
					item.pattern.toLowerCase().includes(query) ||
					item.structure.toLowerCase().includes(query) ||
					item.meaning?.toLowerCase().includes(query) ||
					item.explanation?.toLowerCase().includes(query)
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
					return a.pattern.localeCompare(b.pattern);
				case 'z-a':
					return b.pattern.localeCompare(a.pattern);
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

	// if (loading) {
	// 	return (
	// 		<div className='flex items-center justify-center py-12'>
	// 			<Loader2 className='size-8 text-blue-600 animate-spin' />
	// 		</div>
	// 	);
	// }

	return (
		<div>
			<GrammarFilter
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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{filteredAndSortedItems.map((item) => (
						<GrammarCard key={item.id} item={item} />
					))}
				</div>
			)}

			{/* Show result count */}
			{filteredAndSortedItems.length > 0 && (
				<div className='mt-6 p-4 text-center text-sm text-gray-600'>
					Tổng cộng:{' '}
					<span className='font-semibold'>{filteredAndSortedItems.length}</span> ngữ
					pháp
				</div>
			)}
		</div>
	);
};

export default GrammarListDisplay;
