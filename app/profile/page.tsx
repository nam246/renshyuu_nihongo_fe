'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-currentUser';
import UserProfileCard from '../_components/user-profile-card';
import EditProfileForm from '../_components/form/edit-profile-form';
import PageHeader from '@/components/layout/page-header';
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

const ProfilePage = () => {
	const router = useRouter();
	const { user, isLoading } = useCurrentUser();
	const [showEditForm, setShowEditForm] = useState(false);

	return (
		<div className='space-y-6'>
			{/* Header */}
			<PageHeader
				title='Hồ sơ cá nhân'
				description='Quản lý thông tin và cài đặt tài khoản của bạn'
			/>

			{/* Profile Card */}
			{/* <UserProfileCard user={user} onEditClick={() => setShowEditForm(true)} /> */}
		</div>
	);
};

export default ProfilePage;
