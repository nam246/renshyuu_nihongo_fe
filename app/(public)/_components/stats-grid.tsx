import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Grammar, Kanji, Lesson, Vocabulary } from '@/types/types';

export default function StatsGrid({
	items,
}: {
	items: Lesson[] | Vocabulary[] | Kanji[] | Grammar[];
}) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
			<Card>
				<CardHeader>
					<CardTitle className='text-3xl font-bold text-blue-600'>
						{items.length}
					</CardTitle>
					<CardDescription>Tổng số bài học</CardDescription>
				</CardHeader>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className='text-3xl font-bold text-emerald-600'>
						{items.reduce((sum, l) => sum + items.length, 0)}
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
	);
}
