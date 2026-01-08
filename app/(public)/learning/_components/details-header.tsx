import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function DetailsHeader({ title }: { title: string }) {
	return (
		<div className='rounded-lg bg-primary shadow-sm p-4'>
			<div className='flex items-center gap-4'>
				<Link href='/vocabularies'>
					<Button
						variant='ghost'
						size='icon'
						className='hover:bg-slate-100 transition-colors'
					>
						<ArrowLeft className='w-5 h-5' />
					</Button>
				</Link>
				<div className='flex items-center gap-2'>
					<BookOpen className='w-5 h-5' />
					<span className='font-medium'>{title}</span>
				</div>
			</div>
		</div>
	);
}
