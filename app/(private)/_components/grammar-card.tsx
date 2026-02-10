'use client';

import { ItemLevelBadge } from '@/components/entities';
import { CopyButton } from '@/components/entities/copy-button';
import { BookmarkedButton } from '@/components/entities/bookmarked-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	Item,
	ItemContent,
	ItemTitle,
	ItemDescription,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Level } from '@/types/types';
import { Bookmark, Copy, Check, BookOpen } from 'lucide-react';
import { useState } from 'react';

export interface GrammarItem {
	id: string;
	pattern: string;
	structure: string;
	meaning: string;
	explanation: string;
	level: Level;
	examples?: Array<{
		japanese: string;
		vietnamese: string;
	}>;
	bookmarked: boolean;
	createdAt?: string;
}

interface GrammarCardProps {
	item: GrammarItem;
	onToggleBookmark?: (id: string) => void;
	onRemove?: (id: string) => void;
}

const GrammarCard = ({
	item,
	onToggleBookmark,
	onRemove,
}: GrammarCardProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
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
			<CardContent className='flex items-start justify-between'>
				<ItemLevelBadge level={item.level} />
				<BookmarkedButton 
					itemId={item.id}
					itemType='grammar'
				/>
			</CardContent>

			{/* Grammar pattern */}
			<CardContent className=''>
				<div className='flex items-start gap-2 mb-1'>
					<BookOpen className='size-5 text-blue-600 mt-1 flex-shrink-0' />
					<div>
						<h3 className='text-lg font-bold'>{item.pattern}</h3>
						<p className='text-sm mt-1'>Ý nghĩa: {item.meaning}</p>
					</div>
				</div>
			</CardContent>

			{/* Structure */}
			<CardContent className=''>
				<p className='text-sm font-medium mb-2'>Cấu trúc:</p>
				<div className='p-2 bg-gray-50 rounded text-sm font-mono text-gray-800 break-words'>
					{item.structure}
				</div>
			</CardContent>

			<Separator />

			{/* Explanation */}
			<CardContent className=''>
				<p className='text-sm font-medium mb-2'>Giải thích:</p>
				<p className='text-sm'>{item.explanation}</p>
			</CardContent>

			{/* Examples if available */}
			{item.examples && item.examples.length > 0 && (
				<CardContent className=''>
					<p className='text-sm font-medium mb-2'>Ví dụ ({item.examples.length})</p>
					<div className='space-y-2'>
						{item.examples.slice(0, 2).map((example, idx) => (
							<Item variant='outline' key={idx} className='text-sm p-2rounded border'>
								<ItemContent>
									<ItemTitle>{example.japanese}</ItemTitle>
									<ItemDescription>{example.vietnamese}</ItemDescription>
								</ItemContent>
							</Item>
						))}
						{item.examples.length > 2 && (
							<p className='text-xs text-gray-500'>
								+{item.examples.length - 2} ví dụ khác
							</p>
						)}
					</div>
				</CardContent>
			)}
			
			<Separator />

			{/* Actions */}
			<CardFooter className='flex gap-2'>
				<CopyButton character={item.pattern} />
			</CardFooter>
		</Card>
	);
};

export default GrammarCard;
