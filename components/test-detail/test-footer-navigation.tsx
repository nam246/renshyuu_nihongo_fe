'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface TestFooterNavigationProps {
	currentQuestionIndex: number;
	totalQuestions: number;
	isSubmitting: boolean;
	onPrevious: () => void;
	onNext: () => void;
	onSubmit: () => void;
}

export default function TestFooterNavigation({
	currentQuestionIndex,
	totalQuestions,
	isSubmitting,
	onPrevious,
	onNext,
	onSubmit,
}: TestFooterNavigationProps) {
	return (
		<div className='flex justify-between mt-8 pt-6 border-t'>
			<Button
				variant='outline'
				onClick={onPrevious}
				disabled={currentQuestionIndex === 0}
			>
				<ChevronLeft />
				Câu trước
			</Button>

			<div className='flex gap-2'>
				{currentQuestionIndex < totalQuestions - 1 ? (
					<Button variant='outline' onClick={onNext}>
						Câu tiếp theo
						<ChevronRight />
					</Button>
				) : (
					<Button variant='default' onClick={onSubmit} disabled={isSubmitting}>
						{isSubmitting ? (
							<>Đang nộp...</>
						) : (
							<>
								<Send className='h-4 w-4 mr-2' />
								Nộp bài
							</>
						)}
					</Button>
				)}
			</div>
		</div>
	);
}
