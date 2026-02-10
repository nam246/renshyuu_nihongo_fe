'use client';

import { Level, Deck } from '@/types/types';
import Link from 'next/link';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
	Flame,
	BookOpen,
	TrendingUp,
	Target,
	ChevronRight,
	Filter,
	Search,
} from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/layout/page-header';
import FlashcardApp from './_components/flashcard-app';

// Dữ liệu mẫu - sau này bạn có thể lấy từ API hoặc database
const levels = [
	{
		id: 'n5',
		name: 'N5',
		title: 'Sơ cấp',
		description: 'Từ vựng và ngữ pháp cơ bản',
		totalWords: 800,
		learnedWords: 245,
		color: 'bg-green-500',
		textColor: 'text-green-600',
		borderColor: 'border-green-200',
	},
	{
		id: 'n4',
		name: 'N4',
		title: 'Tiền trung cấp',
		description: 'Mở rộng vốn từ vựng',
		totalWords: 1500,
		learnedWords: 120,
		color: 'bg-blue-500',
		textColor: 'text-blue-600',
		borderColor: 'border-blue-200',
	},
	{
		id: 'n3',
		name: 'N3',
		title: 'Trung cấp',
		description: 'Giao tiếp hàng ngày',
		totalWords: 3000,
		learnedWords: 50,
		color: 'bg-yellow-500',
		textColor: 'text-yellow-600',
		borderColor: 'border-yellow-200',
	},
	{
		id: 'n2',
		name: 'N2',
		title: 'Trung cao cấp',
		description: 'Đọc hiểu chuyên sâu',
		totalWords: 6000,
		learnedWords: 0,
		color: 'bg-orange-500',
		textColor: 'text-orange-600',
		borderColor: 'border-orange-200',
	},
	{
		id: 'n1',
		name: 'N1',
		title: 'Cao cấp',
		description: 'Thành thạo tiếng Nhật',
		totalWords: 10000,
		learnedWords: 0,
		color: 'bg-red-500',
		textColor: 'text-red-600',
		borderColor: 'border-red-200',
	},
];

const FLASHCARD_DECKS: Deck[] = [
	{
		id: 'n5-vocab-1',
		title: 'N5 Vocabulary - Basics',
		description: 'Essential daily words for beginners',
		level: Level.N5,
		type: 'Vocabulary',
		count: 10,
		cards: [
			{
				id: '1',
				front: '私',
				reading: 'watashi',
				meaning: 'I; me',
				example: '私は学生です。',
				exampleMeaning: 'I am a student.',
			},
			{
				id: '2',
				front: '猫',
				reading: 'neko',
				meaning: 'Cat',
				example: '猫が好きです。',
				exampleMeaning: 'I like cats.',
			},
			{
				id: '3',
				front: '犬',
				reading: 'inu',
				meaning: 'Dog',
				example: '犬はかわいいです。',
				exampleMeaning: 'Dogs are cute.',
			},
			{
				id: '4',
				front: '食べる',
				reading: 'taberu',
				meaning: 'To eat',
				example: 'パンを食べます。',
				exampleMeaning: 'I eat bread.',
			},
			{
				id: '5',
				front: '飲む',
				reading: 'nomu',
				meaning: 'To drink',
				example: '水を飲みます。',
				exampleMeaning: 'I drink water.',
			},
			{
				id: '6',
				front: '本',
				reading: 'hon',
				meaning: 'Book',
				example: '本を読みます。',
				exampleMeaning: 'I read a book.',
			},
			{
				id: '7',
				front: '学生',
				reading: 'gakusei',
				meaning: 'Student',
				example: '私は日本語の学生です。',
				exampleMeaning: 'I am a Japanese language student.',
			},
			{
				id: '8',
				front: '学校',
				reading: 'gakkou',
				meaning: 'School',
				example: '学校へ行きます。',
				exampleMeaning: 'I go to school.',
			},
			{
				id: '9',
				front: '先生',
				reading: 'sensei',
				meaning: 'Teacher',
				example: '田中先生は優しいです。',
				exampleMeaning: 'Mr. Tanaka is kind.',
			},
			{
				id: '10',
				front: '日本',
				reading: 'nihon',
				meaning: 'Japan',
				example: '日本に行きたいです。',
				exampleMeaning: 'I want to go to Japan.',
			},
		],
	},
	{
		id: 'n5-kanji-1',
		title: 'N5 Kanji - Numbers & Time',
		description: 'Basic kanji for numbers and calendar',
		level: Level.N5,
		type: 'Kanji',
		count: 10,
		cards: [
			{
				id: 'k1',
				front: '一',
				reading: 'ichi / hito',
				meaning: 'One',
				example: '一つ (hitotsu)',
				exampleMeaning: 'One thing',
			},
			{
				id: 'k2',
				front: '二',
				reading: 'ni / futa',
				meaning: 'Two',
				example: '二月 (nigatsu)',
				exampleMeaning: 'February',
			},
			{
				id: 'k3',
				front: '三',
				reading: 'san / mi',
				meaning: 'Three',
				example: '三日 (mikka)',
				exampleMeaning: '3rd day of the month',
			},
			{
				id: 'k4',
				front: '四',
				reading: 'yon / shi',
				meaning: 'Four',
				example: '四月 (shigatsu)',
				exampleMeaning: 'April',
			},
			{
				id: 'k5',
				front: '五',
				reading: 'go / itsu',
				meaning: 'Five',
				example: '五円 (goen)',
				exampleMeaning: '5 yen',
			},
			{
				id: 'k6',
				front: '日',
				reading: 'nichi / hi',
				meaning: 'Day / Sun',
				example: '日曜日 (nichiyoubi)',
				exampleMeaning: 'Sunday',
			},
			{
				id: 'k7',
				front: '月',
				reading: 'getsu / tsuki',
				meaning: 'Month / Moon',
				example: '月曜日 (getsuyoubi)',
				exampleMeaning: 'Monday',
			},
			{
				id: 'k8',
				front: '火',
				reading: 'ka / hi',
				meaning: 'Fire',
				example: '火曜日 (kayoubi)',
				exampleMeaning: 'Tuesday',
			},
			{
				id: 'k9',
				front: '水',
				reading: 'sui / mizu',
				meaning: 'Water',
				example: '水曜日 (suiyoubi)',
				exampleMeaning: 'Wednesday',
			},
			{
				id: 'k10',
				front: '年',
				reading: 'nen / toshi',
				meaning: 'Year',
				example: '来年 (rainen)',
				exampleMeaning: 'Next year',
			},
		],
	},
	{
		id: 'n4-gram-1',
		title: 'N4 Grammar - Verbs',
		description: 'Verb conjugations and helpers',
		level: Level.N4,
		type: 'Grammar',
		count: 5,
		cards: [
			{
				id: 'g1',
				front: '～てはいけません',
				reading: 'te wa ikemasen',
				meaning: 'Must not do (Prohibition)',
				example: 'ここで写真を撮ってはいけません。',
				exampleMeaning: 'You must not take photos here.',
			},
			{
				id: 'g2',
				front: '～なければなりません',
				reading: 'nakereba narimasen',
				meaning: 'Must do (Obligation)',
				example: '毎日薬を飲まなければなりません。',
				exampleMeaning: 'I must take medicine every day.',
			},
			{
				id: 'g3',
				front: '～てもいいです',
				reading: 'temo ii desu',
				meaning: 'May do / Is allowed to',
				example: '入ってもいいですか？',
				exampleMeaning: 'May I enter?',
			},
			{
				id: 'g4',
				front: '～たことがあります',
				reading: 'ta koto ga arimasu',
				meaning: 'Have done before (Experience)',
				example: '日本へ行ったことがあります。',
				exampleMeaning: 'I have been to Japan.',
			},
			{
				id: 'g5',
				front: '～たり～たりします',
				reading: 'tari ~ tari shimasu',
				meaning: 'Do things like A and B',
				example: '日曜日は本を読んだり、映画を見たりします。',
				exampleMeaning: 'On Sundays, I read books, watch movies, etc.',
			},
		],
	},
];

const stats = {
	totalLearned: 415,
	streak: 7,
	studyTime: 24,
	accuracy: 87,
};

export default function FlashcardsListPage() {
	return (
		<div>
			<PageHeader
				title='Flashcards Tiếng Nhật'
				description='Học từ vựng và ngữ pháp hiệu quả với phương pháp flashcards. Chọn cấp độ của bạn.'
			/>

			<div className='mb-8 space-y-4'>
				<div className='flex flex-col sm:flex-row gap-4'>
					<div className='relative flex-1'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
						<Input placeholder='Tìm kiếm bài học...' className='pl-10' />
					</div>
					<div className='flex gap-2'>
						<Select>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Tất cả cấp độ' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả cấp độ</SelectItem>
								<SelectItem value='n5'>N5</SelectItem>
								<SelectItem value='n4'>N4</SelectItem>
								<SelectItem value='n3'>N3</SelectItem>
								<SelectItem value='n2'>N2</SelectItem>
								<SelectItem value='n1'>N1</SelectItem>
							</SelectContent>
						</Select>
						<Select>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Tất cả giáo trình' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả giáo trình</SelectItem>
								<SelectItem value='minna'>Minna no Nihongo</SelectItem>
								<SelectItem value='soumatome'>Sou Matome</SelectItem>
								<SelectItem value='try'>TRY!</SelectItem>
								<SelectItem value='other'>Khác</SelectItem>
							</SelectContent>
						</Select>
						<Button variant='outline'>
							<Filter className='h-4 w-4 mr-2' />
							Bộ lọc
						</Button>
					</div>
				</div>
			</div>

			{/* Main Content - Level Selection */}
			{/* <div className='mb-8'>
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{levels.map((level) => {
						const progress = (level.learnedWords / level.totalWords) * 100;

						return (
							<Link href={`/flashcards/${level.id}`} key={level.id}>
								<Card className={`group h-full`}>
									<CardHeader>
										<Badge variant='secondary' className={level.textColor}>
											{level.name}
										</Badge>
										<CardTitle className='text-xl mb-1'>{level.title}</CardTitle>
										<CardDescription>{level.description}</CardDescription>
										<CardAction>
											<ChevronRight className='w-6 h-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all' />
										</CardAction>
									</CardHeader>
									<CardContent>
										<div className='space-y-3'>
											<div className='flex items-center justify-between text-sm'>
												<span className='text-slate-600 dark:text-slate-400'>Tiến độ</span>
												<Badge variant='secondary' className={level.textColor}>
													{level.learnedWords}/{level.totalWords} từ
												</Badge>
											</div>
											<Progress value={progress} className='h-2' />
											<div className='text-right text-xs text-slate-500'>
												{progress.toFixed(1)}% hoàn thành
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>
			</div> */}

			<FlashcardApp decks={FLASHCARD_DECKS} />
		</div>
	);
}
