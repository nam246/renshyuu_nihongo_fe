'use client';
import Link from 'next/link';
import { Lesson } from '@/types/types';

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
import { ItemLevelBadge } from '@/components/entities';

export default function LessonItem({
	lesson,
	children,
}: {
	lesson: Lesson;
	children: React.ReactNode;
}) {
	return (
		<Card className='group'>
			<CardHeader>
				<CardTitle className='text-xl font-bold flex items-center gap-1'>
					<BookMarked />
					Bài {lesson.lessonTitle}
				</CardTitle>
				<CardDescription>
					<div className='font-medium flex items-center gap-1'>
						<GraduationCap className='w-4 h-4' />
						{lesson.source}
					</div>
				</CardDescription>
				<CardAction className='flex items-center gap-2'>
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
				{/* <Link
					className='text-slate-400 hover:text-blue-500 hover:translate-x-1 transition-all'
					href={`#`}
				>
					Xem toàn bộ bài {lesson.lessonTitle} <ChevronRight className='inline' />     
				</Link> */}
			</CardFooter>
		</Card>
	);
}
