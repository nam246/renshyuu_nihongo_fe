import { Level, JLPTSection, QuestionType } from '@/types/types';
import { ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import PageHeader from '@/components/layout/page-header';
import { ItemLevelBadge } from '@/components/entities';
import TestDetail from '../../../../components/test-detail/quick-test/test-detail';

const mockQuestions: any[] = [
	{
		id: '1',
		question:
			'「＿＿＿」の言葉の読み方 olarak tốt nhất là một trong 1, 2, 3, 4.\n明日の会議はとても＿＿＿です。',
		options: {
			a: '重要',
			b: '重大',
			c: '重点',
			d: '重宝',
		},
		correctAnswer: 'a',
		explanation: '「重要」は「じゅうよう」と読み、「大切なこと」を意味します。',
		level: Level.N5,
		questionType: QuestionType.KANJI_READING,
		section: '文字・語彙' as JLPTSection,
		description: 'Cách đọc Hán tự',
		answered: false,
		userAnswer: null,
		isFlagged: false,
	},
	{
		id: '2',
		question:
			'Tiếp theo là từ điền vào chỗ trống tốt nhất.\nお腹が空いたので、何か＿＿＿。',
		options: {
			a: '食べたい',
			b: '食べておく',
			c: '食べるもの',
			d: '食べよう',
		},
		correctAnswer: 'd',
		explanation: '「〜よう」は意志や提案を表す表現です。',
		level: Level.N5,
		questionType: QuestionType.GRAMMAR_SELECT,
		section: '文法' as JLPTSection,
		description: 'Ngữ pháp trong câu',
		answered: false,
		userAnswer: null,
		isFlagged: false,
	},
	// Thêm nhiều câu hỏi khác...
];

export default async function QuickTestListPage() {
	return (
		<>
			<PageHeader title='Chọn level làm bài thi' description='Danh sách bài thi' />
			<div className='mb-8 space-y-4'>
				<div className='flex flex-col sm:flex-row gap-4'>
					{/* <div className='relative flex-1'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
						<Input placeholder='Tìm kiếm...' className='pl-10' />
					</div> */}
					<div className='flex gap-2'>
						<Select>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Tất cả cấp độ' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả cấp độ</SelectItem>
								{Object.values(Level).map((lvl, index) => (
									<SelectItem key={index} value={lvl}>
										{lvl}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-3 gap-4'>
				<Card className='group h-full'>
					<CardHeader>
						<ItemLevelBadge level={Level.N5} />
						<CardTitle className='text-xl mb-1'>Cấp độ {Level.N5}</CardTitle>
						<CardDescription>Luyện tập với cấp độ {Level.N5}</CardDescription>
						<CardAction>
							<ChevronRight className='w-6 h-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all' />
						</CardAction>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							<div className='flex items-center justify-between text-sm'>
								<span className='text-slate-600 dark:text-slate-400'>Tiến độ</span>
								{/* <Badge variant="secondary" className={level.textColor}>
								{level.learnedWords}/{level.totalWords} từ
							</Badge> */}
							</div>
							<Progress value={50} className='h-2' />
							<div className='text-right text-xs text-slate-500'>hoàn thành</div>
						</div>
					</CardContent>
					<CardFooter>
						{/* Dialog Test detail */}
						<TestDetail mockQuestions={mockQuestions} />
					</CardFooter>
				</Card>
				<Card className={`group h-full`}>
					<CardHeader>
						<ItemLevelBadge level={Level.N5} />
						<CardTitle className='text-xl mb-1'>Cấp độ {Level.N5}</CardTitle>
						<CardDescription>Luyện tập với cấp độ {Level.N5}</CardDescription>
						<CardAction>
							<ChevronRight className='w-6 h-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all' />
						</CardAction>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							<div className='flex items-center justify-between text-sm'>
								<span className='text-slate-600 dark:text-slate-400'>Tiến độ</span>
								{/* <Badge variant='secondary' className={level.textColor}>
										{level.learnedWords}/{level.totalWords} từ
									</Badge> */}
							</div>
							<Progress value={20} className='h-2' />
							<div className='text-right text-xs text-slate-500'>hoàn thành</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
