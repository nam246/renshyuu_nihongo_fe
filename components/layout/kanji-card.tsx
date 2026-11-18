'use client';

import { AudioButton } from '@/components/entities/audio-button';
import { CopyButton } from '@/components/entities/copy-button';
import { BookmarkedButton } from '@/components/entities/bookmarked-button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Copy, Check, Volume2 } from 'lucide-react';
import { useState } from 'react';

export interface KanjiItem {
	id: string;
	character: string;
	onyomi: string;
	kunyomi: string;
	meaning: string;
	level: string;
	strokeCount?: number;
	examples?: Array<{
		word: string;
		meaning: string;
	}>;
	bookmarked: boolean;
	createdAt?: string;
}

interface KanjiCardProps {
	item: KanjiItem;
}

const KanjiCard = ({ item }: KanjiCardProps) => {
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

	return (
		<Card>
			{/* Header with level and bookmark */}
			<CardHeader className='flex items-start justify-between mb-3'>
				<div className='flex gap-2 items-center'>
					<span
						className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getLevelColor(
							item.level,
						)}`}
					>
						{item.level}
					</span>
					{item.strokeCount && (
						<span className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded'>
							{item.strokeCount} nét
						</span>
					)}
				</div>
				<BookmarkedButton 
					itemId={item.id}
					itemType='kanji'
				/>
			</CardHeader>

			<CardContent>
				{/* Kanji character display */}
				<div className='mb-4 p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg text-center'>
					<div className='flex items-center justify-between'>
						<div className='flex-1'>
							<p className='text-5xl font-bold text-gray-900 mb-2'>{item.character}</p>
							<p className='text-sm text-gray-600'>Ý nghĩa: {item.meaning}</p>
						</div>
						<AudioButton word={item.character} />
					</div>
				</div>

				{/* Onyomi and Kunyomi */}
				<div className='mb-3 pb-3 border-b border-gray-200'>
					<div className='grid grid-cols-2 gap-3'>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>Âm On</p>
							<p className='text-sm font-semibold text-gray-900'>
								{item.onyomi || 'N/A'}
							</p>
						</div>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>Âm Kun</p>
							<p className='text-sm font-semibold text-gray-900'>
								{item.kunyomi || 'N/A'}
							</p>
						</div>
					</div>
				</div>

				{/* Examples if available */}
				{item.examples && item.examples.length > 0 && (
					<div className='mb-3 pb-3 border-b border-gray-200'>
						<p className='text-sm font-medium text-gray-700 mb-2'>
							Từ vựng sử dụng ({item.examples.length})
						</p>
						<div className='space-y-2'>
							{item.examples.slice(0, 2).map((example, idx) => (
								<div
									key={idx}
									className='text-sm p-2 bg-green-50 rounded border border-green-200'
								>
									<p className='font-medium text-gray-900'>{example.word}</p>
									<p className='text-gray-600'>{example.meaning}</p>
								</div>
							))}
							{item.examples.length > 2 && (
								<p className='text-xs text-gray-500'>
									+{item.examples.length - 2} từ khác
								</p>
							)}
						</div>
					</div>
				)}
			</CardContent>

			{/* Actions */}
			<CardFooter className='flex gap-2'>
				<CopyButton character={item.character} />
				<AudioButton word={item.character} />
			</CardFooter>
		</Card>
	);
};

export default KanjiCard;
