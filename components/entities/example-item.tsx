import { Button } from '@/components/ui/button';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item';
import { BookOpen, Volume2 } from 'lucide-react';
import { Example } from '@/types/types';
import { AudioButton } from './audio-button';

export function ExampleItem({ example }: { example: Example }) {
	return (
		<Item
			variant='outline'
			className='hover:shadow-md transition-all duration-200 hover:border-blue-300'
		>
			<ItemContent className='p-4'>
				<div className='flex items-start gap-3'>
					<div className='shrink-0 w-8 h-8 rounded-full flex items-center justify-center  font-semibold text-sm'>
						{/* {index + 1} */}
					</div>
					<div className='flex-1 space-y-2'>
						<ItemTitle className='text-lg font-medium leading-relaxed'>
							{example.title}
						</ItemTitle>
						<ItemDescription className='text-base leading-relaxed'>
							{example.description}
						</ItemDescription>
					</div>
					<AudioButton word={example.title} />
				</div>
			</ItemContent>
		</Item>
	);
}
