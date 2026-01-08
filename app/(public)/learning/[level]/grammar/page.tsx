import { Grammar, Lesson, Level } from '@/lib/types';
import { getLessons, getGrammars } from '@/lib/data';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import LessonItem from '@/components/layout/learning/lesson-items';
import LearningHeader from '@/components/layout/learning/learning-header';
import GrammarItems from '../../_components/grammars-item';

export default async function LearningGrammarPage({
	params,
}: {
	params: Promise<{ level: Level }>;
}) {
	const { level } = await params;
	const [lessons, grammars]: [Lesson[], Grammar[]] = await Promise.all([
		getLessons(level),
		getGrammars(),
	]);

	const grammarsByLessonId = (lessonId: string) => {
		return grammars.filter((grammar) => grammar.lessonId === lessonId);
	};

	return (
		<>
			{/* Header */}
			<LearningHeader
				title='Ngữ pháp tiếng Nhật'
				description='Học các mẫu ngữ pháp từ cơ bản đến nâng cao'
			/>

			{/* Stats */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<Card>
					<CardHeader>
						<CardTitle className='text-3xl font-bold text-blue-600'>
							{lessons.length}
						</CardTitle>
						<CardDescription>Tổng số bài học</CardDescription>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-3xl font-bold text-emerald-600'>
							{lessons.reduce((sum, l) => sum + grammars.length, 0)}
						</CardTitle>
						<CardDescription>Mẫu ngữ pháp</CardDescription>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-3xl font-bold text-purple-600'>N5</CardTitle>
						<CardDescription>Trình độ hiện tại</CardDescription>
					</CardHeader>
				</Card>
			</div>

			{/* Danh sách bài học */}
			<div className='space-y-4'>
				{lessons.map((lesson, index) => (
					<LessonItem key={index} lesson={lesson}>
						<GrammarItems grammars={grammarsByLessonId(lesson.id)} />
					</LessonItem>
				))}
			</div>
		</>
	);
}
