'use client';

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressLevel {
	level: string;
	total: number;
	completed: number;
	color: string;
}

interface ProgressOverviewCardProps {
	levels: ProgressLevel[];
	title?: string;
}

const ProgressOverviewCard = ({
	levels,
	title = 'Tiến độ học tập theo trình độ',
}: ProgressOverviewCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>Theo dõi tiến độ của bạn ở mỗi trình độ</CardDescription>
			</CardHeader>

			<CardContent className='space-y-4'>
				{levels.map((level, index) => (
					<div key={index} className='space-y-2'>
						<div className='flex items-center justify-between'>
							<span className='text-sm font-medium'>{level.level}</span>
							<span className='text-sm font-semibold'>
								{level.completed}/{level.total}
							</span>
						</div>
						<Progress value={(level.completed / level.total) * 100} />
						<p className='text-xs'>
							{Math.round((level.completed / level.total) * 100)}% hoàn thành
						</p>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default ProgressOverviewCard;
