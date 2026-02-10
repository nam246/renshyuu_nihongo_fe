'use client';

import Link from 'next/link';

import { route } from '@/lib/constant';
import { Level } from '@/types/types';

import {
	CircleCheckIcon,
	CircleHelpIcon,
	CircleIcon,
	Phone,
	Info,
} from 'lucide-react';
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

const learningMenuItems: {
	title: string;
	items: { level: string; href: string; description: string }[];
}[] = [
	{
		title: 'Grammar',
		items: [
			{
				level: Level.N5,
				href: `/grammar?level=${Level.N5}`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N4,
				href: `/grammar?level=${Level.N4}`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N3,
				href: `/grammar?level=${Level.N3}`,
				description: 'Soumatome',
			},
			{
				level: Level.N2,
				href: `/grammar?level=${Level.N2}`,
				description: 'Soumatome',
			},
			{
				level: Level.N1,
				href: `/grammar?level=${Level.N1}`,
				description: 'Soumatome',
			},
		],
	},
	{
		title: 'Vocabulary',
		items: [
			{
				level: Level.N5,
				href: `/vocabulary?level=${Level.N5}`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N4,
				href: `/vocabulary?level=${Level.N4}`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N3,
				href: `/vocabulary?level=${Level.N3}`,
				description: 'Soumatome',
			},
			{
				level: Level.N2,
				href: `/vocabulary?level=${Level.N2}`,
				description: 'Soumatome',
			},
			{
				level: Level.N1,
				href: `/vocabulary?level=${Level.N1}`,
				description: 'Soumatome',
			},
		],
	},
	{
		title: 'Kanji',
		items: [
			{
				level: Level.N5,
				href: `/kanji?level=${Level.N5}`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N4,
				href: `/kanji?level=${Level.N4}`,
				description: 'Minna no Nihongo',
			},
			{
				level: Level.N3,
				href: `/kanji?level=${Level.N3}`,
				description: 'Soumatome',
			},
			{
				level: Level.N2,
				href: `/kanji?level=${Level.N2}`,
				description: 'Soumatome',
			},
			{
				level: Level.N1,
				href: `/kanji?level=${Level.N1}`,
				description: 'Soumatome',
			},
		],
	},
];

const navLinks = [
	{ href: '/', title: 'Trang chủ' },
	{ href: '/grammar', title: 'Ngữ pháp' },
	{ href: '/vocabulary', title: 'Từ vựng' },
	{ href: '/kanji', title: 'Kanji' },
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
							<Link href='/'>Trang chủ</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					{/* Navigation Item 4 */}
					<NavigationMenuItem className='hidden md:block'>
						<NavigationMenuTrigger>Học tập</NavigationMenuTrigger>
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
						<NavigationMenuTrigger>Luyện tập</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[200px] gap-4'>
								<li>
									<NavigationMenuLink asChild>
										<Link href='/flashcards' className='flex-row items-center gap-2'>
											<CircleHelpIcon />
											Flashcards
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='/quick-test' className='flex-row items-center gap-2'>
											<CircleIcon />
											Làm bài kiểm tra ngắn
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='/read-and-listen' className='flex-row items-center gap-2'>
											<CircleCheckIcon />
											Đọc và nghe hiểu
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='/mock-test' className='flex-row items-center gap-2'>
											<CircleCheckIcon />
											Thi thử JLPT
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
						<NavigationMenuTrigger>Thông tin thêm</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[200px] gap-4'>
								<li>
									<NavigationMenuLink asChild>
										<Link href='/info' className='flex-row items-center gap-2'>
											<CircleHelpIcon />
											Về Renshyuu JLPT
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='/about' className='flex-row items-center gap-2'>
											<Info />
											Về chúng tôi
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='/contact' className='flex-row items-center gap-2'>
											<Phone />
											Liên hệ
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href='#' className='flex-row items-center gap-2'>
											<CircleCheckIcon />
											Quick Link
										</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			{/* Navigation for small screens */}
			<div className='flex gap-4 md:hidden'>
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
