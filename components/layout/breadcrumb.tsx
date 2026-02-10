'use client';

import { usePathname } from 'next/navigation';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function PageBreadcrumb() {
	const pathname = usePathname() ?? '/';
	const segments = pathname.split('/').filter(Boolean);

	function formatSegment(seg: string) {
		const decoded = decodeURIComponent(seg);
		return decoded.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
	}

	return (
		<Breadcrumb className='py-2 hidden sm:block'>
			<BreadcrumbList>
				<BreadcrumbItem key='home'>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>
				{segments.length > 0 && <BreadcrumbSeparator key='sep-home' />}
				{segments.map((segment, index) => {
					const href = '/' + segments.slice(0, index + 1).join('/');
					const isLast = index === segments.length - 1;
					return [
						<BreadcrumbItem key={`item-${href}`}>
							{isLast ? (
								<BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={href}>{formatSegment(segment)}</BreadcrumbLink>
							)}
						</BreadcrumbItem>,
						!isLast && <BreadcrumbSeparator key={`sep-${href}`} />,
					];
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
