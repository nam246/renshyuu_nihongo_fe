'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Flag, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
	id: string;
	answered: boolean;
	userAnswer: number | null;
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
		<div className='w-64 border-r bg-card flex flex-col'>
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
				<div className='grid grid-cols-5 gap-2'>
					{questions.map((question, index) => (
						<Button
							key={question.id}
							variant='outline'
							size='sm'
							className={cn(
								'h-10 w-10 p-0 relative',
								currentQuestionIndex === index && 'ring-2 ring-primary',
								question.answered && 'bg-green-100 border-green-300 hover:bg-green-200',
								question.isFlagged && 'border-orange-300',
							)}
							onClick={() => onNavigate(index)}
						>
							{question.answered ? (
								<CheckCircle2 className='h-4 w-4 text-green-600' />
							) : (
								<Circle className='h-4 w-4' />
							)}
							<span className='absolute -top-1 -right-1 text-xs font-medium'>
								{index + 1}
							</span>
							{question.isFlagged && (
								<Flag className='absolute -bottom-1 -right-1 h-3 w-3 text-orange-500' />
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
