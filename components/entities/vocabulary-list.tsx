import { VocabularyCard } from './vocabulary-card';
import { ItemGroup } from '@/components/ui/item';
import { Vocabulary } from '@/types/types';

export function VocabularyList({
	vocabularies,
}: {
	vocabularies: Vocabulary[];
}) {
	return (
		<ItemGroup className='grid grid-cols-4 gap-2'>
			{vocabularies.map((vocabulary, index) => (
				<VocabularyCard vocabulary={vocabulary} key={index} />
			))}
		</ItemGroup>
	);
}
