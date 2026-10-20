'use client';

import { Loader2, Edit2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

interface EditProfileFormProps {
	user: {
		id: string;
		name: string;
		email: string;
		username: string;
	};
	onSave?: (data: {
		name: string;
		email: string;
		username: string;
	}) => Promise<void>;
}

const EditProfileForm = ({ user, onSave }: EditProfileFormProps) => {
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		username: user.username,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError('');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

		try {
			// Validate form
			if (!formData.name.trim()) {
				setError('Vui lòng nhập tên');
				setLoading(false);
				return;
			}
			if (!formData.email.trim()) {
				setError('Vui lòng nhập email');
				setLoading(false);
				return;
			}
			if (!formData.username.trim()) {
				setError('Vui lòng nhập tên người dùng');
				setLoading(false);
				return;
			}

			if (onSave) {
				await onSave(formData);
				setSuccess('Cập nhật thông tin thành công!');
				setTimeout(() => {}, 1500);
			}
		} catch (err: Error | unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Có lỗi xảy ra');
			} else {
				setError('Có lỗi xảy ra');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='default' className='flex items-center'>
					<Edit2 className='w-4 h-4' />
					Chỉnh sửa
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</SheetDescription>
				</SheetHeader>
				<form onSubmit={handleSubmit} className='space-y-4 px-4'>
					{/* Error Message */}
					{error && (
						<div className='p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm'>
							{error}
						</div>
					)}

					{/* Success Message */}
					{success && (
						<div className='p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm'>
							{success}
						</div>
					)}

					{/* Name Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Tên
						</label>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Nhập tên của bạn'
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							disabled={loading}
						/>
					</div>

					{/* Email Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Email
						</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='Nhập email của bạn'
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							disabled={loading}
						/>
					</div>

					{/* Username Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Tên người dùng
						</label>
						<input
							type='text'
							name='username'
							value={formData.username}
							onChange={handleChange}
							placeholder='Nhập tên người dùng'
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							disabled={loading}
						/>
						<p className='text-xs text-gray-500 mt-1'>
							Tên người dùng chỉ có thể chứa chữ cái, số và dấu gạch dưới
						</p>
					</div>
				</form>
				<SheetFooter>
					<Button type='submit' disabled={loading}>
						{loading && <Loader2 className='w-4 h-4 animate-spin' />}
						{loading ? 'Đang lưu...' : 'Lưu'}
					</Button>
					<SheetClose asChild>
						<Button variant='outline' disabled={loading}>
							Đóng
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default EditProfileForm;
