import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

import GrammarListDisplay from '../_components/grammar-list-display';
import PageHeader from '@/components/layout/page-header';
import { getBookmarked } from '@/lib/data';
import { Grammar, Vocabulary, Kanji } from '@/types/types';

type Bookmarked = {
	id: string;
	userId: string;
	vocabulary: Vocabulary;
	grammar: Grammar;
	kanji: Kanji;
	createdAt: Date;
};

export default async function BookmarkedGrammarPage() {
	let bookmarkedData;
	let bookmarkedGrammar;
	const session = await getServerSession(authOptions);

	if (session?.user.id) {
		bookmarkedData = await getBookmarked(session.user.id);
		bookmarkedGrammar = await bookmarkedData
			.map((item: Bookmarked) => item.grammar)
			.filter(Boolean);
	}

	return (
		<div>
			<PageHeader
				title='Ngữ pháp đã bookmark'
				description='Quản lý và ôn tập những mẫu ngữ pháp bạn đã đánh dấu'
			/>

			<GrammarListDisplay
				items={bookmarkedGrammar}
				emptyMessage='Chưa có ngữ pháp nào được bookmark. Hãy bookmark những mẫu câu bạn muốn ôn tập!'
			/>
		</div>
	);
}
