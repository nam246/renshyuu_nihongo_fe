'use client';

import Link from 'next/link';
import { Grammar } from '@/lib/types';

import { ChevronRight, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemHeader,
	ItemTitle,
	ItemGroup,
} from '@/components/ui/item';
import { toast } from 'sonner';

export default function GrammarsItem({
	grammars,
}: {
	grammars: Grammar[];
}) {
	return (
		<ItemGroup className='grid grid-cols-4 gap-2'>
			{grammars.map((grammar, index) => (
				<Item variant='outline' key={index}>
					<ItemHeader>
						<Badge variant='outline'>{index + 1}</Badge>
						<ItemActions>
							<Button
								variant='outline'
								onClick={() =>
									toast('Item have been Bookmarked', {
										description: 'Sunday, December 03, 2023 at 9:00 AM',
										action: {
											label: 'Undo',
											onClick: () => console.log('Undo'),
										},
									})
								}
							>
								<Bookmark className='text-slate-400 hover:text-blue-500 transition-all' />
							</Button>
						</ItemActions>
					</ItemHeader>
					<ItemContent key={grammar.id}>
						<ItemTitle className='font-bold text-lg text-slate-900'>
							{grammar.pattern}
						</ItemTitle>
						<ItemDescription>→ {grammar.meaning}</ItemDescription>

						<div className='flex-1 min-w-0'>
							{grammar.structure && (
								<div className='mt-1 text-sm text-slate-600 font-mono bg-white px-2 py-1 rounded border border-primary inline-block'>
									{grammar.structure}
								</div>
							)}
							{grammar.explaination && (
								<p className='text-sm text-slate-500 mt-1'>{grammar.explaination}</p>
							)}
						</div>
					</ItemContent>
					<ItemFooter>
						<Link
							className='hover:text-blue-500 hover:translate-x-1 transition-all'
							href={`grammar/${grammar.id}`}
						>
							Xem chi tiết <ChevronRight className='inline' />
						</Link>
					</ItemFooter>
				</Item>
			))}
		</ItemGroup>
	);
}
