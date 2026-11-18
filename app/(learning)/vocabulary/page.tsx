import { getLessons, getVocabularies } from '@/lib/data';
import { Lesson, Level, ResponseData, Vocabulary } from '@/types/types';

import { BookOpen, Filter, Search } from 'lucide-react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import PageHeader from '@/components/layout/page-header';
import LessonItem from '@/components/entities/lesson-items';
import { VocabularyList } from '@/components/entities';
import FilterBar from '@/components/layout/filter-bar';

export default async function LearningVocabularyPage({
	searchParams,
}: {
	searchParams: Promise<{ level: Level }>;
}) {
	const { level = Level.N5 } = await searchParams;
	const [lessons, vocabularies]: [Lesson[], ResponseData<Vocabulary>] =
		await Promise.all([
			getLessons(level),
			getVocabularies({ pageNumber: 1, pageSize: 20 }),
		]);

	const vocabulariesByLessonId = (lessonId: string): Vocabulary[] => {
		return vocabularies.items.filter((v) => v.lessonId === lessonId);
	};

	console.log(lessons);
	

	return (
		<>
			{/* Header */}
			<PageHeader title={`Từ vựng ${level}`} description='Từ vựng các cấp độ' />
			
			<FilterBar />

			<div className='space-y-4'>
				{lessons.length > 0 &&
					lessons.map((lesson, idx) => (
						<LessonItem lesson={lesson} key={idx}>
							<VocabularyList vocabularies={vocabulariesByLessonId(lesson.id)} />
						</LessonItem>
					))}
			</div>
		</>
	);
}
