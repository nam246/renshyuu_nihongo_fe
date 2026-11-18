import { ItemLevelBadge } from '@/components/entities';
import { CopyButton } from '@/components/entities/copy-button';
import { BookmarkedButton } from '@/components/entities/bookmarked-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	Item,
	ItemContent,
	ItemTitle,
	ItemDescription,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Grammar, Level } from '@/types/types';
import { BookOpen } from 'lucide-react';

const GrammarCard = ({ item }: { item: Grammar }) => {
	return (
		<Card>
			{/* Header with level and bookmark */}
			<CardContent className='flex items-start justify-between'>
				<ItemLevelBadge level={item.level} />
				<BookmarkedButton itemId={item.id} itemType='grammar' />
			</CardContent>

			{/* Grammar pattern */}
			<CardContent className=''>
				<div className='flex items-start gap-2 mb-1'>
					<BookOpen className='size-5 text-blue-600 mt-1 shrink-0' />
					<div>
						<h3 className='text-lg font-bold'>{item.pattern}</h3>
						<p className='text-sm mt-1'>Ý nghĩa: {item.meaning}</p>
					</div>
				</div>
			</CardContent>

			{/* Structure */}
			<CardContent className=''>
				<p className='text-sm font-medium mb-2'>Cấu trúc:</p>
				<Item variant='outline' className='text-sm font-mono wrap-break-word'>
					<ItemContent>{item.structure}</ItemContent>
				</Item>
			</CardContent>

			<Separator />

			{/* Explanation */}
			<CardContent className=''>
				<p className='text-sm font-medium mb-2'>Giải thích:</p>
				{/* <p className='text-sm'>{item.explanation}</p> */}
			</CardContent>

			{/* Examples if available */}
			{item.examples && item.examples.length > 0 && (
				<CardContent className=''>
					<p className='text-sm font-medium mb-2'>Ví dụ ({item.examples.length})</p>
					<div className='space-y-2'>
						{item.examples.slice(0, 2).map((example, idx) => (
							<Item variant='outline' key={idx} className='text-sm'>
								<ItemContent>
									{/* <ItemTitle>{example.japanese}</ItemTitle>
									<ItemDescription>{example.vietnamese}</ItemDescription> */}
								</ItemContent>
							</Item>
						))}
						{item.examples.length > 2 && (
							<p className='text-xs text-gray-500'>
								+{item.examples.length - 2} ví dụ khác
							</p>
						)}
					</div>
				</CardContent>
			)}

			<Separator />

			{/* Actions */}
			<CardFooter className='flex gap-2'>
				<CopyButton character={item.pattern} />
			</CardFooter>
		</Card>
	);
};

export default GrammarCard;
