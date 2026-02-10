import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	BookCheck,
	BookMarked,
	FolderSync,
	ChartArea,
	Library,
	BookOpenCheck,
} from 'lucide-react';

const features = [
	{
		icon: ChartArea,
		title: 'Theo dõi tiến độ học tập',
		description:
			'Easily uncover untapped areas to explore and expand your reach effortlessly.',
	},
	{
		icon: BookCheck,
		title: 'Tự tạo Flashcards',
		description:
			'Create valuable content that resonates, inspires trust, and positions you as an expert.',
	},
	{
		icon: BookMarked,
		title: 'Bookmarked',
		description:
			'Gain immediate, actionable insights with a quick glance, enabling fast decision-making.',
	},
	{
		icon: Library,
		title: 'Sưu tập và tạo bộ từ vựng riêng',
		description:
			'Boost audience engagement with interactive features like polls, quizzes, and forms.',
	},
	{
		icon: FolderSync,
		title: 'Sưu tập và tạo bộ Kanji riêng',
		description:
			'Streamline your processes by automating repetitive tasks, saving time and reducing effort.',
	},
	{
		icon: BookOpenCheck,
		title: 'Tạo bộ câu hỏi và đề thi cho bản thân',
		description:
			'Supercharge your growth by implementing strategies that drive results quickly and efficiently.',
	},
];

const Features = () => {
	return (
		<div id='features' className='max-w-7xl mx-auto w-full py-12 xs:py-20'>
			<h2 className="md:text-center text-3xl xs:text-4xl md:text-5xl leading-[1.15]! font-semibold tracking-tighter">
				Các tính năng nổi bật
			</h2>
			<div className='mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12'>
				{features.map((feature) => (
					<Card
						key={feature.title}
						className='flex flex-col border rounded-xl overflow-hidden shadow-none'
					>
						<CardHeader>
							<feature.icon />
							<h4 className='mt-3! text-xl font-semibold tracking-tight'>
								{feature.title}
							</h4>
							<p className='mt-1 text-muted-foreground text-sm xs:text-[17px]'>
								{feature.description}
							</p>
						</CardHeader>
						<CardContent className='mt-auto px-0 pb-0'>
							<div className='bg-muted h-52 ml-6 rounded-tl-xl' />
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Features;
