import { Level } from '@/lib/types';
import Link from 'next/link';

export default function JLPTLevelPage({
	params,
}: {
	params: { level: Level };
}) {
	const { level } = params;

	const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

	return (
		<div className=''>
			<ul>
				{levels.map((lvl, index) => (
					<li key={index}>
						<Link href={`learning/${lvl}/grammar`}>{`Cap độ ${lvl}`}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
