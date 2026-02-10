'use client';

import { ItemLevelBadge } from '@/components/entities';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item';
import { Level } from '@/types/types';
import { CheckCircle2, Clock, BookOpen } from 'lucide-react';

interface RecentLesson {
	id: string;
	title: string;
	level: Level;
	lastStudied: string;
	status: 'completed' | 'in-progress' | 'not-started';
	progress: number;
}

interface RecentLessonsCardProps {
	lessons: RecentLesson[];
	title?: string;
}

const RecentLessonsCard = ({
	lessons,
	title = 'Bài học gần đây',
}: RecentLessonsCardProps) => {
	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'completed':
				return <CheckCircle2 className='size-4 text-green-600' />;
			case 'in-progress':
				return <Clock className='size-4 text-blue-600' />;
			default:
				return <BookOpen className='size-4 text-gray-400' />;
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case 'completed':
				return 'Hoàn thành';
			case 'in-progress':
				return 'Đang học';
			default:
				return 'Chưa bắt đầu';
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>Các bài học mới nhất của bạn</CardDescription>
			</CardHeader>

			<CardContent className='grid grid-cols-2 gap-4'>
				{lessons.map((lesson) => (
					<Item variant='outline' key={lesson.id}>
						<ItemMedia>{getStatusIcon(lesson.status)}</ItemMedia>
						<ItemContent>
							<ItemTitle>{lesson.title}</ItemTitle>
							<div className='flex items-center gap-2'>
								<ItemLevelBadge level={lesson.level} />
								<span>{lesson.lastStudied}</span>
							</div>
							{/* <ItemDescription></ItemDescription> */}
						</ItemContent>
						<ItemActions>
							<p className='text-sm font-semibold'>{lesson.progress}%</p>
							<p className='text-xs text-gray-600'>{getStatusLabel(lesson.status)}</p>
						</ItemActions>
					</Item>
				))}
			</CardContent>
		</Card>
	);
};

export default RecentLessonsCard;
