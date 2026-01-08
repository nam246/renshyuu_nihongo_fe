import { BookOpen } from 'lucide-react';

export default function LearningHeader({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className='space-y-3'>
			<div className='flex items-center gap-3'>
				<div className='p-3 dark:bg-primary rounded-xl shadow-lg'>
					<BookOpen className='w-8 h-8' />
				</div>
				<div>
					<h1 className='text-4xl font-bold '>{title}</h1>
					<p className='mt-1'>{description}</p>
				</div>
			</div>
		</div>
	);
}
