import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

import KanjiListDisplay from '../_components/kanji-list-display';
import PageHeader from '@/components/layout/page-header';
import { getBookmarked } from '@/lib/data';
import { Bookmarked } from '@/types/types';

export default async function BookmarkedKanjiPage() {
	let bookmarkedData;
	let bookmarkedKanji;
	const session = await getServerSession(authOptions);

	if (session?.user.id) {
		bookmarkedData = await getBookmarked(session.user.id);
		bookmarkedKanji = await bookmarkedData
			.map((item: Bookmarked) => item.kanji)
			.filter(Boolean);
	}

	return (
		<div>
			<PageHeader
				title='Kanji đã bookmark'
				description='Quản lý và ôn tập những ký tự Kanji bạn đã đánh dấu'
			/>

			<KanjiListDisplay
				items={bookmarkedKanji}
				emptyMessage='Chưa có kanji nào được bookmark. Hãy bookmark những ký tự bạn muốn ôn tập!'
			/>
		</div>
	);
}
