'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

import { AnswerOption } from '@/types/types';

interface Question {
	id: string;
	answered: boolean;
	userAnswer: AnswerOption | null;
	isFlagged: boolean;
}

interface SidebarTrackingProps {
	questions: Question[];
	currentQuestionIndex: number;
	onNavigate: (index: number) => void;
	flaggedQuestions: number;
	answeredQuestions: number;
	totalQuestions: number;
}

export default function SidebarTracking({
	questions,
	currentQuestionIndex,
	onNavigate,
	flaggedQuestions,
	answeredQuestions,
	totalQuestions,
}: SidebarTrackingProps) {
	return (
		<div className='bg-card flex flex-col'>
			{/* Header */}
			<div className='p-4 border-b'>
				<div className='flex items-center justify-between mt-2 text-sm text-muted-foreground'>
					<span>
						{answeredQuestions}/{totalQuestions} câu
					</span>
					<Badge variant='outline' className='text-xs'>
						{flaggedQuestions} đánh dấu
					</Badge>
				</div>
			</div>

			{/* Questions Grid */}
			<ScrollArea className='flex-1 p-4'>
				<div className='grid grid-cols-5 gap-2 p-1'>
					{questions.map((question, index) => (
						<Button
							key={question.id}
							variant='outline'
							size='sm'
							className={cn(
								'h-9 w-9 p-0 relative transition-all duration-200 hover:scale-105',
								currentQuestionIndex === index && 'ring-2 ring-primary',
								question.answered &&
									'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
								question.isFlagged &&
									!question.answered &&
									'border-orange-300 bg-orange-50/30',
							)}
							onClick={() => onNavigate(index)}
						>
							<span className='text-xs font-semibold'>{index + 1}</span>
							{question.isFlagged && (
								<Flag className='absolute -bottom-1 -right-1 h-3 w-3 text-orange-500' />
							)}
							{question.answered && (
								<CheckCircle2 className='absolute -top-1 -right-1 h-3 w-3 text-green-600 bg-white rounded-full p-0.5 shadow-sm' />
							)}
							{question.isFlagged && (
								<Flag className='absolute -bottom-1 -right-1 h-3 w-3 text-orange-500 bg-white rounded-full p-0.5 shadow-sm' />
							)}
						</Button>
					))}
				</div>
			</ScrollArea>

			{/* Legend */}
			<div className='p-4 border-t space-y-2'>
				<div className='flex items-center gap-2 text-sm'>
					<div className='h-3 w-3 rounded-full bg-green-100 border border-green-300 flex items-center justify-center'>
						<CheckCircle2 className='h-2 w-2 text-green-600' />
					</div>
					<span className='text-muted-foreground'>Đã trả lời</span>
				</div>
				<div className='flex items-center gap-2 text-sm'>
					<div className='h-3 w-3 rounded-full border' />
					<span className='text-muted-foreground'>Chưa trả lời</span>
				</div>
				<div className='flex items-center gap-2 text-sm'>
					<Flag className='h-3 w-3 text-orange-500' />
					<span className='text-muted-foreground'>Đánh dấu</span>
				</div>
				<div className='flex items-center gap-2 text-sm'>
					<div className='h-3 w-3 rounded-full ring-2 ring-primary' />
					<span className='text-muted-foreground'>Đang xem</span>
				</div>
			</div>

			{/* Quick Actions */}
			<div className='p-4 border-t space-y-2'>
				<Button
					variant='outline'
					size='sm'
					className='w-full justify-start'
					onClick={() => {
						const firstUnanswered = questions.findIndex((q) => !q.answered);
						if (firstUnanswered !== -1) onNavigate(firstUnanswered);
					}}
				>
					Câu chưa trả lời →
				</Button>
				<Button
					variant='outline'
					size='sm'
					className='w-full justify-start'
					onClick={() => {
						const firstFlagged = questions.findIndex((q) => q.isFlagged);
						if (firstFlagged !== -1) onNavigate(firstFlagged);
					}}
				>
					Câu đánh dấu →
				</Button>
			</div>
		</div>
	);
}
