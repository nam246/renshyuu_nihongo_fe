import PageHeader from '@/components/layout/page-header';
import { AddVocabularyForm } from '../_components/form/add-vocabulary-form';

const AddVocabularyPage = () => {
	return (
		<div className='space-y-6'>
			{/* Header */}
			<PageHeader
				title='Thêm từ vựng mới'
				description='Tạo từ vựng mới để bổ sung vào thư viện học tập'
			/>

			<AddVocabularyForm />
		</div>
	);
};

export default AddVocabularyPage;
