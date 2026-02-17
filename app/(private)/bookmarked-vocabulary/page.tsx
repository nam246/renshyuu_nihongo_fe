import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

import VocabularyListDisplay from '../_components/vocabulary-list-display';
import PageHeader from '@/components/layout/page-header';
import { getBookmarked } from '@/lib/data';
import { Bookmarked } from '@/types/types';

export default async function BookmarkedVocabularyPage() {
	let bookmarkedData;
	let bookmarkedVocab;
	const session = await getServerSession(authOptions);

	if (session?.user.id) {
		bookmarkedData = await getBookmarked(session.user.id);
		bookmarkedVocab = await bookmarkedData
			.map((item: Bookmarked) => item.vocabulary)
			.filter(Boolean);
	}

	return (
		<div>
			<PageHeader
				title='Từ vựng đã bookmark'
				description='Quản lý và ôn tập những từ vựng bạn đã đánh dấu'
			/>

			<Suspense fallback={<div>Loading...</div>}>
				<VocabularyListDisplay
					items={bookmarkedVocab}
					emptyMessage='Chưa có từ vựng nào được bookmark. Hãy bookmark những từ bạn muốn ôn tập!'
				/>
			</Suspense>
		</div>
	);
}
