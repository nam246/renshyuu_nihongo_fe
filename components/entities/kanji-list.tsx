import { ItemGroup } from '@/components/ui/item';
import { Kanji } from '@/types/types';
import { KanjiCard } from './kanji-card';

export function KanjiList({ kanjis }: { kanjis: Kanji[] }) {
	return (
		<ItemGroup className='grid grid-cols-4 gap-2'>
			{kanjis.map((kanji, index) => (
				<KanjiCard kanji={kanji} key={index} />
			))}
		</ItemGroup>
	);
}
