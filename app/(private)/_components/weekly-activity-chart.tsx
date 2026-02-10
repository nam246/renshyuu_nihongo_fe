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

interface DailyActivity {
	day: string;
	lessons: number;
	vocabulary: number;
	grammar: number;
}

interface WeeklyActivityChartProps {
	data: DailyActivity[];
	title?: string;
}

const WeeklyActivityChart = ({
	data,
	title = 'Hoạt động học tập hàng tuần',
}: WeeklyActivityChartProps) => {
	const maxValue = Math.max(
		...data.flatMap((d) => [d.lessons, d.vocabulary, d.grammar]),
		1,
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>Lượng bài tập hoàn thành mỗi ngày</CardDescription>
			</CardHeader>

			<CardContent className='space-y-4'>
				<div className='flex items-end justify-between gap-2 h-48'>
					{data.map((item, index) => (
						<div key={index} className='flex flex-col items-center flex-1 gap-2'>
							<div className='w-full flex items-end justify-center gap-1 h-32'>
								{/* Lessons bar */}
								<div
									className='flex-1 bg-blue-500 rounded-t transition-all hover:bg-blue-600'
									style={{
										height: `${(item.lessons / maxValue) * 100}%`,
										minHeight: item.lessons > 0 ? '4px' : '0px',
									}}
									title={`Bài học: ${item.lessons}`}
								/>
								{/* Vocabulary bar */}
								<div
									className='flex-1 bg-green-500 rounded-t transition-all hover:bg-green-600'
									style={{
										height: `${(item.vocabulary / maxValue) * 100}%`,
										minHeight: item.vocabulary > 0 ? '4px' : '0px',
									}}
									title={`Từ vựng: ${item.vocabulary}`}
								/>
								{/* Grammar bar */}
								<div
									className='flex-1 bg-purple-500 rounded-t transition-all hover:bg-purple-600'
									style={{
										height: `${(item.grammar / maxValue) * 100}%`,
										minHeight: item.grammar > 0 ? '4px' : '0px',
									}}
									title={`Ngữ pháp: ${item.grammar}`}
								/>
							</div>
							<p className='text-xs font-medium'>{item.day}</p>
						</div>
					))}
				</div>

				<CardFooter className='flex items-center justify-center gap-4 pt-4 border-t border-gray-200'>
					<div className='flex items-center gap-2'>
						<div className='h-3 w-3 rounded bg-blue-500' />
						<span className='text-xs'>Bài học</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='h-3 w-3 rounded bg-green-500' />
						<span className='text-xs'>Từ vựng</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='h-3 w-3 rounded bg-purple-500' />
						<span className='text-xs'>Ngữ pháp</span>
					</div>
				</CardFooter>
			</CardContent>
		</Card>
	);
};

export default WeeklyActivityChart;
