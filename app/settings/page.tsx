import PageHeader from '@/components/layout/page-header';
import UserSettings from '../../components/layout/user-settings';

export default function SettingsPage() {
	return (
		<>
			<PageHeader
				title='Cài đặt'
				description='Quản lý các tùy chọn cá nhân của bạn'
			/>
			<UserSettings />
		</>
	);
}
