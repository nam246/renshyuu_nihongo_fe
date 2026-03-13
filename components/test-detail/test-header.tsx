'use client';

import { Button } from '@/components/ui/button';
import { SquareCheckBig } from 'lucide-react';
import TestTimer from './test-timer';
import TestProgress from './test-progress';

interface TestHeaderProps {
	currentQuestionIndex: number;
	totalQuestions: number;
	timeLeft: number;
	onEndTest: () => void;
}

export default function TestHeader({
	currentQuestionIndex,
	totalQuestions,
	timeLeft,
	onEndTest,
}: TestHeaderProps) {
	return (
		<div className='border-b bg-card'>
			<div className='flex items-center justify-between px-6 py-4'>
				<div className='flex items-center gap-4'>
					<TestProgress current={currentQuestionIndex + 1} total={totalQuestions} />
				</div>

				<div className='flex items-center gap-4'>
					<TestTimer timeLeft={timeLeft} />
					<Button variant='default' size='sm' onClick={onEndTest}>
						<SquareCheckBig className='h-4 w-4 mr-2' />
						Nộp bài thi
					</Button>
				</div>
			</div>
		</div>
	);
}
