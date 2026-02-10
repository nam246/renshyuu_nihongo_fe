'use client';

import { BookOpen, Trophy, Target, Zap, Users, Award } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/layout/hero';
import Features from '@/components/layout/features';
import FAQ from '@/components/layout/faq';
import Link from 'next/link';

const levels: {
	title: string;
	description: string;
	lessons: number;
	students: number;
	link: string;
}[] = [
	{
		title: 'N5 - Sơ cấp',
		description: 'Nền tảng Hiragana, Katakana và từ vựng cơ bản',
		lessons: 120,
		students: 15000,
		link: '/n5/grammar',
	},
	{
		title: 'N4 - Trung cấp',
		description: 'Ngữ pháp tiếng Nhật cơ bản và hội thoại hàng ngày',
		lessons: 180,
		students: 10000,
		link: '/n4/grammar',
	},
	{
		title: 'N3 - Trung cao cấp',
		description: 'Giao tiếp thành thạo trong các tình huống thực tế',
		lessons: 240,
		students: 6000,
		link: '/n3/grammar',
	},
];

// Homepage Component
export default function Homepage() {
	return (
		<>
			<Header />
			<div className='min-h-screen'>
				{/* Hero Section */}
				{/* <HeroSection /> */}
				<Hero />

				{/* Features Section */}
				<Features />

				{/* Levels Section */}
				<LevelSection levels={levels} />

				<FAQ />
			</div>
			<Footer />
		</>
	);
}

function LevelSection({
	levels,
}: {
	levels: {
		title: string;
		description: string;
		lessons: number;
		students: number;
		link: string;
	}[];
}) {
	return (
		<section className='py-20 bg-linear-to-b from-primary to-slate-50'>
			<div className='text-center mb-16'>
				<h2 className="md:text-center text-3xl xs:text-4xl md:text-5xl leading-[1.15]! font-semibold tracking-tighter">
					Các cấp độ theo JLPT
				</h2>
				<p className="mt-1.5 md:text-center xs:text-lg text-muted-foreground">
					Chọn cấp độ phù hợp và bắt đầu hành trình của bạn
				</p>
			</div>

			<div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
				{levels.map((level, index) => (
					<Card key={index} className='group'>
						<CardHeader>
							<CardTitle>{level.title}</CardTitle>
							<CardDescription>{level.description}</CardDescription>
							<CardAction>
								<Award className='w-12 h-12 group-hover:scale-110 transition-transform' />
							</CardAction>
						</CardHeader>
						<CardContent>
							{/* <div className='space-y-2 mb-6'>
								<div className='flex items-center gap-2 text-sm text-slate-600'>
									<BookOpen className='w-4 h-4' />
									<span>{level.lessons} bài học</span>
								</div>
								<div className='flex items-center gap-2 text-sm text-slate-600'>
									<Users className='w-4 h-4' />
									<span>{level.students.toLocaleString()} học viên</span>
								</div>
							</div> */}
						</CardContent>
						<CardFooter>
							<Button className='w-full'>
								<Link href={level.link}>Bắt đầu học</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	);
}
