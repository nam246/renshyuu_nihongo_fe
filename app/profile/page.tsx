'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-currentUser';
import UserProfileCard from '../../components/layout/user-profile-card';
import EditProfileForm from '../../components/form/edit-profile-form';
import PageHeader from '@/components/layout/page-header';
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

import { Bell, Lock, Moon, Volume2 } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

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
			<UserProfileCard />

			<Card className='mb-4 border-red-500'>
				<CardHeader>
					<CardTitle>Tài khoản</CardTitle>
					<CardDescription>Quản lý hành vi ứng dụng</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{/* Security Section */}
						<Item variant='outline' className=''>
							<ItemMedia variant='icon'>
								<div className='bg-red-100 p-3 rounded-lg'>
									<Lock className='w-5 h-5 text-red-600' />
								</div>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Thay đổi mật khẩu</ItemTitle>
								<ItemDescription>
									Cập nhật mật khẩu của bạn để bảo mật tài khoản.
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Button variant='outline'>
									Thay đổi mật khẩu
								</Button>
							</ItemActions>
						</Item>

						<Item variant='outline'>
							<ItemMedia variant='icon'>
								<div className='bg-red-100 p-3 rounded-lg'>
									<Lock className='w-5 h-5 text-red-600' />
								</div>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Xóa tài khoản</ItemTitle>
								<ItemDescription>
									Cập nhật mật khẩu của bạn để bảo mật tài khoản.
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Button variant='destructive'>
									Xóa tài khoản
								</Button>
							</ItemActions>
						</Item>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProfilePage;
