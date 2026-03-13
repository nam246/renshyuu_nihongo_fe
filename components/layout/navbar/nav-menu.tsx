'use client';

import Link from 'next/link';

import { route } from '@/lib/constant';
import { Level } from '@/types/types';

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

const learningMenuItems: {
    title: string;
    items: { level: string; href: string; description: string }[];
}[] = [
        {
            title: 'Grammar',
            items: [
                {
                    level: Level.N5,
                    href: `/grammar?level=N5`,
                    description: 'Minna no Nihongo',
                },
                {
                    level: Level.N4,
                    href: `/grammar?level=N4`,
                    description: 'Minna no Nihongo',
                },
                {
                    level: Level.N3,
                    href: `/grammar?level=N3`,
                    description: 'Soumatome',
                },
                {
                    level: Level.N2,
                    href: `/grammar?level=N2`,
                    description: 'Soumatome',
                },
                {
                    level: Level.N1,
                    href: `/grammar?level=N1`,
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
                    href: `kanji?level=${Level.N5}`,
                    description: 'Minna no Nihongo',
                },
                {
                    level: Level.N4,
                    href: `kanji?level=${Level.N4}`,
                    description: 'Minna no Nihongo',
                },
                {
                    level: Level.N3,
                    href: `kanji?level=${Level.N3}`,
                    description: 'Soumatome',
                },
                {
                    level: Level.N2,
                    href: `kanji?level=${Level.N2}`,
                    description: 'Soumatome',
                },
                {
                    level: Level.N1,
                    href: `kanji?level=${Level.N1}`,
                    description: 'Soumatome',
                },
            ],
        },
    ];

import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";

export const NavMenu = (props: NavigationMenuProps) => (
    <NavigationMenu {...props}>
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
                                <Link href='/info' className='flex-row items-center gap-2'>
                                    <CircleHelpIcon />
                                    Renshyuu JLPT
                                </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <Link href='/about' className='flex-row items-center gap-2'>
                                    <CircleIcon />
                                    Us
                                </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <Link href='/contact' className='flex-row items-center gap-2'>
                                    <CircleCheckIcon />
                                    Contact
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
);