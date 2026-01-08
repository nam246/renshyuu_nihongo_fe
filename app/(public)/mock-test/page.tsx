import Link from 'next/link';
import { Level } from '@/lib/types';
import { route } from '@/lib/constant';

export default function MockTestPage() {
	return (
		<div className='container mx-auto'>
			<ul>
				<li>
					<Link href={`${route.mockTest}/${Level.N5}`}>Test N5</Link>
				</li>
				<li>
					<Link href={`${route.mockTest}/${Level.N4}`}>Test N4</Link>
				</li>
				<li>
					<Link href={`${route.mockTest}/${Level.N3}`}>Test N3</Link>
				</li>
				<li>
					<Link href={`${route.mockTest}/${Level.N2}`}>Test N2</Link>
				</li>
			</ul>
		</div>
	);
}
