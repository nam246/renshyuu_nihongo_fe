'use client';

import {
	BookOpen,
	Trophy,
	Sparkles,
	Target,
	Zap,
	Users,
	Award,
	ChevronRight,
	Play,
} from 'lucide-react';

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

import HeroSection from '@/components/layout/HeroSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const features = [
	{
		icon: Zap,
		title: 'Học nhanh hiệu quả',
		description: 'Phương pháp học tối ưu giúp bạn tiến bộ từng ngày',
		color: 'from-yellow-500 to-orange-500',
	},
	{
		icon: Target,
		title: 'Lộ trình cá nhân hóa',
		description: 'Chương trình học phù hợp với trình độ và mục tiêu của bạn',
		color: 'from-blue-500 to-indigo-500',
	},
	{
		icon: Trophy,
		title: 'Gamification',
		description: 'Tích điểm, hoàn thành thử thách và leo lên bảng xếp hạng',
		color: 'from-purple-500 to-pink-500',
	},
	{
		icon: Users,
		title: 'Cộng đồng học tập',
		description: 'Kết nối và học hỏi cùng hàng ngàn học viên khác',
		color: 'from-green-500 to-teal-500',
	},
];

const levels: {
	title: string;
	description: string;
	lessons: number;
	students: number;
}[] = [
	{
		title: 'N5 - Sơ cấp',
		description: 'Nền tảng Hiragana, Katakana và từ vựng cơ bản',
		lessons: 120,
		students: 15000,
	},
	{
		title: 'N4 - Trung cấp',
		description: 'Ngữ pháp tiếng Nhật cơ bản và hội thoại hàng ngày',
		lessons: 180,
		students: 10000,
	},
	{
		title: 'N3 - Trung cao cấp',
		description: 'Giao tiếp thành thạo trong các tình huống thực tế',
		lessons: 240,
		students: 6000,
	},
];

// Homepage Component
export default function Homepage() {
	return (
		<>
			<Header />
			<div className='min-h-screen'>
				{/* Hero Section */}
				<HeroSection />
				{/* <HeroSectionv2 stats={stats} /> */}

				{/* Features Section */}
				<FeaturesSection features={features} />

				{/* Levels Section */}
				<LevelSection levels={levels} />

				{/* CTA Section */}
				<CTASection />

				<style jsx>{`
					@keyframes blob {
						0% {
							transform: translate(0px, 0px) scale(1);
						}
						33% {
							transform: translate(30px, -50px) scale(1.1);
						}
						66% {
							transform: translate(-20px, 20px) scale(0.9);
						}
						100% {
							transform: translate(0px, 0px) scale(1);
						}
					}
					.animate-blob {
						animation: blob 7s infinite;
					}
					.animation-delay-2000 {
						animation-delay: 2s;
					}
					.animation-delay-4000 {
						animation-delay: 4s;
					}
				`}</style>
			</div>
			<Footer />
		</>
	);
}

function HeroSectionv2({ stats }: { stats: any }) {
	return (
		<section className='relative overflow-hidden'>
			<div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' />
			<div className='absolute inset-0 opacity-30'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob' />
				<div className='absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000' />
				<div className='absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000' />
			</div>

			<div className='relative container mx-auto px-4 py-20 md:py-32'>
				<div className='max-w-4xl mx-auto text-center'>
					<div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-6 font-medium'>
						<Sparkles className='w-4 h-4' />
						<span>Ứng dụng học tiếng Nhật #1 Việt Nam</span>
					</div>

					<h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight'>
						Chinh phục tiếng Nhật
						<br />
						cùng ZipJap
					</h1>

					<p className='text-xl text-slate-600 mb-10 max-w-2xl mx-auto'>
						Học tiếng Nhật nhanh chóng và hiệu quả với phương pháp độc quyền. Từ N5
						đến N1, chúng tôi đồng hành cùng bạn!
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<button className='group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2'>
							Bắt đầu học ngay
							<ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
						</button>
						<button className='group px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2'>
							<Play className='w-5 h-5' />
							Xem demo
						</button>
					</div>

					{/* Stats */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16'>
						{stats.map((stat: any, index: number) => {
							const Icon = stat.icon;
							return (
								<div
									key={index}
									className='p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-200'
								>
									<Icon className='w-8 h-8 text-blue-600 mx-auto mb-2' />
									<div className='text-3xl font-bold text-slate-800'>{stat.number}</div>
									<div className='text-sm text-slate-600'>{stat.label}</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

function FeaturesSection({ features }: { features: any }) {
	return (
		<section className='py-20'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-4'>
						Tại sao chọn ZipJap?
					</h2>
					<p className='text-xl max-w-2xl mx-auto'>
						Những tính năng vượt trội giúp bạn học tiếng Nhật hiệu quả hơn
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{features.map((feature: any, index: number) => {
						const Icon = feature.icon;
						return (
							<Card
								key={index}
								className='group rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer'
							>
								<CardHeader>
									<CardTitle>
										<div
											className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
										>
											<Icon className='w-7 h-7' />
										</div>
										<h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
									</CardTitle>
									<CardDescription>
										<p className=''>{feature.description}</p>
									</CardDescription>
								</CardHeader>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function LevelSection({ levels }: { levels: any }) {
	return (
		<section className='py-20 bg-gradient-to-b from-primary to-slate-50'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-4'>Lộ trình học tập</h2>
					<p className='text-xl max-w-2xl mx-auto'>
						Chọn cấp độ phù hợp và bắt đầu hành trình của bạn
					</p>
				</div>

				<div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
					{levels.map((level: any, index: number) => (
						<Card key={index} className='group'>
							<CardHeader>
								<CardTitle>{level.title}</CardTitle>
								<CardDescription>{level.description}</CardDescription>
								<CardAction>
									<Award className='w-12 h-12 group-hover:scale-110 transition-transform' />
								</CardAction>
							</CardHeader>
							<CardContent>
								<div className='space-y-2 mb-6'>
									<div className='flex items-center gap-2 text-sm text-slate-600'>
										<BookOpen className='w-4 h-4' />
										<span>{level.lessons} bài học</span>
									</div>
									<div className='flex items-center gap-2 text-sm text-slate-600'>
										<Users className='w-4 h-4' />
										<span>{level.students.toLocaleString()} học viên</span>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button className='w-full'>Bắt đầu học</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

function CTASection() {
	return (
		<section className='py-20 bg-primary'>
			<div className='container mx-auto px-4 text-center'>
				<h2 className='text-4xl md:text-5xl mb-6'>Sẵn sàng bắt đầu chưa?</h2>
				<p className='text-xl mb-10 max-w-2xl mx-auto'>
					Tham gia cùng hàng ngàn học viên đang chinh phục tiếng Nhật mỗi ngày
				</p>
				<button className='px-10 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200'>
					Đăng ký miễn phí ngay
				</button>
			</div>
		</section>
	);
}
