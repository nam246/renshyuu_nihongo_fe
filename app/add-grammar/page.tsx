import PageHeader from '@/components/layout/page-header';
import AddGrammarForm from '../_components/form/add-grammar-form';

const AddGrammarPage = () => {
	return (
		<div className='space-y-6'>
			{/* Header */}
			<PageHeader
				title='Thêm ngữ pháp mới'
				description='Tạo mẫu ngữ pháp mới để bổ sung vào thư viện học tập'
			/>

			<AddGrammarForm />
		</div>
	);
};

export default AddGrammarPage;
