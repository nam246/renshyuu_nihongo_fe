'use client';

import Link from 'next/link';
import {
	Bookmark,
	ChevronRight,
	AudioLines,
	Volume2,
	Copy,
	Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemHeader,
	ItemTitle,
	ItemGroup,
} from '@/components/ui/item';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export interface VocabularyItem {
	id: string;
	word: string;
	kana: string;
	romaji: string;
	meaning: string;
	wordType: string;
	level: string;
	example?: string;
	bookmarked: boolean;
	createdAt?: string;
}

interface VocabularyCardProps {
	item: VocabularyItem;
	onToggleBookmark?: (id: string) => void;
	onRemove?: (id: string) => void;
}

const VocabularyCard = ({
	item,
	onToggleBookmark,
	onRemove,
}: VocabularyCardProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleSpeak = (text: string) => {
		if ('speechSynthesis' in window) {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = 'ja-JP';
			speechSynthesis.speak(utterance);
		}
	};

	const getLevelColor = (level: string) => {
		switch (level) {
			case 'N5':
				return 'bg-blue-100 text-blue-800';
			case 'N4':
				return 'bg-green-100 text-green-800';
			case 'N3':
				return 'bg-yellow-100 text-yellow-800';
			case 'N2':
				return 'bg-orange-100 text-orange-800';
			case 'N1':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const getWordTypeColor = (type: string) => {
		switch (type) {
			case 'danh từ':
			case 'noun':
				return 'text-purple-600';
			case 'động từ':
			case 'verb':
				return 'text-blue-600';
			case 'tính từ':
			case 'adjective':
				return 'text-green-600';
			default:
				return 'text-gray-600';
		}
	};

	return (
		<>
			<Item variant='outline'>
				<ItemHeader>
					<div className='flex gap-2'>
						<Badge
							className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getLevelColor(
								item.level,
							)}`}
						>
							{item.level}
						</Badge>
						<Badge
							className={`inline-block px-2 py-1 rounded text-xs font-medium ${getWordTypeColor(
									item.wordType,
								)}`}
						>
							{item.wordType.toLowerCase()}
						</Badge>
					</div>
					<ItemActions>
						<Button
							variant={'outline'}
							onClick={() => {
								onToggleBookmark?.(item.id);
								onRemove?.(item.id);
							}}
							className='hover:bg-gray-100 rounded-lg transition-colors'
							title={item.bookmarked ? 'Bỏ bookmark' : 'Thêm bookmark'}
						>
							{item.bookmarked ? (
								<Bookmark className='fill-yellow-400 text-yellow-500' />
							) : (
								<Bookmark className='text-gray-400' />
							)}
						</Button>
					</ItemActions>
				</ItemHeader>
				<ItemContent>
					<ItemTitle className='font-bold text-xl'>
						{item.word}
						<Button variant='ghost' size='sm' onClick={() => handleSpeak(item.word)}>
							<AudioLines />
						</Button>
					</ItemTitle>

					<ItemDescription>
						{/* Nên thêm cách đọc bằng hiragana katakana */}
						{item.romaji}
					</ItemDescription>

					<div>Ý nghĩa: {item.meaning}</div>
				</ItemContent>
				<ItemFooter>
					<Link
						className='text-slate-400 hover:text-blue-500 hover:translate-x-1 transition-all flex items-center'
						href={`vocabulary/${item.id}`}
					>
						Xem chi tiết <ChevronRight />
					</Link>
				</ItemFooter>
			</Item>
		</>
	);
};

export default VocabularyCard;
