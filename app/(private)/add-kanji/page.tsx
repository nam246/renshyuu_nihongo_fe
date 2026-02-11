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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

interface KanjiFormData {
	character: string;
	onyomi: string;
	kunyomi: string;
	meaning: string;
	level: string;
	strokeCount: number;
	mediaFile: File | null;
	mediaPreview: string;
	examples: Array<{ word: string; meaning: string }>;
}

const AddKanjiPage = () => {
	const [formData, setFormData] = useState<KanjiFormData>({
		character: '',
		onyomi: '',
		kunyomi: '',
		meaning: '',
		level: 'N5',
		strokeCount: 0,
		mediaFile: null,
		mediaPreview: '',
		examples: [{ word: '', meaning: '' }],
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
			[name]: name === 'strokeCount' ? parseInt(value) || 0 : value,
		}));
		setError('');
	};

	const handleExampleChange = (
		index: number,
		field: 'word' | 'meaning',
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
			examples: [...prev.examples, { word: '', meaning: '' }],
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
			if (!formData.character.trim()) {
				throw new Error('Vui lòng nhập ký tự kanji');
			}
			if (!formData.meaning.trim()) {
				throw new Error('Vui lòng nhập ý nghĩa');
			}

			// TODO: Call API to save kanji
			console.log('Saving kanji:', formData);

			setSuccess('Thêm kanji thành công!');
			// Reset form
			setFormData({
				character: '',
				onyomi: '',
				kunyomi: '',
				meaning: '',
				level: 'N5',
				strokeCount: 0,
				mediaFile: null,
				mediaPreview: '',
				examples: [{ word: '', meaning: '' }],
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
				title='Thêm kanji mới'
				description='Tạo ký tự kanji mới để bổ sung vào thư viện học tập'
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
						{/* Kanji Character */}
						<div>
							<Label className='block text-sm font-medium text-gray-700 mb-2'>
								Ký tự Kanji *
							</Label>
							<Input
								type='text'
								name='character'
								value={formData.character}
								onChange={handleInputChange}
								placeholder='例：学'
								maxLength={1}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-3xl text-center font-bold'
								disabled={loading}
							/>
						</div>

						{/* Meaning */}
						<div>
							<Label className='block text-sm font-medium text-gray-700 mb-2'>
								Ý nghĩa *
							</Label>
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

						{/* Onyomi */}
						<div>
							<Label className='block text-sm font-medium text-gray-700 mb-2'>
								Âm On
							</Label>
							<Input
								type='text'
								name='onyomi'
								value={formData.onyomi}
								onChange={handleInputChange}
								placeholder='例：ガク'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
						</div>

						{/* Kunyomi */}
						<div>
							<Label className='block text-sm font-medium text-gray-700 mb-2'>
								Âm Kun
							</Label>
							<Input
								type='text'
								name='kunyomi'
								value={formData.kunyomi}
								onChange={handleInputChange}
								placeholder='例：まな'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
						</div>

						{/* Stroke Count */}
						<div>
							<Label className='block text-sm font-medium text-gray-700 mb-2'>
								Số nét
							</Label>
							<Input
								type='number'
								name='strokeCount'
								value={formData.strokeCount}
								onChange={handleInputChange}
								placeholder='0'
								min='0'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled={loading}
							/>
						</div>

						{/* Level */}
						<div>
							<Label className='block text-sm font-medium text-gray-700 mb-2'>
								Trình độ
							</Label>
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
						<CardTitle>Từ vựng sử dụng</CardTitle>
						<CardAction>
							<Button type='button' onClick={addExample}>
								<Plus className='w-4 h-4' />
								Thêm từ
							</Button>
						</CardAction>
					</CardHeader>

					<CardContent className='space-y-4'>
						{formData.examples.map((example, index) => (
							<div key={index} className='p-4 border border-gray-200 rounded-lg'>
								<div className='flex items-center justify-between mb-3'>
									<p className='text-sm font-medium text-gray-700'>
										Từ vựng {index + 1}
									</p>
									{formData.examples.length > 1 && (
										<Button
											type='button'
											onClick={() => removeExample(index)}
											className='p-1 hover:bg-red-100 rounded transition-colors'
										>
											<X className='w-4 h-4 text-red-600' />
										</Button>
									)}
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									<Input
										type='text'
										value={example.word}
										onChange={(e) => handleExampleChange(index, 'word', e.target.value)}
										placeholder='Từ tiếng Nhật'
										className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
										disabled={loading}
									/>
									<Input
										type='text'
										value={example.meaning}
										onChange={(e) =>
											handleExampleChange(index, 'meaning', e.target.value)
										}
										placeholder='Ý nghĩa tiếng Việt'
										className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
						{loading ? 'Đang lưu...' : 'Lưu Kanji'}
					</Button>
					<Button variant={'secondary'} type='button'>
						Hủy
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddKanjiPage;
