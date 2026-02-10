'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { useAuth } from '@/lib/auth-context';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
	const router = useRouter();
	// const { login, isLoading } = useAuth();
	const [isVisible, setIsVisible] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signIn('credentials', { username, password });
			router.refresh();
			router.push('/dashboard');
		} catch (error) {
			console.error('Login failed:', error);
			// Ideally show error message to user
			alert('Login failed. Please check your credentials.');
		}
	};

	return (
		<form className='space-y-4' onSubmit={handleSubmit}>
			{/* Username */}
			<div className='space-y-1'>
				<Label htmlFor='username' className='leading-5'>
					Tên đăng nhập*
				</Label>
				<Input
					type='text'
					id='username'
					placeholder='Nhập tên tài khoản'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</div>

			{/* Password */}
			<div className='w-full space-y-1'>
				<Label htmlFor='password' className='leading-5'>
					Mật khẩu*
				</Label>
				<div className='relative'>
					<Input
						id='password'
						type={isVisible ? 'text' : 'password'}
						placeholder='••••••••••••••••'
						className='pr-9'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Button
						type='button' // Prevent form submission
						variant='ghost'
						size='icon'
						onClick={() => setIsVisible((prevState) => !prevState)}
						className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
					>
						{isVisible ? <EyeOffIcon /> : <EyeIcon />}
						<span className='sr-only'>
							{isVisible ? 'Hide password' : 'Show password'}
						</span>
					</Button>
				</div>
			</div>

			{/* Remember Me and Forgot Password */}
			<div className='flex items-center justify-between gap-y-2'>
				<div className='flex items-center gap-3'>
					<Checkbox id='rememberMe' className='size-6' />
					<Label htmlFor='rememberMe' className='text-muted-foreground'>
						{' '}
						Ghi nhớ đăng nhập
					</Label>
				</div>

				<a href='#' className='hover:underline'>
					Quên mật khẩu?
				</a>
			</div>

			<Button className='w-full' type='submit' disabled={loading}>
				{loading ? 'Signing in...' : 'Sign in'}
			</Button>
		</form>
	);
};

export default LoginForm;
