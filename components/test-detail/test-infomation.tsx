import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	AlertCircle,
	CheckCircle2,
	Clock,
	Flag,
	HelpCircle,
} from 'lucide-react';

export function TestInfomation({
	totalQuestions,
	handleStartTest,
}: {
	totalQuestions: number;
	handleStartTest: () => void;
}) {
	return (
		<Card className='min-w-2xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-2xl'>
					{/* Bài Test {level.toUpperCase()} */}
				</CardTitle>
				<div className='space-y-4'>
					<div className='flex items-center gap-4 text-sm'>
						<Badge variant='outline' className='flex items-center gap-1'>
							<Clock className='h-3 w-3' />
							60 phút
						</Badge>
						<Badge variant='outline' className='flex items-center gap-1'>
							<HelpCircle className='h-3 w-3' />
							{totalQuestions} câu
						</Badge>
						{/* <Badge variant='outline'>{level.toUpperCase()}</Badge> */}
					</div>

					<div className='space-y-2'>
						<h4 className='font-semibold'>Thông tin bài test:</h4>
						<ul className='list-disc pl-5 space-y-1 text-sm text-muted-foreground'>
							<li>Tổng số câu: {totalQuestions} câu trắc nghiệm</li>
							<li>Thời gian: 60 phút</li>
							<li>Phân loại: Từ vựng, Ngữ pháp, Kanji</li>
							<li>Điểm đạt: 70/100 điểm</li>
							<li>Có thể đánh dấu câu hỏi để xem lại</li>
						</ul>
					</div>
				</div>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='grid grid-cols-2 gap-4'>
					<div className='p-4 border rounded-lg'>
						<div className='text-2xl font-bold text-center'>{totalQuestions}</div>
						<div className='text-center text-sm text-muted-foreground'>
							Tổng câu hỏi
						</div>
					</div>
					<div className='p-4 border rounded-lg'>
						<div className='text-2xl font-bold text-center'>60</div>
						<div className='text-center text-sm text-muted-foreground'>Thời gian</div>
					</div>
				</div>

				<div className='space-y-4'>
					<h4 className='font-semibold'>Hướng dẫn:</h4>
					<div className='space-y-2 text-sm'>
						<div className='flex items-center gap-2'>
							<CheckCircle2 className='h-4 w-4 text-green-500' />
							<span>Chọn một đáp án đúng nhất</span>
						</div>
						<div className='flex items-center gap-2'>
							<Flag className='h-4 w-4 text-orange-500' />
							<span>Đánh dấu câu hỏi để xem lại sau</span>
						</div>
						<div className='flex items-center gap-2'>
							<AlertCircle className='h-4 w-4 text-blue-500' />
							<span>Có thể quay lại chỉnh sửa đáp án</span>
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button onClick={handleStartTest} size='lg' className='w-full'>
					Bắt đầu làm bài
				</Button>
			</CardFooter>
		</Card>
	);
}
