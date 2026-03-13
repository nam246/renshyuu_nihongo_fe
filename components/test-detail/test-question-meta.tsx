'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

interface TestQuestionMetaProps {
	currentQuestionIndex: number;
	totalQuestions: number;
	type: string;
	difficulty: string;
	answered: boolean;
}

export default function TestQuestionMeta({
	currentQuestionIndex,
	totalQuestions,
	type,
	difficulty,
	answered,
}: TestQuestionMetaProps) {
	return (
		<div className='flex items-center justify-between mb-6'>
			<div className='flex items-center gap-2'>
				<Badge variant='outline'>
					Câu {currentQuestionIndex + 1}/{totalQuestions}
				</Badge>
				<Badge variant='secondary' className='capitalize'>
					{type}
				</Badge>
				<Badge
					variant={
						difficulty === 'easy'
							? 'default'
							: difficulty === 'medium'
								? 'secondary'
								: 'destructive'
					}
					className='capitalize'
				>
					{difficulty}
				</Badge>
			</div>

			<div className='text-sm text-muted-foreground'>
				{answered ? (
					<span className='flex items-center text-green-600'>
						<CheckCircle2 className='h-4 w-4 mr-1' />
						Đã trả lời
					</span>
				) : (
					<span className='flex items-center text-amber-600'>
						<XCircle className='h-4 w-4 mr-1' />
						Chưa trả lời
					</span>
				)}
			</div>
		</div>
	);
}
