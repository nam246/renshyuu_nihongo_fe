'use client';

import { Kanji } from '@/types/types';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemHeader,
	ItemTitle,
} from '@/components/ui/item';

import { ItemLevelBadge } from './item-level-badge';
import { BookmarkedButton } from './bookmarked-button';
import { CopyButton } from './copy-button';
import { AudioButton } from './audio-button';
import { BookOpen, Volume2 } from 'lucide-react';
import { ExampleItem } from './example-item';
// import DetailsNotFound from '../../../_components/details-not-found';
// import Examples from '../../../_components/examples';
// import DetailsHeader from '../../../_components/details-header';

export function KanjiCard({ kanji }: { kanji: Kanji }) {
	return (
		<Card>
			{/* Header with level and bookmark */}
			<CardHeader className='flex items-start justify-between mb-3'>
				<div className='flex gap-2 items-center'>
					<ItemLevelBadge level={kanji.level} />
					{kanji.strokeCount && (
						<span className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded'>
							{kanji.strokeCount} nét
						</span>
					)}
				</div>
				<BookmarkedButton 
					itemId={kanji.id}
					itemType='kanji'
				/>
			</CardHeader>

			<CardContent>
				{/* Kanji character display */}
				<div className='mb-4 p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg text-center'>
					<div className='flex kanjis-center justify-between'>
						<div className='flex-1'>
							<p className='text-5xl font-bold text-gray-900 mb-2'>
								{kanji.character}
							</p>
							<p className='text-sm text-gray-600'>Ý nghĩa: {kanji.meaning}</p>
						</div>
					</div>
				</div>

				{/* Onyomi and Kunyomi */}
				<div className='mb-3 pb-3 border-b border-gray-200'>
					<div className='grid grid-cols-2 gap-3'>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>Âm On</p>
							<p className='text-sm font-semibold text-gray-900'>
								{kanji.onyomi || 'N/A'}
							</p>
						</div>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>Âm Kun</p>
							<p className='text-sm font-semibold text-gray-900'>
								{kanji.kunyomi || 'N/A'}
							</p>
						</div>
					</div>
				</div>

				{/* Examples if available */}
				{kanji.examples && kanji.examples.length > 0 && (
					<div className='mb-3 pb-3 border-b border-gray-200'>
						<p className='text-sm font-medium text-gray-700 mb-2'>
							Từ vựng sử dụng ({kanji.examples.length})
						</p>
						<div className='space-y-2'>
							{kanji.examples.slice(0, 2).map((example, idx) => (
								<div
									key={idx}
									className='text-sm p-2 bg-green-50 rounded border border-green-200'
								>
									<p className='font-medium text-gray-900'>{example.title}</p>
									<p className='text-gray-600'>{example.description}</p>
								</div>
							))}
							{kanji.examples.length > 2 && (
								<p className='text-xs text-gray-500'>
									+{kanji.examples.length - 2} từ khác
								</p>
							)}
						</div>
					</div>
				)}
			</CardContent>

			{/* Actions */}
			<CardFooter className='flex gap-2'>
				<CopyButton character={kanji.character} />
				<KanjiDetails kanji={kanji} />
				<AudioButton word={kanji.character} />
			</CardFooter>
		</Card>
	);
}

function KanjiDetails({ kanji }: { kanji: Kanji }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Chi tiết</Button>
			</DialogTrigger>
			<DialogContent className='min-w-[1000]'>
				<DialogHeader>
					<DialogTitle>Chi tiết Kanji</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				{/* Header với gradient background */}
				<Item variant='muted' className='bg-primary'>
					<ItemContent>
						<ItemTitle className='text-4xl font-bold tracking-tight'>
							{kanji.character}
						</ItemTitle>
						<ItemDescription className='text-xl text-white'>
							{kanji.onyomi}
						</ItemDescription>
						<ItemLevelBadge level={kanji.level} />
					</ItemContent>
					<ItemActions>
						<AudioButton word={kanji.character} />
					</ItemActions>
				</Item>
				<h3>Các ví dụ sử dụng từ vựng trong ngữ cảnh thực tế</h3>
				{kanji.examples &&
					kanji.examples.map((example, index) => (
						<ExampleItem key={index} example={example} />
					))}
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Đóng</Button>
					</DialogClose>
					<Button>
						<BookOpen className='w-4 h-4' />
						Thêm vào bộ học
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
