'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function QuickLoginButton() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await signIn('credentials', {
				username: 'admin',
				password: 'admin',
				redirect: false,
			});

			if (result?.error) {
				console.log('error');
			} else {
				router.push('/dashboard');
			}
		} catch (error) {
			alert('đã xảy ra lỗi!');
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className='mb-6 flex flex-wrap gap-4 sm:gap-6'>
			<Button variant='outline' className='grow' onClick={handleSubmit}>
				{loading ? 'Đang đăng nhập...' : 'Đăng nhập với quyền Admin'}
			</Button>
			<Button variant='outline' className='grow'>
				Đăng nhập với quyền User
			</Button>
		</div>
	);
}
