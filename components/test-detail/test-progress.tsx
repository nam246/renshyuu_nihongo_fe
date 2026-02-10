'use client';

import { Progress } from '@/components/ui/progress';

interface TestProgressProps {
	current: number;
	total: number;
}

export default function TestProgress({ current, total }: TestProgressProps) {
	const progress = (current / total) * 100;

	return (
		<div className='flex items-center gap-4'>
			<div className='text-sm font-medium'>
				Câu {current}/{total}
			</div>
			<div className='w-32'>
				<Progress value={progress} className='h-2' />
			</div>
			<div className='text-sm text-muted-foreground'>{Math.round(progress)}%</div>
		</div>
	);
}
