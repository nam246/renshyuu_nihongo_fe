import { Button } from '@/components/ui/button';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item';
import { BookOpen, Volume2 } from 'lucide-react';
import { Example } from '@/lib/types';

export default function Examples({ examples }: { examples: Example[] }) {
	return (
		<>
			{examples.length === 0 ? (
				<div className='text-center py-12'>
					<BookOpen className='w-12 h-12 mx-auto mb-3 opacity-30' />
					<p>Chưa có ví dụ nào cho từ vựng này</p>
				</div>
			) : (
				<div className='space-y-4'>
					{examples.map((example, index) => {
						if (!examples) return null;

						return (
							<Item
								key={index}
								variant='outline'
								className='hover:shadow-md transition-all duration-200 hover:border-blue-300'
							>
								<ItemContent className='p-4'>
									<div className='flex items-start gap-3'>
										<div className='shrink-0 w-8 h-8 rounded-full flex items-center justify-center  font-semibold text-sm'>
											{index + 1}
										</div>
										<div className='flex-1 space-y-2'>
											<ItemTitle className='text-lg font-medium leading-relaxed'>
												{example.title}
											</ItemTitle>
											<ItemDescription className='text-base leading-relaxed'>
												{example.description}
											</ItemDescription>
										</div>
										<Button
											variant='ghost'
											size='icon'
											className='shrink-0 hover:bg-blue-50'
										>
											<Volume2 className='w-4 h-4' />
										</Button>
									</div>
								</ItemContent>
							</Item>
						);
					})}
				</div>
			)}
		</>
	);
}
