import { Grammar, Lesson, Level } from '@/types/types';
import { getLessons, getGrammars } from '@/lib/data';

import PageHeader from '@/components/layout/page-header';
import LessonItem from '@/components/entities/lesson-items';
import { GrammarList } from '@/components/entities';
import FilterBar from '../../_components/filter-bar';

export default async function LearningGrammarPage({
	searchParams,
}: {
	searchParams: Promise<{ level: Level }>;
}) {
	const { level = Level.N5 } = await searchParams;
	let lessons: Lesson[] = [];
	let grammars: Grammar[] = [];
	let error: string | null = null;
	let isNotFound = false;

	try {
		[lessons, grammars] = await Promise.all([getLessons(level), getGrammars()]);
	} catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : 'Failed to load data';
		if (errorMessage.includes('not found') || errorMessage.includes('No')) {
			isNotFound = true;
		} else {
			error = errorMessage;
		}
	}

	const grammarsByLessonId = (lessonId: string) => {
		return grammars.filter((grammar) => grammar.lessonId === lessonId);
	};

	return (
		<>
			{/* Header */}
			<PageHeader
				title='Ngữ pháp tiếng Nhật'
				description='Học các mẫu ngữ pháp từ cơ bản đến nâng cao'
			/>

			<FilterBar />

			{/* Danh sách bài học */}
			<div className='space-y-4'>
				{lessons?.map((lesson, index) => (
					<LessonItem key={index} lesson={lesson}>
						<GrammarList grammars={grammarsByLessonId(lesson.id)} />
					</LessonItem>
				))}
			</div>
		</>
	);
}
