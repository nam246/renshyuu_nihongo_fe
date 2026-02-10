'use client';
import { usePathname } from 'next/navigation';
import {
	ArrowRightLeftIcon,
	CalendarClockIcon,
	ChartNoAxesCombinedIcon,
	ChartPieIcon,
	ChartSplineIcon,
	ClipboardListIcon,
	Clock9Icon,
	CrownIcon,
	HashIcon,
	SettingsIcon,
	SquareActivityIcon,
	Undo2Icon,
	UsersIcon,
	Library,
	BookOpenIcon,
	Languages
} from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from '@/components/ui/sidebar';

import Logo from '@/components/Logo';
import Link from 'next/link';

type menuSidebarItem = {
	groupTitle: string;
	groupContent: Array<{ icon: React.ReactElement; title: string; url: string }>;
};

const menusSidebar: menuSidebarItem[] = [
	{
		groupTitle: 'My Learning Content',
		groupContent: [
			{
				icon: <Library />,
				title: 'Vocabulary',
				url: '/bookmarked-vocabulary',
			},
			{
				icon: <BookOpenIcon />,
				title: 'Grammar',
				url: '/bookmarked-grammar',
			},
			{
				icon: <Languages />,
				title: 'Kanji',
				url: '/bookmarked-kanji',
			},
		],
	},
	{
		groupTitle: 'Create New Learning Path',
		groupContent: [
			{
				icon: <ChartSplineIcon />,
				title: 'Create New Vocabulary',
				url: '/add-vocabulary',
			},
			{
				icon: <UsersIcon />,
				title: 'Add Another Grammar',
				url: '/add-grammar',
			},
			{
				icon: <ChartPieIcon />,
				title: 'Add Favorites Kanji',
				url: '/add-kanji',
			},
			{
				icon: <HashIcon />,
				title: 'Collected Question',
				url: '/add-question',
			},
			{
				icon: <ArrowRightLeftIcon />,
				title: 'Mocktest Builder',
				url: '/mock-test-builder',
			},
			{
				icon: <ArrowRightLeftIcon />,
				title: 'Go Learning',
				url: '/learning',
			},
			{
				icon: <Clock9Icon />,
				title: 'Go Practice',
				url: '/practice',
			},
			{
				icon: <ClipboardListIcon />,
				title: 'Do Mocktest',
				url: '/mock-test',
			},
			{
				icon: <CrownIcon />,
				title: 'Influencer',
				url: '#',
			},
		],
	},
	{
		groupTitle: 'Profile Overview',
		groupContent: [
			{
				icon: <SquareActivityIcon />,
				title: 'Profile Information',
				url: '/profile',
			},
			{
				icon: <CalendarClockIcon />,
				title: 'Dashboard',
				url: '/dashboard',
			},
			{
				icon: <Undo2Icon />,
				title: 'Activities',
				url: '/activities',
			},
			{
				icon: <SettingsIcon />,
				title: 'Settings & Integrations',
				url: '/settings',
			},
			// Check Role if Admin
			{
				icon: <UsersIcon />,
				title: 'User Management',
				url: '/user-management',
			},
		],
	},
];

export default function DashBoardSideboardProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathName = usePathname();
	console.log(pathName);

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<Link href='/'>
										<Logo />
									</Link>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										isActive={pathName === '/dashboard' ? true : false}
									>
										<Link href='/dashboard'>
											<ChartNoAxesCombinedIcon />
											<span>Dashboard</span>
										</Link>
									</SidebarMenuButton>
									<SidebarMenuBadge className='bg-primary/10 rounded-full'>
										5
									</SidebarMenuBadge>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>

					{menusSidebar.map((menu, idx) => (
						<SidebarGroup key={idx}>
							<SidebarGroupLabel>{menu.groupTitle}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{menu.groupContent.map((content, i) => (
										<SidebarMenuItem key={i}>
											<SidebarMenuButton
												asChild
												isActive={pathName === content.url ? true : false}
											>
												<Link href={content.url}>
													{content.icon}
													<span>{content.title}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
			</Sidebar>
			{children}
		</SidebarProvider>
	);
}
