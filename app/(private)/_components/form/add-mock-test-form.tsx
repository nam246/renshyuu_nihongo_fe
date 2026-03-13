'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Plus, Save, X } from 'lucide-react';

interface Question {
	question: string;
	options: string[];
	correctAnswer: number;
	explanation: string;
}

interface MockTestFormData {
	title: string;
	description: string;
	level: string;
	duration: number;
	passScore: number;
	totalQuestions: number;
	mediaFile: File | null;
	mediaPreview: string;
	questions: Question[];
}

export function AddMockTestForm() {
	const [formData, setFormData] = useState<MockTestFormData>({
		title: '',
		description: '',
		level: 'N5',
		duration: 60,
		passScore: 70,
		totalQuestions: 1,
		mediaFile: null,
		mediaPreview: '',
		questions: [
			{
				question: '',
				options: ['', '', '', ''],
				correctAnswer: 0,
				explanation: '',
			},
		],
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
			[name]:
				name === 'duration' || name === 'passScore' || name === 'totalQuestions'
					? parseInt(value) || 0
					: value,
		}));
		setError('');
	};

	const handleQuestionChange = <
		K extends keyof Question
	>(
		index: number,
		field: K,
		value: Question[K],
	) => {
		const newQuestions = [...formData.questions];
		newQuestions[index] = {
			...newQuestions[index],
			[field]: value,
		};
		setFormData((prev) => ({
			...prev,
			questions: newQuestions,
		}));
	};

	const handleOptionChange = (
		questionIndex: number,
		optionIndex: number,
		value: string,
	) => {
		const newQuestions = [...formData.questions];
		newQuestions[questionIndex].options[optionIndex] = value;
		setFormData((prev) => ({
			...prev,
			questions: newQuestions,
		}));
	};

	const addQuestion = () => {
		setFormData((prev) => ({
			...prev,
			totalQuestions: prev.totalQuestions + 1,
			questions: [
				...prev.questions,
				{
					question: '',
					options: ['', '', '', ''],
					correctAnswer: 0,
					explanation: '',
				},
			],
		}));
	};

	const removeQuestion = (index: number) => {
		setFormData((prev) => ({
			...prev,
			totalQuestions: Math.max(1, prev.totalQuestions - 1),
			questions: prev.questions.filter((_, i) => i !== index),
		}));
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
			if (!formData.title.trim()) {
				throw new Error('Vui lòng nhập tiêu đề bài kiểm tra');
			}
			if (formData.questions.length === 0) {
				throw new Error('Vui lòng thêm ít nhất một câu hỏi');
			}

			// Validate questions
			for (let i = 0; i < formData.questions.length; i++) {
				const q = formData.questions[i];
				if (!q.question.trim()) {
					throw new Error(`Vui lòng nhập câu hỏi ${i + 1}`);
				}
				if (q.options.some((o) => !o.trim())) {
					throw new Error(`Vui lòng nhập tất cả đáp án cho câu hỏi ${i + 1}`);
				}
			}

			// TODO: Call API to save mock test
			console.log('Saving mock test:', formData);

			setSuccess('Thêm bài kiểm tra thành công!');
			// Reset form
			setFormData({
				title: '',
				description: '',
				level: 'N5',
				duration: 60,
				passScore: 70,
				totalQuestions: 1,
				mediaFile: null,
				mediaPreview: '',
				questions: [
					{
						question: '',
						options: ['', '', '', ''],
						correctAnswer: 0,
						explanation: '',
					},
				],
			});
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Đã xảy ra lỗi không xác định');
			}
		} finally {
			setLoading(false);
		}
	};
	return (
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
					Thông tin bài kiểm tra
				</h2>

				<div className='space-y-4'>
					{/* Title */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Tiêu đề *
						</label>
						<input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleInputChange}
							placeholder='例：N5 Mock Test - Kanji'
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							disabled={loading}
						/>
					</div>

					{/* Description */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Mô tả
						</label>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleInputChange}
							placeholder='Mô tả bài kiểm tra'
							rows={3}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							disabled={loading}
						/>
					</div>

					{/* Grid for smaller fields */}
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						{/* Level */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Trình độ
							</label>
							<select
								name='level'
								value={formData.level}
								onChange={handleInputChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							>
								<option value='N5'>N5</option>
								<option value='N4'>N4</option>
								<option value='N3'>N3</option>
								<option value='N2'>N2</option>
								<option value='N1'>N1</option>
							</select>
						</div>

						{/* Duration */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Thời gian (phút)
							</label>
							<input
								type='number'
								name='duration'
								value={formData.duration}
								onChange={handleInputChange}
								min='1'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
						</div>

						{/* Pass Score */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Điểm đạt (%)
							</label>
							<input
								type='number'
								name='passScore'
								value={formData.passScore}
								onChange={handleInputChange}
								min='0'
								max='100'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
						</div>

						{/* Total Questions */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Tổng câu hỏi
							</label>
							<input
								type='number'
								name='totalQuestions'
								value={formData.totalQuestions}
								onChange={handleInputChange}
								min='1'
								readOnly
								className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50'
							/>
						</div>
					</div>
				</div>
			</Card>
			{/* Media Upload */}
			<Card className='p-6'>
				<h2 className='text-lg font-semibold text-gray-900 mb-4'>
					Hình ảnh minh họa
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
							Ỗng hỗ trợ: JPG, PNG, GIF (Tối đa 5MB)
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
			{/* Questions */}
			<Card className='p-6'>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-lg font-semibold text-gray-900'>
						Câu hỏi ({formData.questions.length})
					</h2>
					<button
						type='button'
						onClick={addQuestion}
						className='flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors'
					>
						<Plus className='w-4 h-4' />
						Thêm câu hỏi
					</button>
				</div>

				<div className='space-y-6'>
					{formData.questions.map((question, qIndex) => (
						<div
							key={qIndex}
							className='p-4 border border-gray-200 rounded-lg bg-gray-50'
						>
							{/* Question Header */}
							<div className='flex items-center justify-between mb-4'>
								<p className='text-sm font-semibold text-gray-900'>
									Câu hỏi {qIndex + 1}
								</p>
								{formData.questions.length > 1 && (
									<button
										type='button'
										onClick={() => removeQuestion(qIndex)}
										className='p-1 hover:bg-red-100 rounded transition-colors'
									>
										<X className='w-4 h-4 text-red-600' />
									</button>
								)}
							</div>

							{/* Question Text */}
							<div className='mb-4'>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Câu hỏi
								</label>
								<input
									type='text'
									value={question.question}
									onChange={(e) =>
										handleQuestionChange(qIndex, 'question', e.target.value)
									}
									placeholder='Nhập câu hỏi'
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={loading}
								/>
							</div>

							{/* Options */}
							<div className='mb-4 space-y-2'>
								<label className='block text-sm font-medium text-gray-700'>
									Đáp án
								</label>
								{question.options.map((option, oIndex) => (
									<div key={oIndex} className='flex items-center gap-3'>
										<input
											type='radio'
											name={`correct-${qIndex}`}
											value={oIndex}
											checked={question.correctAnswer === oIndex}
											onChange={(e) =>
												handleQuestionChange(
													qIndex,
													'correctAnswer',
													parseInt(e.target.value),
												)
											}
											disabled={loading}
										/>
										<input
											type='text'
											value={option}
											onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
											placeholder={`Đáp án ${oIndex + 1}`}
											className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
											disabled={loading}
										/>
									</div>
								))}
							</div>

							{/* Explanation */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Giải thích
								</label>
								<textarea
									value={question.explanation}
									onChange={(e) =>
										handleQuestionChange(qIndex, 'explanation', e.target.value)
									}
									placeholder='Giải thích đáp án đúng'
									rows={2}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={loading}
								/>
							</div>
						</div>
					))}
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
					{loading ? 'Đang lưu...' : 'Lưu bài kiểm tra'}
				</button>
				<button
					type='button'
					className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
				>
					Hủy
				</button>
			</div>
		</form>
	);
}
