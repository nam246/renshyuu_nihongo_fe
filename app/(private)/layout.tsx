import { metadata } from '../layout';
import Link from 'next/link';

import {
	FacebookIcon,
	InstagramIcon,
	LanguagesIcon,
	LinkedinIcon,
	TwitterIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import LanguageDropdown from '@/app/(private)/_components/language-dropdown';
import ProfileDropdown from '@/components/layout/dropdown-profile';
import DashBoardSideboardProvider from './_components/dashboard-sideboard-provider';
import PageBreadcrumb from '@/components/layout/breadcrumb';
import ThemeToggle from '@/components/layout/theme-toggle';

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex w-full'>
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
								<ThemeToggle />
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
					<div className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
						{children}
					</div>
					<footer>
						<div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
							<p className='text-sm text-balance max-sm:text-center'>
								{`©${new Date().getFullYear()}`}{' '}
								<Link href='/' className='text-primary'>
									shadcn/studio
								</Link>
								, {metadata.description}
							</p>
							<div className='flex items-center gap-5'>
								<a href='#'>
									<FacebookIcon className='size-4' />
								</a>
								<a href='#'>
									<InstagramIcon className='size-4' />
								</a>
								<a href='#'>
									<LinkedinIcon className='size-4' />
								</a>
								<a href='#'>
									<TwitterIcon className='size-4' />
								</a>
							</div>
						</div>
					</footer>
				</div>
			</DashBoardSideboardProvider>
		</div>
	);
};

export default PrivateLayout;
