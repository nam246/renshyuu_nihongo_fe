'use client';

import Link from 'next/link';
import { Vocabulary } from '@/types/types';

import { ChevronRight } from 'lucide-react';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemHeader,
	ItemTitle,
} from '@/components/ui/item';
import { Button } from '@/components/ui/button';
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

import { ItemLevelBadge } from './item-level-badge';
import { ItemWordTypeBadge } from './item-wordtype-badge';
import { BookmarkedButton } from './bookmarked-button';
import { AudioButton } from './audio-button';
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ExampleItem } from './example-item';

export const VocabularyCard = ({ vocabulary }: { vocabulary: Vocabulary }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<div className='flex gap-2'>
						<ItemLevelBadge level={vocabulary.level} />
						<ItemWordTypeBadge wordType={vocabulary.wordType} />
					</div>
				</CardTitle>
				<CardAction>
					<BookmarkedButton
						itemId={vocabulary.id}
						itemType='vocabulary'
					/>
				</CardAction>
			</CardHeader>
			<CardContent>
				<ItemTitle className='font-bold text-xl'>
					{vocabulary.word}
					<AudioButton word={vocabulary.word} />
				</ItemTitle>

				<ItemDescription>
					{/* Nên thêm cách đọc bằng hiragana katakana */}
					{vocabulary.romaji}
				</ItemDescription>

				<div>Ý nghĩa: {vocabulary.meaning}</div>
			</CardContent>
			<CardFooter>
				<VocabularyDetails vocabulary={vocabulary} />
			</CardFooter>
		</Card>
	);
};

function VocabularyDetails({ vocabulary }: { vocabulary: Vocabulary }) {
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
							{vocabulary.word}
						</ItemTitle>
						<ItemDescription className='text-xl text-white'>
							{vocabulary.meaning}
						</ItemDescription>
						<ItemLevelBadge level={vocabulary.level} />
					</ItemContent>
					<ItemActions>
						<AudioButton word={vocabulary.word} />
					</ItemActions>
				</Item>
				<h3>Các ví dụ sử dụng từ vựng trong ngữ cảnh thực tế</h3>
				{vocabulary.examples &&
					vocabulary.examples.map((example, index) => (
						<ExampleItem key={index} example={example} />
					))}
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Đóng</Button>
					</DialogClose>
					<Button>
						{/* <BookOpen className='w-4 h-4' /> */}
						Thêm vào bộ học
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
