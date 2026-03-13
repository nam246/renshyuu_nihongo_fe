'use client';

import { AlertCircle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';

interface TestTimerProps {
	timeLeft: number; // in seconds
}

export default function TestTimer({ timeLeft }: TestTimerProps) {
	const [isLowTime, setIsLowTime] = useState(false);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;
	const totalSeconds = 60 * 60; // 60 minutes
	const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

	useEffect(() => {
		setIsLowTime(timeLeft < 5 * 60); // Less than 5 minutes
	}, [timeLeft]);

	return (
		<div className='space-y-2'>
			<div className='flex items-center gap-2'>
				<Clock className='h-4 w-4' />
				<span
					className={cn(
						'font-mono text-lg font-semibold',
						isLowTime ? 'text-red-600 animate-pulse' : '',
					)}
				>
					{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
				</span>
			</div>

			<Progress
				value={progress}
				className={cn('h-1', isLowTime ? 'bg-red-100 [&>div]:bg-red-600' : '')}
			/>

			{isLowTime && (
				<Alert variant='destructive' className='py-2'>
					<AlertCircle className='h-4 w-4' />
					<AlertDescription className='text-xs'>
						Còn {minutes} phút. Hãy kiểm tra lại các câu trả lời!
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
}

function cn(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}
