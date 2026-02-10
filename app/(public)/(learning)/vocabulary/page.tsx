import { getLessons, getVocabularies } from '@/lib/data';
import { Lesson, Level, Vocabulary } from '@/types/types';

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
import LessonItem from '@/components/layout/learning/lesson-items';
import { VocabularyList } from '@/components/entities';
import FilterBar from '../../_components/filter-bar';

export default async function LearningVocabularyPage({
	searchParams,
}: {
	searchParams: Promise<{ level: Level }>;
}) {
	const { level = Level.N5 } = await searchParams;
	const [lessons, vocabularies]: [Lesson[], Vocabulary[]] = await Promise.all([
		getLessons(level),
		getVocabularies(),
	]);

	const vocabulariesByLessonId = (lessonId: string): Vocabulary[] => {
		return vocabularies.filter((v: Vocabulary) => v.lessonId === lessonId);
	};

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
