'use client';

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardAction,
	CardFooter,
} from '@/components/ui/card';
import { Clock, TrendingUp } from 'lucide-react';

interface StudyTimeCardProps {
	todayMinutes: number;
	weekMinutes: number;
	monthMinutes: number;
	weekTrend: number;
}

const StudyTimeCard = ({
	todayMinutes,
	weekMinutes,
	monthMinutes,
	weekTrend,
}: StudyTimeCardProps) => {
	const formatTime = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		if (hours > 0) {
			return `${hours}h ${mins}m`;
		}
		return `${mins}m`;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Thời gian học tập</CardTitle>
				<CardDescription>Tổng thời gian học hôm nay</CardDescription>
				<CardAction>
					<Clock className='size-5 text-blue-600' />
				</CardAction>
			</CardHeader>

			<CardContent className='grid grid-cols-3 gap-4'>
				<div className='rounded-lg bg-blue-50 p-4'>
					<p className='text-xs font-medium text-gray-600'>Hôm nay</p>
					<p className='mt-2 text-2xl font-bold text-blue-600'>
						{formatTime(todayMinutes)}
					</p>
				</div>
				<div className='rounded-lg bg-green-50 p-4'>
					<p className='text-xs font-medium text-gray-600'>Tuần này</p>
					<p className='mt-2 text-2xl font-bold text-green-600'>
						{formatTime(weekMinutes)}
					</p>
				</div>
				<div className='rounded-lg bg-purple-50 p-4'>
					<p className='text-xs font-medium text-gray-600'>Tháng này</p>
					<p className='mt-2 text-2xl font-bold text-purple-600'>
						{formatTime(monthMinutes)}
					</p>
				</div>
			</CardContent>

			<CardFooter>
				<div className='w-full mt-4 flex items-center gap-2 rounded-lg bg-gray-50 p-3'>
					<TrendingUp className='size-4 text-green-600' />
					<p className='text-sm text-gray-700'>
						<span className='font-semibold text-green-600'>+{weekTrend}%</span> so với
						tuần trước
					</p>
				</div>
			</CardFooter>
		</Card>
	);
};

export default StudyTimeCard;
