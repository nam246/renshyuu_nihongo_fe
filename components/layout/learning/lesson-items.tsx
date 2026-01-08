'use client';
import Link from 'next/link';
import { Lesson, Level } from '@/lib/types';

import {
	GraduationCap,
	ChevronRight,
	BookMarked,
	Bookmark,
} from 'lucide-react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const getLevelColor = (level: Level) => {
	switch (level) {
		case Level.N5:
			return 'bg-emerald-500/10 text-emerald-700 border-emerald-200 hover:bg-emerald-500/20';
		case Level.N4:
			return 'bg-blue-500/10 text-blue-700 border-blue-200 hover:bg-blue-500/20';
		case Level.N3:
			return 'bg-purple-500/10 text-purple-700 border-purple-200 hover:bg-purple-500/20';
		case Level.N2:
			return 'bg-orange-500/10 text-orange-700 border-orange-200 hover:bg-orange-500/20';
		case Level.N1:
			return 'bg-red-500/10 text-red-700 border-red-200 hover:bg-red-500/20';
		default:
			return 'bg-gray-500/10 text-gray-700 border-gray-200 hover:bg-gray-500/20';
	}
};
export default function LessonItem({
	lesson,
	children,
}: {
	lesson: Lesson;
	children: React.ReactNode;
}) {
	return (
		<Card className='group hover:shadow-lg transition-all duration-300 cursor-pointer'>
			<CardHeader>
				<CardTitle className='text-xl font-bold flex items-center gap-1'>
					<BookMarked />
					Bài {lesson.lessonTitle}
				</CardTitle>
				<CardDescription>
					{lesson.source}
					<div className='font-medium flex items-center gap-1'>
						<GraduationCap className='w-4 h-4' />
					</div>
				</CardDescription>
				<CardAction className='flex items-center gap-2'>
					<Badge variant='outline' className={`${getLevelColor(lesson.level)}`}>
						{lesson.level}
					</Badge>
					<Button
						variant='outline'
						onClick={() =>
							toast('Item have been Bookmarked', {
								description: 'Sunday, December 03, 2023 at 9:00 AM',
								action: {
									label: 'Undo',
									onClick: () => console.log('Undo'),
								},
							})
						}
					>
						<Bookmark className='text-slate-400 hover:text-blue-500 transition-all' />
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent>
				<div className='space-y-2'>
					{/* Danh sách các pattern ngữ pháp */}
					{/* map Component ItemGroup vào đây */}
					{/* Thả dữ liệu với lessonId */}
					{children}
				</div>
			</CardContent>

			<CardFooter>
				<Link
					className='text-slate-400 hover:text-blue-500 hover:translate-x-1 transition-all'
					href={`grammar/${lesson.id}?isLesson=true`}
				>
					Xem toàn bộ bài {lesson.lessonTitle} <ChevronRight className='inline' />
				</Link>
			</CardFooter>
		</Card>
	);
}
