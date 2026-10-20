import PageHeader from '@/components/layout/page-header';
import { Filter, Search } from 'lucide-react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lesson, Kanji, Level } from '@/types/types';
import LessonItem from '@/components/entities/lesson-items';
import { getLessons, getKanjis } from '@/lib/data';
import { KanjiList } from '@/components/entities';
import FilterBar from '../../_components/filter-bar';

export default async function LearningKanjiPage({
	searchParams,
}: {
	searchParams: Promise<{ level: Level }>;
}) {
	const { level = Level.N5 } = await searchParams;
	const [lessons, kanjis]: [Lesson[], Kanji[]] = await Promise.all([
		getLessons(level),
		getKanjis(),
	]);

	const kanjiByLessonId = (lessonId: string): Kanji[] => {
		return kanjis.filter((kanji) => kanji.lessonId === lessonId);
	};
	return (
		<>
			{/* Header */}
			<PageHeader title={`Kanji ${level}`} description='Từ vựng các cấp độ' />

			<FilterBar />

			<div className='space-y-4'>
				{lessons.length > 0 &&
					lessons.map((lesson, idx) => (
						<LessonItem lesson={lesson} key={idx}>
							<KanjiList kanjis={kanjiByLessonId(lesson.id)} />
						</LessonItem>
					))}
			</div>
		</>
	);
}
