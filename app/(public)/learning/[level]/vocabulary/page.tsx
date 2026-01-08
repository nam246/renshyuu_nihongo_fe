import { getLessons, getVocabularies } from '@/lib/data';
import { Lesson, Level, Vocabulary } from '@/lib/types';

import LearningHeader from '@/components/layout/learning/learning-header';
import LessonItem from '@/components/layout/learning/lesson-items';
import VocabularyItem from '../../_components/vocabularies-item';

export default async function LearningVocabularyPage({
	params,
}: {
	params: Promise<{ level: Level }>;
}) {
	const { level } = await params;
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
			<LearningHeader
				title={`Từ vựng ${level}`}
				description='Từ vựng các cấp độ'
			/>

			<div className='space-y-4'>
				{lessons.length > 0 &&
					lessons.map((lesson, idx) => (
						<LessonItem lesson={lesson} key={idx}>
							<VocabularyItem vocabularies={vocabulariesByLessonId(lesson.id)} />
						</LessonItem>
					))}
			</div>
		</>
	);
}
