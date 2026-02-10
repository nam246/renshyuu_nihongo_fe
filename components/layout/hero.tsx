import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
	return (
		<div className='min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent'>
			<div className='max-w-(--breakpoint-xl) w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0'>
				<div className='max-w-xl'>
					<Badge className='rounded-full py-1 border-none'>
						Just released v1.0.0
					</Badge>
					<h1 className='mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-semibold leading-[1.2]! tracking-tight'>
						Cùng học tiếng Nhật theo cách của bạn
					</h1>
					<p className='mt-6 max-w-[60ch] xs:text-lg'>
						Trải nghiệm phương pháp học tập tiếng Nhật theo lộ trình của bạn, Tự xây
						dựng phong cách học tập cho bản thân và hỗ trợ quá trình học tập tiếng
						Nhật của bạn được dễ dàng hơn.
					</p>
					<div className='mt-12 flex flex-col sm:flex-row items-center gap-4'>
						<Button size='lg' className='w-full sm:w-auto rounded-full text-base'>
							Bắt đầu ngay <ArrowUpRight className='h-5! w-5!' />
						</Button>
						<Button
							variant='outline'
							size='lg'
							className='w-full sm:w-auto rounded-full text-base shadow-none'
						>
							<CirclePlay className='h-5! w-5!' /> Về ứng dụng
						</Button>
					</div>
				</div>
				<div className='relative lg:max-w-lg xl:max-w-xl w-full bg-accent rounded-xl aspect-square'>
					<Image
						src='/placeholder.svg'
						fill
						alt=''
						className='object-cover rounded-xl'
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
