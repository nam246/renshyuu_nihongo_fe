'use client';

import { useState } from 'react';
import {
	Card,
	CardAction,
	CardHeader,
	CardTitle,
	CardContent,
} from '@/components/ui/card';
import { Plus, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Level } from '@/types/types';
import PageHeader from '@/components/layout/page-header';

interface VocabularyFormData {
	word: string;
	kana: string;
	romaji: string;
	meaning: string;
	wordType: string;
	level: string;
	mediaFile: File | null;
	mediaPreview: string;
	examples: Array<{ japanese: string; vietnamese: string }>;
}

const AddVocabularyPage = () => {
	const [formData, setFormData] = useState<VocabularyFormData>({
		word: '',
		kana: '',
		romaji: '',
		meaning: '',
		wordType: 'noun',
		level: 'N5',
		mediaFile: null,
		mediaPreview: '',
		examples: [{ japanese: '', vietnamese: '' }],
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

	const handleExampleChange = (
		index: number,
		field: 'japanese' | 'vietnamese',
		value: string,
	) => {
		const newExamples = [...formData.examples];
		newExamples[index] = {
			...newExamples[index],
			[field]: value,
		};
		setFormData((prev) => ({
			...prev,
			examples: newExamples,
		}));
	};

	const addExample = () => {
		setFormData((prev) => ({
			...prev,
			examples: [...prev.examples, { japanese: '', vietnamese: '' }],
		}));
	};

	const removeExample = (index: number) => {
		setFormData((prev) => ({
			...prev,
			examples: prev.examples.filter((_, i) => i !== index),
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
			if (!formData.word.trim()) {
				throw new Error('Vui lòng nhập từ tiếng Nhật');
			}
			if (!formData.meaning.trim()) {
				throw new Error('Vui lòng nhập ý nghĩa');
			}

			// TODO: Call API to save vocabulary
			console.log('Saving vocabulary:', formData);

			setSuccess('Thêm từ vựng thành công!');
			// Reset form
			setFormData({
				word: '',
				kana: '',
				romaji: '',
				meaning: '',
				wordType: 'noun',
				level: 'N5',
				mediaFile: null,
				mediaPreview: '',
				examples: [{ japanese: '', vietnamese: '' }],
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
				title='Thêm từ vựng mới'
				description='Tạo từ vựng mới để bổ sung vào thư viện học tập'
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
				<Card>
					<CardHeader>
						<CardTitle>Thông tin cơ bản</CardTitle>
					</CardHeader>

					<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Japanese Word */}
						<div className='w-full space-y-2'>
							<Label htmlFor='word'>Từ tiếng Nhật *</Label>
							<Input
								type='text'
								name='word'
								value={formData.word}
								onChange={handleInputChange}
								placeholder='例：日本'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
						</div>

						{/* Kana */}
						<div className='w-full space-y-2'>
							<Label htmlFor='kana'>Kana</Label>
							<Input
								type='text'
								name='kana'
								value={formData.kana}
								onChange={handleInputChange}
								placeholder='例：にほん'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
						</div>

						{/* Romaji */}
						<div className='w-full space-y-2'>
							<Label htmlFor='romaji'>Romaji</Label>
							<Input
								type='text'
								name='romaji'
								value={formData.romaji}
								onChange={handleInputChange}
								placeholder='例：nihon'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
						</div>

						{/* Meaning */}
						<div className='w-full space-y-2'>
							<Label htmlFor='meaning'>Ý nghĩa *</Label>
							<Input
								type='text'
								name='meaning'
								value={formData.meaning}
								onChange={handleInputChange}
								placeholder='Ý nghĩa tiếng Việt'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
						</div>

						{/* Word Type */}
						<div className='w-full space-y-2'>
							<Label htmlFor='wordType'>Loại từ</Label>
							<Select
								value={formData.wordType}
								onValueChange={(value) =>
									setFormData((prev) => ({
										...prev,
										wordType: value,
									}))
								}
								disabled={loading}
							>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Chọn Loại từ' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Loại từ</SelectLabel>
										<SelectItem value='noun'>Danh từ</SelectItem>
										<SelectItem value='verb'>Động từ</SelectItem>
										<SelectItem value='adjective'>Tính từ</SelectItem>
										<SelectItem value='adverb'>Trạng từ</SelectItem>
										<SelectItem value='other'>Khác</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						{/* Level */}
						<div className='w-full space-y-2'>
							<Label htmlFor='level'>Trình độ</Label>
							<Select
								value={formData.level}
								onValueChange={(value) =>
									setFormData((prev) => ({
										...prev,
										level: value,
									}))
								}
								disabled={loading}
							>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Chọn trình độ' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Trình độ</SelectLabel>
										<SelectItem value={Level.N5}>{Level.N5}</SelectItem>
										<SelectItem value={Level.N4}>{Level.N4}</SelectItem>
										<SelectItem value={Level.N3}>{Level.N3}</SelectItem>
										<SelectItem value={Level.N2}>{Level.N2}</SelectItem>
										<SelectItem value={Level.N1}>{Level.N1}</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</CardContent>
				</Card>
				{/* Media Upload */}
				<Card>
					<CardHeader>
						<CardTitle>Hình ảnh minh họa</CardTitle>
					</CardHeader>

					<CardContent>
						<div className='w-full space-y-2'>
							<Label htmlFor='kana'>Tải lên hình ảnh</Label>
							<Input
								type='file'
								accept='image/*'
								onChange={handleMediaChange}
								disabled={loading}
							/>

							<p className='text-xs text-gray-500 my-1'>
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
								<Button
									variant='destructive'
									type='button'
									onClick={removeMedia}
									className='absolute -top-2 -right-2 rounded-full'
									size={'icon'}
								>
									<X className='w-4 h-4' />
								</Button>
							</div>
						)}
					</CardContent>
				</Card>
				{/* Examples */}
				<Card>
					<CardHeader>
						<CardTitle>Ví dụ</CardTitle>
						<CardAction>
							<Button variant={'outline'} type='button' onClick={addExample}>
								<Plus className='w-4 h-4' />
								Thêm ví dụ
							</Button>
						</CardAction>
					</CardHeader>

					<CardContent className='space-y-4'>
						{formData.examples.map((example, index) => (
							<div key={index} className='p-4 border border-gray-200 rounded-lg'>
								<div className='flex items-center justify-between mb-3'>
									<p className='text-sm font-medium'>Ví dụ {index + 1}</p>
									{formData.examples.length > 1 && (
										<Button
											variant='destructive'
											type='button'
											onClick={() => removeExample(index)}
										>
											<X className='w-4 h-4' />
										</Button>
									)}
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									<Input
										type='text'
										value={example.japanese}
										onChange={(e) =>
											handleExampleChange(index, 'japanese', e.target.value)
										}
										placeholder='Câu tiếng Nhật'
										disabled={loading}
									/>
									<Input
										type='text'
										value={example.vietnamese}
										onChange={(e) =>
											handleExampleChange(index, 'vietnamese', e.target.value)
										}
										placeholder='Dịch tiếng Việt'
										disabled={loading}
									/>
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Submit Button */}
				<div className='flex gap-3'>
					<Button variant={'default'} type='submit' disabled={loading}>
						<Save className='w-4 h-4' />
						{loading ? 'Đang lưu...' : 'Lưu từ vựng'}
					</Button>
					<Button variant={'secondary'} type='button'>
						Hủy
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddVocabularyPage;
