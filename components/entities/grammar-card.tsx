'use client';

import Link from 'next/link';
import { BookOpen, Lightbulb, MessageSquare, CheckCircle2 } from 'lucide-react';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemHeader,
	ItemTitle,
} from '@/components/ui/item';
import { ChevronRight } from 'lucide-react';
import { Grammar } from '@/types/types';
import { ItemLevelBadge } from './item-level-badge';
import { BookmarkedButton } from './bookmarked-button';
import { AudioButton } from './audio-button';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ExampleItem } from './example-item';
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function GrammarCard({ grammar }: { grammar: Grammar }) {
	return (
		<Card>
			<CardHeader>
				<div className='flex justify-between items-center mb-2'>
					<ItemLevelBadge level={grammar.level} />
					<ItemActions>
						<BookmarkedButton
							itemId={grammar.id}
							itemType='grammar'
						/>
					</ItemActions>
				</div>
				<CardTitle>{grammar.pattern}</CardTitle>
				<CardDescription>→ {grammar.meaning}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex-1 min-w-0'>
					{grammar.structure && (
						<div className='mt-1 text-sm text-slate-600 font-mono bg-white px-2 py-1 rounded border border-primary'>
							{grammar.structure}
						</div>
					)}
					{grammar.explaination && (
						<p className='text-sm text-slate-500 mt-1'>{grammar.explaination}</p>
					)}
				</div>
			</CardContent>
			<CardFooter>
				<GrammarDetails grammar={grammar} />
			</CardFooter>
		</Card>
	);
}

function GrammarDetails({ grammar }: { grammar: Grammar }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Chi tiết</Button>
			</DialogTrigger>
			<DialogContent className='min-w-[1000]'>
				<DialogHeader>
					<DialogTitle>Chi tiết ngữ pháp</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				{/* Cấu trúc */}
				<div>
					<div className='flex items-center gap-2 mb-3'>
						<BookOpen className='w-5 h-5' />
						<h3 className='font-bold text-lg'>Cấu trúc</h3>
					</div>
					<Item variant='outline' className='font-mono text-lg border-primary'>
						<ItemContent>{grammar.structure}</ItemContent>
					</Item>
				</div>

				{/* Giải thích */}
				<div>
					<div className='flex items-center gap-2 mb-3'>
						<Lightbulb className='w-5 h-5' />
						<h3 className='font-bold text-lg'>Giải thích</h3>
					</div>
					<Item variant='outline' className='leading-relaxed'>
						<ItemContent>{grammar.explaination}</ItemContent>
					</Item>
				</div>

				{/* Tabs cho Examples và Notes */}
				<Tabs defaultValue='examples' className='w-full'>
					<TabsList className='w-full'>
						<TabsTrigger value='examples'>
							Ví dụ ({grammar.examples.length || 0})
						</TabsTrigger>
						<TabsTrigger value='notes'>Ghi chú</TabsTrigger>
					</TabsList>

					{/* Ví dụ */}
					<TabsContent value='examples' className='space-y-4 mt-4'>
						{grammar.examples &&
							grammar.examples.map((example, index) => (
								<ExampleItem key={index} example={example} />
							))}
					</TabsContent>

					{/* Ghi chú */}
					<TabsContent value='notes' className='space-y-4 mt-4'>
						{/* Usage Notes */}
						<div>
							<h4 className='font-bold text-slate-900 mb-3 flex items-center gap-2'>
								<CheckCircle2 className='w-5 h-5 text-green-500' />
								Lưu ý khi sử dụng
							</h4>
							<ul className='space-y-2'>
								<li
									className='flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-200'
								>
									<span className='text-green-600 font-bold'>•</span>
									<span className='text-slate-700'>{grammar.notes}</span>
								</li>
							</ul>
						</div>
						
						{/* General Notes */}
						{grammar.notes && (
							<Alert className='bg-slate-50'>
								<MessageSquare className='h-4 w-4' />
								<AlertDescription className='text-slate-700'>
									{grammar.notes}
								</AlertDescription>
							</Alert>
						)}
					</TabsContent>
				</Tabs>
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
