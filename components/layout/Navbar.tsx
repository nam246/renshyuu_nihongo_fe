'use client';

import Link from 'next/link';

import { route } from '@/lib/constant';
import { Level } from '@/lib/types';

import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useIsMobile } from '@/hooks/use-mobile';
import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
// import ProfileDropdown from '@/app/dashboard/_components/dropdown-profile';

const learningMenuItems: {
	title: string;
	items: { level: string; href: string; description: string }[];
}[] = [
	{
		title: 'Grammar',
		items: [
			{
				level: Level.N5,
				href: `${route.learning}/n5/grammar`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N4,
				href: `${route.learning}/n4/grammar`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N3,
				href: `${route.learning}/n3/grammar`,
				description: 'Soumatome',
			},
			{
				level: Level.N2,
				href: `${route.learning}/n2/grammar`,
				description: 'Soumatome',
			},
			{
				level: Level.N1,
				href: `${route.learning}/n1/grammar`,
				description: 'Soumatome',
			},
		],
	},
	{
		title: 'Vocabulary',
		items: [
			{
				level: Level.N5,
				href: `${route.learning}/n5/vocabulary`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N4,
				href: `${route.learning}/n4/vocabulary`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N3,
				href: `${route.learning}/n3/vocabulary`,
				description: 'Soumatome',
			},
			{
				level: Level.N2,
				href: `${route.learning}/n2/vocabulary`,
				description: 'Soumatome',
			},
			{
				level: Level.N1,
				href: `${route.learning}/n1/vocabulary`,
				description: 'Soumatome',
			},
		],
	},
	{
		title: 'Kanji',
		items: [
			{
				level: Level.N5,
				href: `${route.learning}/n5/kanji`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N4,
				href: `${route.learning}/n4/kanji`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N3,
				href: `${route.learning}/n3/kanji`,
				description: 'Soumatome',
			},
			{
				level: Level.N2,
				href: `${route.learning}/n2/kanji`,
				description: 'Soumatome',
			},
			{
				level: Level.N1,
				href: `${route.learning}/n1/kanji`,
				description: 'Soumatome',
			},
		],
	},
];
const navLinks = [
	{ href: route.home, title: 'Trang chủ' },
	{ href: route.learning, title: 'Học tập' },
	{ href: route.practice, title: 'Luyện tập' },
	{ href: route.mockTest, title: 'Bảng xếp hạng' },
];

export default function Navbar() {
	const isMobile = useIsMobile();

	return (
		<>
			<NavigationMenu viewport={isMobile}>
				<NavigationMenuList className='flex-wrap'>
					{/* Navigation Item 3 */}
					<NavigationMenuItem>
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
							<Link href='/'>Home</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					{/* Navigation Item 4 */}
					<NavigationMenuItem className='hidden md:block'>
						<NavigationMenuTrigger>Learning</NavigationMenuTrigger>
						<NavigationMenuContent>
							<div className='grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-3 lg:w-[600px]'>
								{learningMenuItems.map((item, index) => (
									<ul key={item.title + index} className=''>
										{item.items.map((i, itr) => (
											<li key={itr}>
												<NavigationMenuLink asChild>
													<Link href={i.href}>
														<div className='font-medium'>{item.title + ` ` + i.level}</div>
														<div className='text-muted-foreground'>{i.description}</div>
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								))}
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>

					{/* Navigation Item 6 */}
					<NavigationMenuItem className='hidden md:block'>
						<NavigationMenuTrigger>Practice</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[200px] gap-4'>
								<li>
									<NavigationMenuLink asChild>
										<Link href={`${route.practice}/n5`} className='flex-row items-center gap-2'>
											<CircleHelpIcon />
											Vocabulary
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='#' className='flex-row items-center gap-2'>
											<CircleIcon />
											Grammar
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='#' className='flex-row items-center gap-2'>
											<CircleCheckIcon />
											Reading
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='#' className='flex-row items-center gap-2'>
											<CircleCheckIcon />
											Listening
										</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>

					{/* Navigation Item 4 */}
					<NavigationMenuItem className='hidden md:block'>
						<NavigationMenuTrigger>Thi thử</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[300px] gap-4'>
								<li>
									<NavigationMenuLink asChild>
										<Link href={route.mockTest}>
											<div className='font-medium'>JLPT</div>
											<div className='text-muted-foreground'>
												Kỳ thi uy tín và được công nhận rộng rãi nhất.
											</div>
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='#'>
											<div className='font-medium'>NAT-TEST</div>
											<div className='text-muted-foreground'>
												Kết quả nhanh hơn, phù hợp để du học.
											</div>
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='#'>
											<div className='font-medium'>TOP-J</div>
											<div className='text-muted-foreground'>
												Chia theo Sơ cấp - Trung cấp - Cao cấp, tập trung vào tiếng Nhật
												thực tế cho cuộc sống và công việc.
											</div>
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='#'>
											<div className='font-medium'>J-TEST (Thực dụng Nhật ngữ)</div>
											<div className='text-muted-foreground'>
												Đánh giá năng lực tiếng Nhật thực tế, không có khái niệm đỗ/trượt,
												chỉ có điểm số tương ứng với các cấp độ.
											</div>
										</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>

					{/* Navigation Item 5 */}
					<NavigationMenuItem className='hidden md:block'>
						<NavigationMenuTrigger>About</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[200px] gap-4'>
								<li>
									<NavigationMenuLink asChild>
										<Link href='#'>Renshyuu JLPT</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='#'>Us</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='#'>Blocks</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			{/* Login Button */}
			<div className='flex align-center justify-between'>
				{/* <ProfileDropdown
					trigger={
						<Button variant='ghost' size='icon' className='size-9.5'>
							<Avatar className='size-9.5 rounded-md'>
								<AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
						</Button>
					}
				/> */}
				<Button className='rounded-lg max-md:hidden' asChild>
					<Link href='/login'>Login</Link>
				</Button>
			</div>

			{/* Navigation for small screens */}
			<div className='flex gap-4 md:hidden'>
				<Button className='rounded-lg' asChild>
					<Link href='/login'>Login</Link>
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='icon'>
							<MenuIcon />
							<span className='sr-only'>Menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56' align='end'>
						{navLinks.map((item, index) => (
							<DropdownMenuItem key={index}>
								<Link href={item.href}>{item.title}</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	);
}
