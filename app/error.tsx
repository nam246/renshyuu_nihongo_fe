'use client';
import React from 'react';
import { AlertCircle, Home, RefreshCcw, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function ErrorPage() {
	const [errorDetails] = React.useState({
		code: 500,
		title: 'Đã xảy ra lỗi',
		message: 'Rất tiếc, đã có lỗi xảy ra khi xử lý yêu cầu của bạn.',
		timestamp: new Date().toLocaleString('vi-VN'),
	});

	const handleRefresh = () => {
		window.location.reload();
	};

	const handleGoHome = () => {
		window.location.href = '/';
	};

	const handleGoBack = () => {
		window.history.back();
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4'>
			<div className='w-full max-w-2xl'>
				<Card className='shadow-2xl border-2'>
					<CardHeader className='text-center space-y-4'>
						<div className='mx-auto w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center'>
							<AlertCircle className='w-12 h-12 text-red-600 dark:text-red-400' />
						</div>
						<div>
							<CardTitle className='text-4xl font-bold text-gray-900 dark:text-gray-100'>
								{errorDetails.code}
							</CardTitle>
							<CardDescription className='text-xl mt-2'>
								{errorDetails.title}
							</CardDescription>
						</div>
					</CardHeader>

					<CardContent className='space-y-4'>
						<Alert
							variant='destructive'
							className='border-red-200 dark:border-red-900'
						>
							<AlertCircle className='h-4 w-4' />
							<AlertTitle>Thông báo lỗi</AlertTitle>
							<AlertDescription>{errorDetails.message}</AlertDescription>
						</Alert>

						<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2'>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								<span className='font-semibold'>Thời gian:</span>{' '}
								{errorDetails.timestamp}
							</p>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								<span className='font-semibold'>Mã lỗi:</span> ERR_{errorDetails.code}
								_SRV
							</p>
						</div>

						<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4'>
							<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								Bạn có thể thử:
							</h4>
							<ul className='space-y-1 text-sm text-blue-800 dark:text-blue-200'>
								<li>• Tải lại trang này</li>
								<li>• Quay lại trang trước</li>
								<li>• Về trang chủ và thử lại</li>
								<li>• Kiểm tra kết nối internet của bạn</li>
							</ul>
						</div>
					</CardContent>

					<CardFooter className='flex flex-col sm:flex-row gap-3 justify-center'>
						<Button
							onClick={handleRefresh}
							variant='default'
							className='w-full sm:w-auto'
						>
							<RefreshCcw className='mr-2 h-4 w-4' />
							Tải lại trang
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
							onClick={handleGoHome}
							variant='secondary'
							className='w-full sm:w-auto'
						>
							<Home className='mr-2 h-4 w-4' />
							Về trang chủ
						</Button>
					</CardFooter>
				</Card>

				<p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6'>
					Nếu sự cố vẫn tiếp diễn, vui lòng liên hệ với bộ phận hỗ trợ
				</p>
			</div>
		</div>
	);
}
