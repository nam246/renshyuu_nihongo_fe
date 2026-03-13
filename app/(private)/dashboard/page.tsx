import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getDashboardStats } from '@/lib/data';
import { BookOpenIcon, CheckCircle2, TrendingUp } from 'lucide-react';

import UserStatistics from '../_components/user-statistics';
import LearningStatsCard from '@/app/(private)/_components/learning-stats-card';
import ProgressOverviewCard from '@/app/(private)/_components/progress-overview-card';
import RecentLessonsCard from '@/app/(private)/_components/recent-lessons-card';
import WeeklyActivityChart from '@/app/(private)/_components/weekly-activity-chart';
import StudyTimeCard from '@/app/(private)/_components/study-time-card';
import PageHeader from '@/components/layout/page-header';
import TransactionDatatable from '../_components/datatable-transaction';
import { Level } from '@/types/types';

interface DashboardStats {
	learningStats: {
		lessonsCompleted: number;
		vocabularyLearned: number;
		grammarPatterns: number;
		totalLessons: number;
		totalVocab: number;
		totalGrammar: number;
	};
	progressLevels: {
		level: string;
		total: number;
		completed: number;
	}[];
	recentLessons: {
		id: string;
		title: string;
		level: Level;
		lastStudied: string;
		status: 'in-progress' | 'completed' | 'not-started';
		progress: number;
	}[];
	weeklyActivity: {
		day: string;
		lessons: number;
		vocabulary: number;
		grammar: number;
	}[];
}

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		return (
			<div className='p-8 text-center'>
				Vui lòng đăng nhập để xem bảng điều khiển.
			</div>
		);
	}

	let stats: DashboardStats | null = null;
	try {
		stats = await getDashboardStats(session.user.id);
	} catch (error) {
		console.error('Failed to fetch dashboard stats:', error);
	}

	if (!stats) {
		return (
			<div className='p-8 text-center text-red-500'>
				Không thể tải dữ liệu bảng điều khiển. Vui lòng thử lại sau.
			</div>
		);
	}

	// Learning statistics data mapped from real data
	const learningStatsData = [
		{
			icon: <BookOpenIcon className='size-5' />,
			label: 'Bài học hoàn thành',
			value: stats.learningStats.lessonsCompleted.toString(),
			subtext: `Trong tổng số ${stats.learningStats.totalLessons} bài`,
			trend: 'up' as const,
		},
		{
			icon: <CheckCircle2 className='size-5' />,
			label: 'Từ vựng đã học',
			value: stats.learningStats.vocabularyLearned.toString(),
			subtext: `Trong tổng số ${stats.learningStats.totalVocab} từ`,
			trend: 'up' as const,
		},
		{
			icon: <TrendingUp className='size-5' />,
			label: 'Ngữ pháp',
			value: stats.learningStats.grammarPatterns.toString(),
			subtext: `Trong tổng số ${stats.learningStats.totalGrammar} mẫu`,
			trend: 'neutral' as const,
		},
	];

	// Progress by level with colors
	const levelColors: Record<string, string> = {
		N5: 'bg-blue-500',
		N4: 'bg-green-500',
		N3: 'bg-yellow-500',
		N2: 'bg-orange-500',
		N1: 'bg-red-500',
	};

	const progressLevels = stats.progressLevels.map((pl) => ({
		level: pl.level,
		total: pl.total,
		completed: pl.completed,
		color: levelColors[pl.level] || 'bg-gray-500',
	}));

	return (
		<div className='grid gap-6'>
			{/* Page Title */}
			<PageHeader
				title='Bảng điều khiển'
				description='Theo dõi tiến độ học tập và thống kê của bạn'
			/>

			{/* Learning Statistics Cards */}
			<div className='grid gap-6 sm:grid-cols-1 md:grid-cols-3'>
				{learningStatsData.map((stat, index) => (
					<LearningStatsCard
						key={index}
						icon={stat.icon}
						label={stat.label}
						value={stat.value}
						subtext={stat.subtext}
						trend={stat.trend}
					/>
				))}
			</div>

			{/* User Statistic */}
			<UserStatistics
				lessonsCompleted={stats.learningStats.lessonsCompleted}
				vocabularyLearned={stats.learningStats.vocabularyLearned}
				grammarPatterns={stats.learningStats.grammarPatterns}
				totalStudyHours={0} // Still placeholder
				currentLevel='N5' // Still placeholder
				streak={0} // Still placeholder
			/>

			{/* Progress Overview and Study Time */}
			<div className='grid gap-6 lg:grid-cols-2'>
				<ProgressOverviewCard levels={progressLevels} />
				<StudyTimeCard
					todayMinutes={0}
					weekMinutes={0}
					monthMinutes={0}
					weekTrend={0}
				/>
			</div>

			{/* Recent Lessons */}
			<RecentLessonsCard lessons={stats.recentLessons} />
		</div>
	);
}
