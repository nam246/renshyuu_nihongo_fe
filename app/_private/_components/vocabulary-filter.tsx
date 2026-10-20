'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';
import { useState, useMemo } from 'react';

interface VocabularyFilterProps {
	onSearchChange: (query: string) => void;
	onLevelChange: (level: string) => void;
	onTypeChange: (type: string) => void;
	onSortChange: (sort: string) => void;
	totalItems: number;
	filteredItems: number;
}

const VocabularyFilter = ({
	onSearchChange,
	onLevelChange,
	onTypeChange,
	onSortChange,
	totalItems,
	filteredItems,
}: VocabularyFilterProps) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedLevel, setSelectedLevel] = useState('all');
	const [selectedType, setSelectedType] = useState('all');
	const [selectedSort, setSelectedSort] = useState('newest');
	const [isOpen, setIsOpen] = useState(false);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);
		onSearchChange(value);
	};

	const handleLevelChange = (level: string) => {
		setSelectedLevel(level);
		onLevelChange(level);
	};

	const handleTypeChange = (type: string) => {
		setSelectedType(type);
		onTypeChange(type);
	};

	const handleSortChange = (sort: string) => {
		setSelectedSort(sort);
		onSortChange(sort);
	};

	const hasFilters =
		searchQuery || selectedLevel !== 'all' || selectedType !== 'all';

	const handleClearFilters = () => {
		setSearchQuery('');
		setSelectedLevel('all');
		setSelectedType('all');
		onSearchChange('');
		onLevelChange('all');
		onTypeChange('all');
	};

	return (
		<Card className='p-4 mb-6'>
			{/* Search bar */}
			<div className='flex gap-2 mb-4'>
				<div className='flex-1 relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5' />
					<Input
						type='text'
						placeholder='Tìm kiếm từ vựng (tiếng Nhật, romaji, ý nghĩa)...'
						value={searchQuery}
						onChange={handleSearchChange}
						className='w-full pl-10 pr-4 py-2'
					/>
				</div>
				<Button onClick={() => setIsOpen(!isOpen)}>
					<Filter className='size-5' />
					<span className='hidden sm:inline'>Lọc</span>
				</Button>
			</div>

			{/* Expanded filter panel */}
			{isOpen && (
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200'>
					{/* Level filter */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Trình độ
						</label>
						<select
							value={selectedLevel}
							onChange={(e) => handleLevelChange(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							<option value='all'>Tất cả</option>
							<option value='N5'>N5</option>
							<option value='N4'>N4</option>
							<option value='N3'>N3</option>
							<option value='N2'>N2</option>
							<option value='N1'>N1</option>
						</select>
					</div>

					{/* Word type filter */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Loại từ
						</label>
						<select
							value={selectedType}
							onChange={(e) => handleTypeChange(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							<option value='all'>Tất cả</option>
							<option value='noun'>Danh từ</option>
							<option value='verb'>Động từ</option>
							<option value='adjective'>Tính từ</option>
							<option value='adverb'>Trạng từ</option>
							<option value='other'>Khác</option>
						</select>
					</div>

					{/* Sort option */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Sắp xếp
						</label>
						<select
							value={selectedSort}
							onChange={(e) => handleSortChange(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							<option value='newest'>Mới nhất</option>
							<option value='oldest'>Cũ nhất</option>
							<option value='a-z'>A - Z</option>
							<option value='z-a'>Z - A</option>
						</select>
					</div>
				</div>
			)}

			{/* Filter status and clear button */}
			<div className='flex items-center justify-between pt-4 border-t border-gray-200'>
				<p className='text-sm text-gray-600'>
					Hiển thị{' '}
					<span className='font-semibold text-gray-900'>{filteredItems}</span> trên{' '}
					<span className='font-semibold text-gray-900'>{totalItems}</span> từ
				</p>
				{hasFilters && (
					<button
						onClick={handleClearFilters}
						className='flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
					>
						<X className='size-4' />
						Xóa lọc
					</button>
				)}
			</div>
		</Card>
	);
};

export default VocabularyFilter;
