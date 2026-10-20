import PageHeader from '@/components/layout/page-header';
import { AddKanjiForm } from '../_components/form/add-kanji-form';

const AddKanjiPage = () => {
	return (
		<div className='space-y-6'>
			{/* Header */}
			<PageHeader
				title='Thêm kanji mới'
				description='Tạo ký tự kanji mới để bổ sung vào thư viện học tập'
			/>

			<AddKanjiForm />
		</div>
	);
};

export default AddKanjiPage;
