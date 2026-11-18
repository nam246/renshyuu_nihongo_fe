'use client';

import { useState } from 'react';

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

import { Level } from '@/types/types';

interface SettingsProps {
	onSave?: (settings: UserSettings) => Promise<void>;
}

interface UserSettings {
	notifications: boolean;
	emailUpdates: boolean;
	darkMode: boolean;
	soundEnabled: boolean;
}

const UserSettings = ({ onSave }: SettingsProps) => {
	const [settings, setSettings] = useState<UserSettings>({
		notifications: true,
		emailUpdates: false,
		darkMode: false,
		soundEnabled: true,
	});
	const [saving, setSaving] = useState(false);

	const userSettingItems = [
		{
			id: 'level',
			label: 'Cấp độ',
			description: 'Cấp độ hiện tại',
			icon: Bell,
			color: 'text-blue-600',
			bgColor: 'bg-blue-100',
		},
	]

	const appSettingItems = [
		{
			id: 'notifications',
			label: 'Thông báo',
			description: 'Nhận thông báo về các hoạt động học tập',
			icon: Bell,
			color: 'text-blue-600',
			bgColor: 'bg-blue-100',
		},
		{
			id: 'emailUpdates',
			label: 'Cập nhật qua email',
			description: 'Nhận email về tiến độ học và bài học mới',
			icon: Mail,
			color: 'text-green-600',
			bgColor: 'bg-green-100',
		},
		{
			id: 'darkMode',
			label: 'Chế độ tối',
			description: 'Bật chế độ tối để bảo vệ mắt',
			icon: Moon,
			color: 'text-purple-600',
			bgColor: 'bg-purple-100',
		},
		// {
		// 	id: 'soundEnabled',
		// 	label: 'Âm thanh',
		// 	description: 'Bật âm thanh trong các bài tập',
		// 	icon: Volume2,
		// 	color: 'text-orange-600',
		// 	bgColor: 'bg-orange-100',
		// },
	];

	return (
		<>
			<Card className='mb-4'>
				<CardHeader>
					<CardTitle>Cá nhân</CardTitle>
					<CardDescription>Quản lý các tùy chọn cá nhân của bạn</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{userSettingItems.map((item) => {
							const Icon = item.icon;
							const isEnabled = settings[item.id as keyof UserSettings];

							return (
								<Item variant='outline' key={item.id}>
									<ItemMedia>
										<div className={`${item.bgColor} p-3 rounded-lg`}>
											<Icon className={`w-5 h-5 ${item.color}`} />
										</div>
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{item.label}</ItemTitle>
										<ItemDescription>{item.description}</ItemDescription>
									</ItemContent>
									<ItemActions>
										{/* Toggle Switch */}
										<Select
											defaultValue={Level.N5}
										// onValueChange={(value) => updateLevelParams(value)}
										>
											<SelectTrigger className='w-[180px]'>
												<SelectValue placeholder='Tất cả cấp độ' />
											</SelectTrigger>
											<SelectContent>
												{Object.values(Level).map((lvl, index) => (
													<SelectItem key={index} value={lvl}>
														{lvl}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</ItemActions>
								</Item>
							);
						})}
					</div>
				</CardContent>
			</Card>

			<Card className='mb-4'>
				<CardHeader>
					<CardTitle>Ứng dụng</CardTitle>
					<CardDescription>Quản lý hành vi ứng dụng</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{appSettingItems.map((item) => {
							const Icon = item.icon;
							const isEnabled = settings[item.id as keyof UserSettings];

							return (
								<Item variant='outline' key={item.id}>
									<ItemMedia>
										<div className={`${item.bgColor} p-3 rounded-lg`}>
											<Icon className={`w-5 h-5 ${item.color}`} />
										</div>
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{item.label}</ItemTitle>
										<ItemDescription>{item.description}</ItemDescription>
									</ItemContent>
									<ItemActions>
										{/* Toggle Switch */}
										<Switch defaultChecked={isEnabled} />
									</ItemActions>
								</Item>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</>
	);
};

// Re-export Mail icon
const Mail = ({ className }: { className?: string }) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		/>
	</svg>
);

export default UserSettings;
