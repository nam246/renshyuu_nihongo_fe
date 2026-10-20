import { Level, QuestionType } from '@/types/types';
import { ChevronRight, Clock, HelpCircle, BookOpen, Music } from 'lucide-react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import PageHeader from '@/components/layout/page-header';
import { ItemLevelBadge } from '@/components/entities/item-level-badge';
import MockTestDetail from '@/components/test-detail/mock-test/mock-test-detail';
import { Badge } from '@/components/ui/badge';
import fs from 'fs';
import path from 'path';
import { Question } from '@/types/types';

export default async function MockTestListPage() {
	let allQuestions: Question[] = [];
	try {
		const jsonDirectory = path.join(process.cwd(), 'public', 'data');
		const fileContents = fs.readFileSync(path.join(jsonDirectory, 'mock-tests.json'), 'utf8');
		allQuestions = JSON.parse(fileContents);
	} catch (error) {
		console.error('Failed to read mock test data:', error);
	}

	return (
		<>
			<PageHeader
				title='JLPT Mock Test'
				description='Thử sức với các bài thi mô phỏng cấu trúc đề thi JLPT thực tế.'
			/>

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
						<Select>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Tất cả kỳ thi' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Tất cả kỳ thi</SelectItem>
								<SelectItem value='jlpt'>JLPT</SelectItem>
								<SelectItem value='nat-test'>NAT-TEST</SelectItem>
								<SelectItem value='top-j'>TOP-J</SelectItem>
								<SelectItem value='j-test'>J-TEST</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
				<MockTestCard
					title='JLPT N5 Full Mock Test #1'
					description='Bài thi mô phỏng JLPT N5 đầy đủ 3 phần: Kiến thức ngôn ngữ, Đọc hiểu và Nghe hiểu.'
					level={Level.N5}
					questionsCount={80}
					time={105}
					mockQuestions={allQuestions.filter((q) => q.level === Level.N5)}
				/>
				<MockTestCard
					title='JLPT N4 Full Mock Test #1'
					description='Bài thi mô phỏng JLPT N4 với cấu trúc chuẩn.'
					level={Level.N4}
					questionsCount={90}
					time={125}
					mockQuestions={allQuestions.filter((q) => q.level === Level.N4)}
				/>
				<MockTestCard
					title='JLPT N3 Full Mock Test #1'
					description='Thử thách với đề thi N3 chi tiết.'
					level={Level.N3}
					questionsCount={100}
					time={140}
					mockQuestions={allQuestions.filter((q) => q.level === Level.N3)}
				/>
			</div>
		</>
	);
}

function MockTestCard({
	title,
	description,
	level,
	questionsCount,
	time,
	mockQuestions,
}: {
	title: string;
	description: string;
	level: Level;
	questionsCount: number;
	time: number;
	mockQuestions: Question[];
}) {
	return (
		<Card className='group flex flex-col hover:shadow-md transition-all duration-300'>
			<CardHeader className='relative'>
				<div className='flex justify-between items-start mb-2'>
					<ItemLevelBadge level={level} />
					<Badge variant='outline'>JLPT</Badge>
				</div>
				<CardTitle className='leading-tight group-hover:text-primary transition-colors'>
					{title}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
				<CardAction>
					<ChevronRight className='w-6 h-6 group-hover:text-primary group-hover:translate-x-1 transition-all' />
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-2 gap-4 mb-6'>
					<div className='flex items-center gap-2 text-sm text-slate-600'>
						<HelpCircle className='w-4 h-4 text-slate-400' />
						<span>{questionsCount} câu hỏi</span>
					</div>
					<div className='flex items-center gap-2 text-sm text-slate-600'>
						<Clock className='w-4 h-4 text-slate-400' />
						<span>{time} phút</span>
					</div>
					<div className='flex items-center gap-2 text-sm text-slate-600'>
						<BookOpen className='w-4 h-4 text-slate-400' />
						<span>Full Sections</span>
					</div>
					<div className='flex items-center gap-2 text-sm text-slate-600'>
						<Music className='w-4 h-4 text-slate-400' />
						<span>Có Audio</span>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<MockTestDetail mockQuestions={mockQuestions} />
			</CardFooter>
		</Card>
	);
}
