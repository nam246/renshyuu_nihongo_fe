import { Grammar } from '@/types/types';
import { ItemGroup } from '@/components/ui/item';
import { GrammarCard } from '@/components/entities/grammar-card';

export function GrammarList({ grammars }: { grammars: Grammar[] }) {
	return (
		<ItemGroup className='grid grid-cols-4 gap-2'>
			{grammars.map((grammar, index) => (
				<GrammarCard grammar={grammar} key={index} />
			))}
		</ItemGroup>
	);
}
