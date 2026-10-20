import PageHeader from '@/components/layout/page-header';
import UserSettings from '../_components/user-settings';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function SettingsPage() {
	return (
		<>
			<PageHeader
				title='Cài đặt tài khoản'
				description='Quản lý các tùy chọn cá nhân của bạn'
			/>
			<Card>
				<CardHeader>
					<CardTitle>Cài đặt</CardTitle>
					<CardDescription>Quản lý các tùy chọn cá nhân của bạn</CardDescription>
				</CardHeader>
				<CardContent>
					<UserSettings />
				</CardContent>
			</Card>
		</>
	);
}
