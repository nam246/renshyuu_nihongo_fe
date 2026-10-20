'use client';

import EditProfileForm from './form/edit-profile-form';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Mail, AtSign, Calendar, Edit2 } from 'lucide-react';

interface UserProfileCardProps {
	user: {
		id: string;
		name: string;
		email: string;
		username: string;
		createdAt?: string;
	};
}

const UserProfileCard = ({ user }: UserProfileCardProps) => {
	const joinDate = user.createdAt
		? new Date(user.createdAt).toLocaleDateString('vi-VN', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: 'N/A';

	return (
		<Card>
			{/* Header */}
			<CardHeader className='flex items-start justify-between mb-6'>
				<CardTitle className='flex items-center gap-4'>
					{/* Avatar */}
					<div className='w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center'>
						<img src={'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'} />
					</div>

					{/* User Info */}
					<div>
						<h2 className='text-2xl font-bold'>{user.name}</h2>
						<p className='text-sm mt-1'>@{user.username}</p>
					</div>
				</CardTitle>

				<CardAction>
					{/* Edit Button */}
					<EditProfileForm
						user={user}
						onSave={async (data) => {
							// Simulate API call
							await new Promise((resolve) => setTimeout(resolve, 500));
							console.log('Saved:', data);
						}}
					/>
				</CardAction>
			</CardHeader>

			{/* User Details */}
			<CardContent className='space-y-4'>
				{/* Email */}
				<div className='flex items-center gap-3'>
					<Mail className='w-5 h-5' />
					<div>
						<p className='text-sm'>Email</p>
						<p className='text-sm font-medium'>{user.email}</p>
					</div>
				</div>

				{/* Username */}
				<div className='flex items-center gap-3'>
					<AtSign className='w-5 h-5' />
					<div>
						<p className='text-sm'>Tên người dùng</p>
						<p className='text-sm font-medium'>{user.username}</p>
					</div>
				</div>

				{/* Join Date */}
				<div className='flex items-center gap-3'>
					<Calendar className='w-5 h-5' />
					<div>
						<p className='text-sm'>Ngày tham gia</p>
						{/* <p className='text-sm font-medium'>{joinDate}</p> */}
					</div>
				</div>
			</CardContent>

			{/* Status Badge */}
			<CardFooter className='pt-4 flex items-center gap-2'>
				<div className='w-2 h-2 bg-green-500 rounded-full' />
				<span className='text-sm'>Tài khoản hoạt động</span>
			</CardFooter>
		</Card>
	);
};

export default UserProfileCard;
