import { WordType } from '@/types/types';
import { Badge } from '@/components/ui/badge';

export function ItemWordTypeBadge({ wordType }: { wordType: WordType }) {
	const getWordTypeColor = (type: string) => {
		switch (type) {
			case 'danh từ':
			case 'noun':
				return 'text-purple-600';
			case 'động từ':
			case 'verb':
				return 'text-blue-600';
			case 'tính từ':
			case 'adjective':
				return 'text-green-600';
			default:
				return 'text-gray-600';
		}
	};
	return (
		<Badge
			variant='secondary'
			className={`inline-block px-2 py-1 rounded text-xs font-medium ${getWordTypeColor(
				wordType,
			)}`}
		>
			{wordType.toLowerCase()}
		</Badge>
	);
}
