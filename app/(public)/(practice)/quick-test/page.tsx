import { Level } from '@/types/types';
import { ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/layout/page-header';
import { ItemLevelBadge } from '@/components/entities';
import TestDetail from '../../../../components/test-detail/test-detail';

const mockQuestions: Array<{
	id: string;
	question: string;
	options: string[];
	correctAnswer: number;
	explanation: string;
	difficulty: string;
	type: string;
	answered: boolean;
	userAnswer: number | null;
	isFlagged: boolean;
}> = [
	{
		id: '1',
		question:
			'「＿＿＿」の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。\n明日の会議はとても＿＿＿です。',
		options: ['重要', '重大', '重点', '重宝'],
		correctAnswer: 0,
		explanation: '「重要」は「じゅうよう」と読み、「大切なこと」を意味します。',
		difficulty: 'easy',
		type: 'vocabulary',
		answered: false,
		userAnswer: null,
		isFlagged: false,
	},
	{
		id: '2',
		question:
			'次の文の＿＿＿に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。\nお腹が空いたので、何か＿＿＿。',
		options: ['食べたい', '食べておく', '食べるもの', '食べよう'],
		correctAnswer: 3,
		explanation: '「〜よう」は意志や提案を表す表現です。',
		difficulty: 'medium',
		type: 'grammar',
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
					<div className='relative flex-1'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
						<Input placeholder='Tìm kiếm...' className='pl-10' />
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
					</div>
				</div>
			</div>
			<div className='grid grid-cols-3 gap-4'>
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
