'use client';
import { Card, CardContent } from '@/components/ui/card';

import { Label, Pie, PieChart } from 'recharts';

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

interface UserStatisticsProps {
	lessonsCompleted: number;
	vocabularyLearned: number;
	grammarPatterns: number;
	totalStudyHours: number;
	currentLevel: string;
	streak: number;
}

const revenueChartConfig = {
	sales: {
		label: 'Sales',
	},
	january: {
		label: 'January',
		color: 'var(--primary)',
	},
	february: {
		label: 'February',
		color: 'color-mix(in oklab, var(--primary) 60%, transparent)',
	},
	march: {
		label: 'March',
		color: 'color-mix(in oklab, var(--primary) 20%, transparent)',
	},
} satisfies ChartConfig;

const UserStatistics = ({ currentLevel, streak }: UserStatisticsProps) => {
	const revenueChartData = [
		{ month: 'january', sales: 340, fill: 'var(--color-january)' },
		{ month: 'february', sales: 200, fill: 'var(--color-february)' },
		{ month: 'march', sales: 200, fill: 'var(--color-march)' },
	];
	return (
		<Card>
			<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Current Level */}
				<div>
					<p className='text-sm mb-2'>Trình độ hiện tại</p>
					<div className='flex items-center gap-4'>
						<ChartContainer
							config={revenueChartConfig}
							className='relative h-38.5 w-38.5'
						>
							<PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent hideLabel />}
								/>
								<Pie
									data={revenueChartData}
									dataKey='sales'
									nameKey='month'
									startAngle={300}
									endAngle={660}
									innerRadius={58}
									outerRadius={75}
									paddingAngle={2}
								>
									<Label
										content={({ viewBox }) => {
											if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
												return (
													<text
														x={viewBox.cx}
														y={viewBox.cy}
														textAnchor='middle'
														dominantBaseline='middle'
													>
														<tspan
															x={viewBox.cx}
															y={(viewBox.cy || 0) - 12}
															className='fill-card-foreground text-lg font-medium'
														>
															256.24
														</tspan>
														<tspan
															x={viewBox.cx}
															y={(viewBox.cy || 0) + 19}
															className='fill-muted-foreground text-sm'
														>
															Total Profit
														</tspan>
													</text>
												);
											}
										}}
									/>
								</Pie>
							</PieChart>
						</ChartContainer>
						<div>
							<p className='text-3xl font-bold'>{currentLevel}</p>
							<p className='text-sm mt-1'>Tiếp tục học để lên cấp</p>
							<Progress value={(currentLevel.charCodeAt(1) - 48) * 10} />
							<p className='text-xs mt-1'>75% đến N4</p>
						</div>
					</div>
				</div>

				{/* Learning Streak */}
				<div>
					<p className='text-sm mb-2'>Streak học tập</p>
					<div className='flex flex-col items-center justify-center p-4 bg-linear-to-br from-orange-50 to-red-50 rounded-lg'>
						<p className='text-4xl font-bold text-red-600'>{streak}</p>
						<p className='text-sm text-gray-600 mt-1'>Ngày liên tiếp</p>
						<p className='text-xs text-gray-500 mt-2'>🔥 Hãy tiếp tục duy trì!</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default UserStatistics;
