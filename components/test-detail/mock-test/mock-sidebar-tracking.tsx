'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

import { AnswerOption } from '@/types/types';

interface Question {
	id: string;
	answered: boolean;
	userAnswer: AnswerOption | null;
	isFlagged: boolean;
	section: string;
}

interface MockSidebarTrackingProps {
	questions: Question[];
	currentQuestionIndex: number;
	onNavigate: (index: number) => void;
	flaggedQuestions: number;
	answeredQuestions: number;
	totalQuestions: number;
}

export default function MockSidebarTracking({
	questions,
	currentQuestionIndex,
	onNavigate,
	flaggedQuestions,
	answeredQuestions,
	totalQuestions,
}: MockSidebarTrackingProps) {
	// Group questions by section
	const sections = questions.reduce(
		(acc, q, index) => {
			if (!acc[q.section]) {
				acc[q.section] = [];
			}
			acc[q.section].push({ ...q, originalIndex: index });
			return acc;
		},
		{} as Record<string, (Question & { originalIndex: number })[]>,
	);

	const sectionNames = Object.keys(sections);

	return (
		<div className='bg-card flex flex-col'>
			{/* Header */}
			<div className='p-4 border-b'>
				<h3 className='font-bold'>Danh sách câu hỏi</h3>
				<div className='flex items-center justify-between mt-2 text-sm text-muted-foreground'>
					<span>
						{answeredQuestions}/{totalQuestions} câu
					</span>
					<Badge variant='outline' className='text-xs'>
						{flaggedQuestions} đánh dấu
					</Badge>
				</div>
			</div>

			{/* Questions Accordion */}
			<ScrollArea className='flex-1 p-4'>
				{sectionNames.map((sectionName) => (
					<div key={sectionName}>
						<span className='text-xs font-bold uppercase tracking-wider text-left'>
							{sectionName}
						</span>
						<div className='grid grid-cols-5 gap-2 p-1'>
							{sections[sectionName].map((question) => (
								<Button
									key={question.id}
									variant='outline'
									size='sm'
									className={cn(
										'h-9 w-9 p-0 relative transition-all duration-200 hover:scale-105',
										currentQuestionIndex === question.originalIndex &&
											'ring-2 ring-primary border-primary',
										question.answered &&
											'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
										question.isFlagged &&
											!question.answered &&
											'border-orange-300 bg-orange-50/30',
									)}
									onClick={() => onNavigate(question.originalIndex)}
								>
									<span className='text-xs font-semibold'>
										{question.originalIndex + 1}
									</span>
									{question.answered && (
										<CheckCircle2 className='absolute -top-1 -right-1 h-3 w-3 text-green-600 bg-white rounded-full p-0.5 shadow-sm' />
									)}
									{question.isFlagged && (
										<Flag className='absolute -bottom-1 -right-1 h-3 w-3 text-orange-500 bg-white rounded-full p-0.5 shadow-sm' />
									)}
								</Button>
							))}
						</div>
					</div>
				))}
			</ScrollArea>

			{/* Legend */}
			<div className='p-4 border-t space-y-2 text-xs'>
				<div className='flex items-center gap-2'>
					<div className='h-3 w-3 rounded-full bg-green-50 border border-green-200 flex items-center justify-center'>
						<div className='h-1.5 w-1.5 rounded-full bg-green-600' />
					</div>
					<span>Đã trả lời</span>
				</div>
				<div className='flex items-center gap-2'>
					<div className='h-3 w-3 rounded-full border border-slate-200' />
					<span>Chưa trả lời</span>
				</div>
				<div className='flex items-center gap-2'>
					<Flag className='h-3 w-3 text-orange-500' />
					<span>Đánh dấu</span>
				</div>
			</div>
		</div>
	);
}
