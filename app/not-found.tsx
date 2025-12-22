'use client';
import { useState } from 'react';
import { Search, Home, ArrowLeft, Mail, FileQuestion } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function NotFoundPage() {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = () => {
		if (searchQuery.trim()) {
			window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleGoHome = () => {
		window.location.href = '/';
	};

	const handleGoBack = () => {
		window.history.back();
	};

	const handleContact = () => {
		window.location.href = '/contact';
	};

	const popularLinks = [
		{ name: 'Trang chủ', href: '/' },
		{ name: 'Sản phẩm', href: '/products' },
		{ name: 'Dịch vụ', href: '/services' },
		{ name: 'Liên hệ', href: '/contact' },
	];

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4'>
			<div className='w-full max-w-3xl'>
				<Card className='shadow-2xl border-2 overflow-hidden'>
					<CardHeader className='text-center space-y-6 pt-12 pb-8'>
						<div className='relative'>
							<div className='text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 leading-none'>
								404
							</div>
							<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
								<FileQuestion className='w-24 h-24 text-purple-300 dark:text-purple-700 animate-pulse' />
							</div>
						</div>

						<div className='space-y-2'>
							<h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
								Trang không tìm thấy
							</h1>
							<p className='text-lg text-gray-600 dark:text-gray-400'>
								Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển
							</p>
						</div>
					</CardHeader>

					<CardContent className='space-y-6 px-6 pb-8'>
						<Alert className='bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'>
							<Search className='h-4 w-4 text-purple-600 dark:text-purple-400' />
							<AlertDescription className='text-purple-900 dark:text-purple-100'>
								Hãy thử tìm kiếm nội dung bạn cần hoặc quay về trang chủ
							</AlertDescription>
						</Alert>

						<div className='flex gap-2'>
							<Input
								type='text'
								placeholder='Tìm kiếm trang, sản phẩm, dịch vụ...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyPress={handleKeyPress}
								className='flex-1'
							/>
							<Button onClick={handleSearch} size='icon'>
								<Search className='h-4 w-4' />
							</Button>
						</div>

						{/* <div className='space-y-3'>
							<h3 className='font-semibold text-gray-900 dark:text-gray-100'>
								Các trang phổ biến:
							</h3>
							<div className='grid grid-cols-2 gap-2'>
								{popularLinks.map((link, index) => (
									<a
										key={index}
										href={link.href}
										className='px-4 py-2 text-sm text-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300'
									>
										{link.name}
									</a>
								))}
							</div>
						</div> */}

						<div className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800'>
							<h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-2'>
								💡 Một vài gợi ý:
							</h4>
							<ul className='space-y-1 text-sm text-gray-700 dark:text-gray-300'>
								<li>• Kiểm tra lại URL xem có đúng không</li>
								<li>• Sử dụng thanh tìm kiếm ở trên</li>
								<li>• Quay về trang chủ và điều hướng lại</li>
								<li>• Liên hệ với chúng tôi nếu bạn nghĩ đây là lỗi</li>
							</ul>
						</div>
					</CardContent>

					<CardFooter className='flex flex-col sm:flex-row gap-3 justify-center bg-gray-50 dark:bg-gray-800/50 py-6'>
						<Button onClick={handleGoHome} className='w-full sm:w-auto'>
							<Home className='mr-2 h-4 w-4' />
							Về trang chủ
						</Button>
						<Button
							onClick={handleGoBack}
							variant='outline'
							className='w-full sm:w-auto'
						>
							<ArrowLeft className='mr-2 h-4 w-4' />
							Quay lại
						</Button>
						<Button
							onClick={handleContact}
							variant='secondary'
							className='w-full sm:w-auto'
						>
							<Mail className='mr-2 h-4 w-4' />
							Liên hệ
						</Button>
					</CardFooter>
				</Card>

				<p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6'>
					Mã lỗi: 404 | Trang không tìm thấy
				</p>
			</div>
		</div>
	);
}
