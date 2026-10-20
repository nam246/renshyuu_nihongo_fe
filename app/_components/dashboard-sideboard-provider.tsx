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
	Languages,
	Sparkles,
	Zap,
	Headphones,
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

import Logo from '@/components/Logo';
import Link from 'next/link';

type menuSidebarItem = {
	groupTitle: string;
	groupContent: Array<{ icon: React.ReactElement; title: string; url: string }>;
};

const menusSidebar: menuSidebarItem[] = [
	{
		groupTitle: 'Học tập',
		groupContent: [
			{
				icon: <BookOpenIcon />,
				title: 'Ngữ pháp',
				url: '/grammar',
			},
			{
				icon: <Library />,
				title: 'Từ vựng',
				url: '/vocabulary',
			},
			{
				icon: <Languages />,
				title: 'Kanji',
				url: '/kanji',
			},
		],
	},
	{
		groupTitle: 'Luyện tập',
		groupContent: [
			{
				icon: <Sparkles />,
				title: 'Flashcards',
				url: '/flashcards',
			},
			{
				icon: <Zap />,
				title: 'Kiểm tra nhanh',
				url: '/quick-test',
			},
			{
				icon: <ClipboardListIcon />,
				title: 'Bài thi thử (JLPT)',
				url: '/mock-test',
			},
			{
				icon: <Headphones />,
				title: 'Đọc & Nghe',
				url: '/read-and-listen',
			},
		],
	},
	{
		groupTitle: 'Bookmarks',
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
		groupTitle: 'Create New Content',
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
									Trình dộ hiện tại
									<Select
										defaultValue={Level.N5}
										// onValueChange={(value) => updateLevelParams(value)}
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
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										isActive={pathName === '/lesson' ? true : false}
									>
										<Link href='/lesson'>
											<ChartNoAxesCombinedIcon />
											<span>Học theo giáo trình</span>
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
