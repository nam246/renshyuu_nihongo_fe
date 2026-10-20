import PageHeader from '@/components/layout/page-header';
import { AddMockTestForm } from '../_components/form/add-mock-test-form';

const MockTestBuilderPage = () => {
	return (
		<div className='space-y-6'>
			<PageHeader
				title='Thêm bài kiểm tra'
				description='Tạo bài kiểm tra mô phỏng mới để kiểm tra kiến thức'
			/>

			<AddMockTestForm />
		</div>
	);
};

export default MockTestBuilderPage;
