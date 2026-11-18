'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import ProfileDropdown from '@/components/layout/dropdown-profile';
import DashBoardSideboardProvider from './dashboard-sideboard-provider';
import PageBreadcrumb from '@/components/layout/breadcrumb';
import { NotificationDropdown } from '@/components/layout/dropdown-notification';

export default function MainLayoutShell({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isAuthPage =
		pathname?.startsWith('/login') || pathname?.startsWith('/register');

	if (isAuthPage) {
		return <main className='min-h-screen w-full'>{children}</main>;
	}

	return (
		<div className='flex w-full min-h-screen'>
			<DashBoardSideboardProvider>
				<div className='flex flex-1 flex-col'>
					<header className='bg-card sticky top-0 z-50 border-b'>
						<div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
							<div className='flex items-center gap-4'>
								<SidebarTrigger className='[&_svg]:!size-5' />
								<Separator orientation='vertical' className='hidden !h-4 sm:block' />
								<PageBreadcrumb />
							</div>
							<div className='flex items-center gap-1.5'>
								<NotificationDropdown />
								<ProfileDropdown
									trigger={
										<Button variant='ghost' size='icon' className='size-9.5'>
											<Avatar className='size-9.5 rounded-md'>
												<AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
												<AvatarFallback>JD</AvatarFallback>
											</Avatar>
										</Button>
									}
								/>
							</div>
						</div>
					</header>
					<main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
						{children}
					</main>
					<footer>
						<div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
							<p className='text-sm text-balance max-sm:text-center'>
								{`©${new Date().getFullYear()}`}{' '}
								<Link href='/' className='text-primary'>
									Renshyuu
								</Link>
								, Japanese Language Learning and JLPT Examination Practice
							</p>
							<div className='flex items-center gap-5' />
						</div>
					</footer>
				</div>
			</DashBoardSideboardProvider>
		</div>
	);
}
