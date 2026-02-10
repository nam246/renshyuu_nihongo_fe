import Link from 'next/link';
import { Level } from '@/types/types';
import { route } from '@/lib/constant';

import { ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/layout/page-header';
import { ItemLevelBadge } from '@/components/entities/item-level-badge';
import TestDetail from '@/components/test-detail/test-detail';

const mockTestList = [
	
]

export default async function MockTestListPage({
	searchParams,
}: {
	searchParams: Promise<{ level: Level }>;
}) {
	const { level } = await searchParams;
	return (
		<>
			<PageHeader
				title='Chọn cấp độ làm bài thi'
				description='Danh sách bài thi'
			/>
			<div className='grid grid-cols-3 gap-4'>
				<MockTestCard title='Test N5' description='Test N5' level={Level.N5} />
				<MockTestCard title='Test N4' description='Test N4' level={Level.N4} />
				<MockTestCard title='Test N3' description='Test N3' level={Level.N3} />
				<MockTestCard title='Test N2' description='Test N2' level={Level.N2} />
				<MockTestCard title='Test N1' description='Test N1' level={Level.N1} />
			</div>
		</>
	);
}

function MockTestCard({
	title,
	description,
	level,
}: {
	title: string;
	description: string;
	level: Level;
}) {
	return (
		<Card className={`group h-full`}>
			<CardHeader>
				<ItemLevelBadge level={level} />
				<CardTitle className='text-xl mb-1'>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
				<CardAction>
					<ChevronRight className='w-6 h-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all' />
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className='space-y-3'>
					<div className='flex items-center justify-between text-sm'>
						<span className='text-slate-600 dark:text-slate-400'>Tiến độ</span>
						{/* <Badge variant="secondary" className={level.textColor}>
								{level.learnedWords}/{level.totalWords} từ
							</Badge> */}
					</div>
					<Progress value={20} className='h-2' />
					{/* <div className="text-right text-xs text-slate-500">
							hoàn thành
						</div> */}
				</div>
			</CardContent>
			<CardFooter>
				{/* <TestDetail /> */}
			</CardFooter>
		</Card>
	);
}
