'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from '@tanstack/react-form';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardAction,
	CardDescription,
} from '@/components/ui/card';
import { Plus, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Example, Level, Source } from '@/types/types';

interface GrammarFormData {
	pattern: string;
	structure: string;
	meaning: string;
	explanation: string;
	level: Level;
	mediaFile: File | null;
	mediaPreview: string;
	examples: Omit<Example, 'id'>[];
}

export default function AddGrammarForm() {
	const [mediaPreview, setMediaPreview] = useState<string>('');

	const form = useForm({
		defaultValues: {
			pattern: '',
			structure: '',
			meaning: '',
			explanation: '',
			level: Level.N5,
			mediaFile: null as File | null,
			mediaPreview: '',
			examples: [{ title: '', description: '' }],
		} as GrammarFormData,
		onSubmit: async ({ value }) => {
			try {
				const payload = {
					pattern: value.pattern,
					structure: value.structure,
					meaning: value.meaning,
					explanation: value.explanation,
					level: value.level,
					examples: value.examples.map((ex) => ({
						title: ex.title,
						description: ex.description,
					})),
					// Note: mediaFile is ignored as backend doesn't support it yet
				};

				const response = await fetch('http://localhost:4000/grammar', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				});

				if (!response.ok) {
					throw new Error('Failed to create grammar');
				}

				toast.success('Thêm ngữ pháp thành công!');
				form.reset();
				setMediaPreview('');
			} catch (error) {
				console.error('Error creating grammar:', error);
				toast.error('Có lỗi xảy ra khi thêm ngữ pháp');
			}
		},
	});

	type FieldWithHandleChange = {
		handleChange: (value: File | null) => void;
	};

	const handleMediaChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: FieldWithHandleChange,
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setMediaPreview(reader.result as string);
				field.handleChange(file);
			};
			reader.readAsDataURL(file);
		}
	};

	const removeMedia = (field: FieldWithHandleChange) => {
		setMediaPreview('');
		field.handleChange(null);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className='space-y-6'
		>
			{/* Basic Info */}
			<Card>
				<CardHeader>
					<CardTitle>Thông tin cơ bản</CardTitle>
				</CardHeader>

				<CardContent className='grid grid-cols-1 gap-4'>
					{/* Pattern */}
					<form.Field
						name='pattern'
						validators={{
							onChange: ({ value }) =>
								!value ? 'Vui lòng nhập mẫu ngữ pháp' : undefined,
						}}
					>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='pattern'>Mẫu ngữ pháp *</Label>
								<Input
									id='pattern'
									name='pattern'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder='例：〜です'
								/>
								{field.state.meta.errors ? (
									<p className='text-sm text-red-500'>
										{field.state.meta.errors.join(', ')}
									</p>
								) : null}
							</div>
						)}
					</form.Field>

					{/* Structure */}
					<form.Field
						name='structure'
						validators={{
							onChange: ({ value }) => (!value ? 'Vui lòng nhập cấu trúc' : undefined),
						}}
					>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='structure'>Cấu trúc *</Label>
								<Input
									id='structure'
									name='structure'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder='例：[Noun] です'
								/>
								<p className='text-xs text-gray-500 mt-1'>
									Mô tả cấu trúc sử dụng [Danh từ], [Động từ], v.v.
								</p>
								{field.state.meta.errors ? (
									<p className='text-sm text-red-500'>
										{field.state.meta.errors.join(', ')}
									</p>
								) : null}
							</div>
						)}
					</form.Field>

					{/* Meaning */}
					<form.Field
						name='meaning'
						validators={{
							onChange: ({ value }) => (!value ? 'Vui lòng nhập ý nghĩa' : undefined),
						}}
					>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='meaning'>Ý nghĩa *</Label>
								<Input
									id='meaning'
									name='meaning'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder='Ý nghĩa tiếng Việt'
								/>
								{field.state.meta.errors ? (
									<p className='text-sm text-red-500'>
										{field.state.meta.errors.join(', ')}
									</p>
								) : null}
							</div>
						)}
					</form.Field>

					{/* Explanation */}
					<form.Field name='explanation'>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='explanation'>Giải thích chi tiết</Label>
								<Textarea
									id='explanation'
									name='explanation'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder='Giải thích chi tiết về cách sử dụng mẫu này'
									rows={5}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
							</div>
						)}
					</form.Field>

					{/* Level */}
					<form.Field name='level'>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='level'>Trình độ</Label>
								<Select
									value={field.state.value}
									onValueChange={(value) => field.handleChange(value as Level)}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Chọn trình độ' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Trình độ</SelectLabel>
											{Object.values(Level).map((lvl, index) => (
												<SelectItem key={index} value={lvl}>
													{lvl}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						)}
					</form.Field>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Liên kết</CardTitle>
				</CardHeader>
				<CardContent className='grid grid-cols-1 gap-4'>
					<div className='w-full space-y-2'>
						<Label htmlFor='explanation'>Lesson</Label>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Chọn Lesson' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Trình độ</SelectLabel>
									{Object.values(Source).map((src, index) => (
										<SelectItem key={index} value={src}>
											{src}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className='w-full space-y-2'>
						<Label htmlFor='explanation'>Nguồn sách giáo khoa</Label>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Chọn trình độ' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Trình độ</SelectLabel>
									{Object.values(Source).map((src, index) => (
										<SelectItem key={index} value={src}>
											{src}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Media Upload (UI Only) */}
			<Card>
				<CardHeader>
					<CardTitle>Hình ảnh minh họa</CardTitle>
				</CardHeader>

				<CardContent>
					<form.Field name='mediaFile'>
						{(field) => (
							<div className='w-full space-y-4'>
								<Label>Tải lên hình ảnh</Label>
								<Input
									type='file'
									accept='image/*'
									onChange={(e) => handleMediaChange(e, field)}
								/>
								<CardDescription>Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB)</CardDescription>
								{mediaPreview && (
									<div className='relative inline-block mt-2'>
										<Image
											src={mediaPreview}
											alt='Preview'
											width={200}
											height={200}
											className='max-w-xs h-auto rounded-lg border border-gray-300'
										/>
										<Button
											variant='destructive'
											type='button'
											onClick={() => removeMedia(field)}
											className='absolute -top-2 -right-2'
										>
											<X className='w-4 h-4' />
										</Button>
									</div>
								)}
							</div>
						)}
					</form.Field>
				</CardContent>
			</Card>

			{/* Examples */}
			<Card>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle>Ví dụ</CardTitle>
					<form.Field name='examples' mode='array'>
						{(field) => (
							<Button
								variant={'outline'}
								type='button'
								onClick={() => field.pushValue({ title: '', description: '' })}
							>
								<Plus />
								Thêm ví dụ
							</Button>
						)}
					</form.Field>
				</CardHeader>

				<CardContent className='space-y-4'>
					<form.Field name='examples' mode='array'>
						{(field) => (
							<>
								{field.state.value.map((_, index) => (
									<Card key={index}>
										<CardHeader>
											<CardTitle className='text-sm font-medium'>
												Ví dụ {index + 1}
											</CardTitle>

											<CardAction>
												{field.state.value.length > 1 && (
													<Button
														variant='destructive'
														type='button'
														size='icon'
														onClick={() => field.removeValue(index)}
													>
														<X />
													</Button>
												)}
											</CardAction>
										</CardHeader>

										<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-3'>
											<form.Field name={`examples[${index}].title`}>
												{(subField) => (
													<Input
														value={subField.state.value}
														onBlur={subField.handleBlur}
														onChange={(e) => subField.handleChange(e.target.value)}
														placeholder='Câu tiếng Nhật'
													/>
												)}
											</form.Field>
											<form.Field name={`examples[${index}].description`}>
												{(subField) => (
													<Input
														value={subField.state.value}
														onBlur={subField.handleBlur}
														onChange={(e) => subField.handleChange(e.target.value)}
														placeholder='Dịch tiếng Việt'
													/>
												)}
											</form.Field>
										</CardContent>
									</Card>
								))}
							</>
						)}
					</form.Field>
				</CardContent>
			</Card>

			{/* Submit Button */}
			<div className='flex gap-3'>
				<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
					{([canSubmit, isSubmitting]) => (
						<Button variant='default' type='submit' disabled={!canSubmit}>
							<Save className='w-4 h-4 mr-2' />
							{isSubmitting ? 'Đang lưu...' : 'Lưu ngữ pháp'}
						</Button>
					)}
				</form.Subscribe>
				<Button variant='secondary' type='button' onClick={() => form.reset()}>
					Hủy
				</Button>
			</div>
		</form>
	);
}
