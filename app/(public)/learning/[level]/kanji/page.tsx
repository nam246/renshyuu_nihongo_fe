// import { kanjis, lessons } from '@/lib/mock-data';
import Link from 'next/link';

import LearningHeader from '@/components/layout/learning/learning-header';

import { Bookmark, ChevronRight, AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemTitle,
} from '@/components/ui/item';
import { Lesson, Kanji, Level } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

import LessonItem from '@/components/layout/learning/lesson-items';
import { getLessons, getKanjis } from '@/lib/data';

function KanjisItem({ kanjis }: { kanjis: Kanji[] }) {
	return (
		<ItemGroup className='grid grid-cols-4 gap-2'>
			{kanjis.map((kanji, index) => (
				<Item variant='outline' key={index}>
					<ItemHeader>
						<Badge variant='outline'>{index + 1}</Badge>
						<ItemActions>
							<Button variant='outline' size='sm'>
								<Bookmark />
							</Button>
						</ItemActions>
					</ItemHeader>
					<ItemContent>
						<ItemTitle className='font-bold text-xl'>
							{kanji.character}
							<Button variant='ghost' size='sm'>
								<AudioLines />
							</Button>
						</ItemTitle>

						<ItemDescription>
							{/* Nên thêm cách đọc bằng hiragana katakana */}
							{kanji.kunyomi}
						</ItemDescription>

						<div>{kanji.meaning}</div>
					</ItemContent>
					<ItemFooter>
						<Link
							className='text-slate-400 hover:text-blue-500 hover:translate-x-1 transition-all block flex items-center'
							href={`kanji/${kanji.id}`}
						>
							Xem chi tiết <ChevronRight />
						</Link>
					</ItemFooter>
				</Item>
			))}
		</ItemGroup>
	);
}

export default async function LearningKanjiPage({
	params,
}: {
	params: Promise<{ level: Level }>;
}) {
	const { level } = await params;
	const [lessons, kanjis]: [Lesson[], Kanji[]] = await Promise.all([
		getLessons(level),
		getKanjis(),
	]);

	console.log(kanjis);
	
	const kanjiByLessonId = (lessonId: string): Kanji[] => {
		return kanjis.filter((kanji) => kanji.lessonId === lessonId);
	};
	return (
		<>
			{/* Header */}
			<LearningHeader title={`Kanji ${level}`} description='Từ vựng các cấp độ' />

			<div className='space-y-4'>
				{lessons.length > 0 &&
					lessons.map((lesson, idx) => (
						<LessonItem lesson={lesson} key={idx}>
							<KanjisItem kanjis={kanjiByLessonId(lesson.id)} />
						</LessonItem>
					))}
			</div>
		</>
	);
}
