import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Item,
	ItemContent,
	ItemTitle,
	ItemDescription,
	ItemMedia,
} from '@/components/ui/item';

export default function ActivitiesPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hoạt động gần đây</CardTitle>
				<CardDescription>Xem lịch sử hoạt động của bạn</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{[
						{
							title: 'Hoàn thành bài học: Động từ trong tiếng Nhật',
							time: '2 giờ trước',
							icon: '📚',
						},
						{
							title: 'Học 15 từ vựng mới',
							time: 'Hôm qua',
							icon: '📝',
						},
						{
							title: 'Hoàn thành bài kiểm tra: N5 Grammar',
							time: '3 ngày trước',
							icon: '✅',
						},
						{
							title: 'Đạt streak 7 ngày liên tiếp',
							time: 'Tuần trước',
							icon: '🔥',
						},
						{
							title: 'Hoàn thành lần đầu tiên 100 từ vựng',
							time: '2 tuần trước',
							icon: '🎉',
						},
					].map((activity, index) => (
						<Item key={index} variant='muted' className=''>
							<ItemMedia>
								<span className='text-xl'>{activity.icon}</span>
							</ItemMedia>
							<ItemContent className='flex-1'>
								<ItemTitle className='text-sm font-medium'>
									{activity.title}
								</ItemTitle>
								<ItemDescription className='text-xs mt-1'>
									{activity.time}
								</ItemDescription>
							</ItemContent>
						</Item>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
