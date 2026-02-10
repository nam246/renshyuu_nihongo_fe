import Logo from '../Logo';
import Link from 'next/link';
import { Separator } from '../ui/separator';

export default function Footer() {
	return (
		<footer className='mt-5 border-t relative'>
			<div className='max-w-7xl mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
					{/* Brand */}
					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<Logo />
						</div>
						<p className='text-sm'>
							Nền tảng học tiếng Nhật hiện đại và hiệu quả nhất cho người Việt Nam
						</p>
					</div>

					{/* Links */}
					<div>
						<h3 className='font-bold text-slate-900 mb-4'>Học tập</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Ngữ pháp
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Kanji
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Từ vựng
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Luyện nghe
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-bold text-slate-900 mb-4'>Luyện tập</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Ngữ pháp
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Kanji
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Từ vựng
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Luyện nghe
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-bold text-slate-900 mb-4'>Hỗ trợ</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Trung tâm trợ giúp
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Liên hệ
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									FAQ
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Điều khoản
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-bold text-slate-900 mb-4'>Cộng đồng</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Facebook
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Discord
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Blog
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-primary transition-colors'>
									Diễn đàn
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<Separator />
			<div className='mt-4 pb-4 text-center text-sm'>
				<p>© 2024 ZipJap. All rights reserved.</p>
			</div>
		</footer>
	);
}
