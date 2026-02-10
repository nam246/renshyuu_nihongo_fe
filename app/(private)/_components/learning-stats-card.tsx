'use client';
import type { ReactNode } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { BookOpenIcon, CheckCircle2, Clock, Target } from 'lucide-react';

interface LearningStatsCardProps {
	icon: React.ReactNode;
	label: string;
	value: number | string;
	subtext?: string;
	trend?: 'up' | 'down' | 'neutral';
}

const LearningStatsCard = ({
	icon,
	label,
	value,
	subtext,
	trend = 'neutral',
}: LearningStatsCardProps) => {
	const trendColor =
		trend === 'up'
			? 'text-green-600'
			: trend === 'down'
				? 'text-red-600'
				: 'text-blue-600';

	return (
		<>
			<Card className={cn('gap-4')}>
				<CardHeader className='flex items-center'>
					<div className='bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-md'>
						{icon}
					</div>
					<span className='text-2xl'>{value}</span>
				</CardHeader>
				<CardContent className='flex flex-col gap-2'>
					<span className='font-semibold'>{label}</span>
					<p className='space-x-2'>
						{/* <span className='text-sm'>{trend === 'up' && '↑'} {trend === 'down' && '↓'}</span> */}
						<span className={`text-sm ${trendColor}`}>{subtext}</span>
					</p>
				</CardContent>
			</Card>
		</>
	);
};

export default LearningStatsCard;
