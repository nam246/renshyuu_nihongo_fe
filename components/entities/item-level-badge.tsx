import { Badge } from '@/components/ui/badge';
import { Level } from '@/types/types';

export function ItemLevelBadge({ level }: { level: Level }) {
	const getLevelColor = (level: Level) => {
		switch (level) {
			case Level.N5:
				return 'bg-green-100 text-green-800';
			case Level.N4:
				return 'bg-blue-100 text-blue-800';
			case Level.N3:
				return 'bg-yellow-100 text-yellow-800';
			case Level.N2:
				return 'bg-orange-100 text-orange-800';
			case Level.N1:
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};
	return (
		<Badge
			className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getLevelColor(
				level,
			)}`}
		>
			{level}
		</Badge>
	);
}
