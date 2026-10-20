'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Level } from '@/types/types';
import Link from 'next/link';

export default function FilterBar() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const updateLevelParams = (level: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('level', level);
		router.replace(`?${params.toString()}`);
		console.log(params);
	};

	return (
		// Example layout structure
		// nếu user đã có level thì selected là level của user
		<div className='mb-4 space-y-4'>
			<div className='flex flex-col sm:flex-row gap-4'>
				{/* <div className='relative flex-1'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
					<Input placeholder='Tìm kiếm bài học...' className='pl-10' />
				</div> */}
				<div className='flex gap-2'>
					<ButtonGroup>
						<Button variant={pathname === '/grammar' ? 'default' : 'outline'}>
							<Link href={'/grammar'}>Grammar</Link>
						</Button>
						<Button variant={pathname === '/vocabulary' ? 'default' : 'outline'}>
							<Link href={'/vocabulary'}>Vocabulary</Link>
						</Button>
						<Button variant={pathname === '/kanji' ? 'default' : 'outline'}>
							<Link href={'/kanji'}>Kanji</Link>
						</Button>
					</ButtonGroup>
					<Select
						defaultValue={Level.N5}
						onValueChange={(value) => updateLevelParams(value)}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Tất cả cấp độ' />
						</SelectTrigger>
						<SelectContent>
							{Object.values(Level).map((lvl, index) => (
								<SelectItem key={index} value={lvl}>
									{lvl}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
