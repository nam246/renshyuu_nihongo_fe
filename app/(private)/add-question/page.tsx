'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Plus, Save, X } from 'lucide-react';
import PageHeader from '@/components/layout/page-header';

interface QuestionOption {
	text: string;
}

interface QuestionFormData {
	question: string;
	options: QuestionOption[];
	correctAnswer: number;
	explanation: string;
	level: string;
	category: string;
	mediaFile: File | null;
	mediaPreview: string;
}

const AddQuestionPage = () => {
	const [formData, setFormData] = useState<QuestionFormData>({
		question: '',
		options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
		correctAnswer: 0,
		explanation: '',
		level: 'N5',
		category: 'vocabulary',
		mediaFile: null,
		mediaPreview: '',
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError('');
	};

	const handleOptionChange = (index: number, value: string) => {
		const newOptions = [...formData.options];
		newOptions[index] = { text: value };
		setFormData((prev) => ({
			...prev,
			options: newOptions,
		}));
	};

	const addOption = () => {
		if (formData.options.length < 10) {
			setFormData((prev) => ({
				...prev,
				options: [...prev.options, { text: '' }],
			}));
		}
	};

	const removeOption = (index: number) => {
		if (formData.options.length > 2) {
			setFormData((prev) => ({
				...prev,
				options: prev.options.filter((_, i) => i !== index),
				// Adjust correctAnswer if necessary
				correctAnswer:
					prev.correctAnswer >= prev.options.length - 1
						? prev.options.length - 2
						: prev.correctAnswer,
			}));
		}
	};

	const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setFormData((prev) => ({
					...prev,
					mediaFile: file,
					mediaPreview: reader.result as string,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const removeMedia = () => {
		setFormData((prev) => ({
			...prev,
			mediaFile: null,
			mediaPreview: '',
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

		try {
			// Validate
			if (!formData.question.trim()) {
				throw new Error('Vui lòng nhập câu hỏi');
			}

			// Check for empty options
			const validOptions = formData.options.filter((o) => o.text.trim());
			if (validOptions.length < 2) {
				throw new Error('Vui lòng nhập ít nhất 2 đáp án');
			}

			if (formData.correctAnswer >= validOptions.length) {
				throw new Error('Vui lòng chọn đáp án đúng');
			}

			// Prepare data
			const payload = {
				question: formData.question.trim(),
				options: validOptions.map((o) => o.text),
				correctAnswer: formData.correctAnswer,
				explanation: formData.explanation.trim(),
				level: formData.level,
				category: formData.category,
			};

			// TODO: Call API to save question
			console.log('Saving question:', payload);

			setSuccess('Thêm câu hỏi trắc nghiệm thành công!');
			// Reset form
			setFormData({
				question: '',
				options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
				correctAnswer: 0,
				explanation: '',
				level: 'N5',
				category: 'vocabulary',
				mediaFile: null,
				mediaPreview: '',
			});
		} catch (err: Error | unknown) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='space-y-6'>
			{/* Header */}
			<PageHeader
				title='Thêm câu hỏi trắc nghiệm'
				description='Tạo một câu hỏi trắc nghiệm mới để bổ sung vào ngân hàng câu hỏi'
			/>

			<form onSubmit={handleSubmit} className='space-y-6'>
				{/* Messages */}
				{error && (
					<div className='p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg'>
						{error}
					</div>
				)}
				{success && (
					<div className='p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg'>
						{success}
					</div>
				)}

				{/* Basic Info */}
				<Card className='p-6'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>
						Thông tin câu hỏi
					</h2>

					<div className='space-y-4'>
						{/* Question */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Câu hỏi *
							</label>
							<textarea
								name='question'
								value={formData.question}
								onChange={handleInputChange}
								placeholder='Nhập câu hỏi trắc nghiệm'
								rows={3}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
							<p className='text-xs text-gray-500 mt-1'>
								{formData.question.length} ký tự
							</p>
						</div>

						{/* Grid for category and level */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{/* Category */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Danh mục *
								</label>
								<select
									name='category'
									value={formData.category}
									onChange={handleInputChange}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={loading}
								>
									<option value='vocabulary'>Từ vựng</option>
									<option value='grammar'>Ngữ pháp</option>
									<option value='kanji'>Kanji</option>
									<option value='reading'>Đọc hiểu</option>
									<option value='listening'>Nghe hiểu</option>
									<option value='writing'>Viết</option>
									<option value='other'>Khác</option>
								</select>
							</div>

							{/* Level */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Trình độ N-Jlpt *
								</label>
								<select
									name='level'
									value={formData.level}
									onChange={handleInputChange}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={loading}
								>
									<option value='N5'>N5 (Beginner)</option>
									<option value='N4'>N4 (Elementary)</option>
									<option value='N3'>N3 (Intermediate)</option>
									<option value='N2'>N2 (Upper-Intermediate)</option>
									<option value='N1'>N1 (Advanced)</option>
								</select>
							</div>
						</div>
					</div>
				</Card>

				{/* Media Upload */}
				<Card className='p-6'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>
						Hình ảnh minh họa (Tùy chọn)
					</h2>

					<div className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Tải lên hình ảnh
							</label>
							<input
								type='file'
								accept='image/*'
								onChange={handleMediaChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
							<p className='text-xs text-gray-500 mt-1'>
								Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB)
							</p>
						</div>

						{formData.mediaPreview && (
							<div className='relative inline-block'>
								<img
									src={formData.mediaPreview}
									alt='Preview'
									className='max-w-xs h-auto rounded-lg border border-gray-300'
								/>
								<button
									type='button'
									onClick={removeMedia}
									className='absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors'
								>
									<X className='w-4 h-4' />
								</button>
							</div>
						)}
					</div>
				</Card>

				{/* Options */}
				<Card className='p-6'>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-lg font-semibold text-gray-900'>
							Đáp án ({formData.options.length})
						</h2>
						<button
							type='button'
							onClick={addOption}
							disabled={formData.options.length >= 10 || loading}
							className='flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						>
							<Plus className='w-4 h-4' />
							Thêm đáp án
						</button>
					</div>

					<div className='space-y-3'>
						{formData.options.map((option, index) => (
							<div key={index} className='flex items-center gap-3'>
								{/* Radio Button */}
								<input
									type='radio'
									name='correctAnswer'
									value={index}
									checked={formData.correctAnswer === index}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											correctAnswer: parseInt(e.target.value),
										}))
									}
									disabled={loading}
									className='w-5 h-5 text-blue-600 cursor-pointer'
								/>

								{/* Option Label */}
								<span className='text-sm font-medium text-gray-600 min-w-fit'>
									{String.fromCharCode(65 + index)}.
								</span>

								{/* Option Input */}
								<input
									type='text'
									value={option.text}
									onChange={(e) => handleOptionChange(index, e.target.value)}
									placeholder={`Đáp án ${String.fromCharCode(65 + index)}`}
									className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={loading}
								/>

								{/* Remove Button */}
								{formData.options.length > 2 && (
									<button
										type='button'
										onClick={() => removeOption(index)}
										className='p-1 hover:bg-red-100 rounded transition-colors'
										disabled={loading}
									>
										<X className='w-4 h-4 text-red-600' />
									</button>
								)}
							</div>
						))}
					</div>

					<p className='text-xs text-gray-500 mt-4'>
						Chọn đáp án đúng bằng nút radio. Tối đa 10 đáp án.
					</p>
				</Card>

				{/* Explanation */}
				<Card className='p-6'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>
						Giải thích (Tùy chọn)
					</h2>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Giải thích đáp án đúng
						</label>
						<textarea
							name='explanation'
							value={formData.explanation}
							onChange={handleInputChange}
							placeholder='Cung cấp giải thích chi tiết về đáp án đúng'
							rows={4}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							disabled={loading}
						/>
						<p className='text-xs text-gray-500 mt-1'>
							{formData.explanation.length} ký tự
						</p>
					</div>
				</Card>

				{/* Submit Button */}
				<div className='flex gap-3'>
					<button
						type='submit'
						disabled={loading}
						className='flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium'
					>
						<Save className='w-4 h-4' />
						{loading ? 'Đang lưu...' : 'Lưu câu hỏi'}
					</button>
					<button
						type='button'
						className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
					>
						Hủy
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddQuestionPage;
