import Link from 'next/link';
import { getVocabularyById } from '@/lib/data';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Volume2 } from 'lucide-react';
import DetailsNotFound from '../../../_components/details-not-found';
import Examples from '../../../_components/examples';
import DetailsHeader from '../../../_components/details-header';

export default async function VocabularyDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const vocabulary = await getVocabularyById(id);

	// Handle không tìm thấy từ vựng
	if (!vocabulary) {
		return (
			<DetailsNotFound
				title='Không tìm thấy từ vựng'
				description='Từ vựng bạn đang tìm kiếm không tồn tại.'
			/>
		);
	}

	return (
		<>
			{/* Header với gradient và shadow */}
			<DetailsHeader title='Chi tiết từ vựng' />

			{/* Main Content Card */}
			<Card className='shadow-lg border-0 overflow-hidden'>
				{/* Header với gradient background */}
				<div className='bg-primary p-6'>
					<div className='space-y-3'>
						<div className='flex items-start justify-between'>
							<div className='space-y-2 flex-1'>
								<h1 className='text-4xl font-bold tracking-tight'>{vocabulary.word}</h1>
								<p className='text-xl font-light'>{vocabulary.romaji}</p>
							</div>
							<Button variant='secondary' size='icon'>
								<Volume2 className='w-5 h-5' />
							</Button>
						</div>
						<Badge variant='secondary'>{vocabulary.wordType}</Badge>
					</div>
				</div>

				<CardHeader className='border-b'>
					<CardTitle className='text-lg font-semibold flex items-center gap-2'>
						<BookOpen className='w-5 h-5' />
						Ví dụ câu ({vocabulary.examples.length})
					</CardTitle>
					<CardDescription>
						Các ví dụ sử dụng từ vựng trong ngữ cảnh thực tế
					</CardDescription>
				</CardHeader>

				<CardContent className='p-6'>
					<Examples examples={vocabulary.examples} />
				</CardContent>
			</Card>

			<CardFooter className='gap-3 justify-end'>
				<Link href='/vocabularies'>
					<Button variant='outline'>
						<ArrowLeft className='w-4 h-4' />
						Quay lại
					</Button>
				</Link>
				<Button>
					<BookOpen className='w-4 h-4' />
					Thêm vào bộ học
				</Button>
			</CardFooter>
		</>
	);
}
