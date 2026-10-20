'use client';

import { useState } from 'react';

import { Bell, Lock, Moon, Volume2 } from 'lucide-react';
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

	const settingItems = [
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
		// {
		// 	id: 'darkMode',
		// 	label: 'Chế độ tối',
		// 	description: 'Bật chế độ tối để bảo vệ mắt',
		// 	icon: Moon,
		// 	color: 'text-purple-600',
		// 	bgColor: 'bg-purple-100',
		// },
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
		<div className='space-y-4'>
			{settingItems.map((item) => {
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

			{/* Security Section */}
			<Item variant='outline' className='bg-red-50'>
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
					<Button variant='destructive' className='w-2xs'>
						Thay đổi mật khẩu
					</Button>
				</ItemActions>
			</Item>
		</div>
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
