'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from '@tanstack/react-form';
import {
	Card,
	CardAction,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
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
import { Example, Level, Source } from '@/types/types';

interface KanjiFormData {
	character: string;
	onyomi: string;
	kunyomi: string;
	meaning: string;
	level: Level;
	strokeCount: number;
	mediaFile: File | null;
	mediaPreview: string;
	examples: Omit<Example, 'id'>[];
}

interface KanjiFormProps {
	lessonId?: string;
}

export function AddKanjiForm({ lessonId }: KanjiFormProps) {
	const [mediaPreview, setMediaPreview] = useState<string>('');

	const form = useForm({
		defaultValues: {
			character: '',
			onyomi: '',
			kunyomi: '',
			meaning: '',
			level: Level.N5,
			strokeCount: 0,
			mediaFile: null as File | null,
			mediaPreview: '',
			examples: [{ title: '', description: '' }],
		} as KanjiFormData,
		onSubmit: async ({ value }) => {
			try {
				const payload = {
					character: value.character,
					onyomi: value.onyomi,
					kunyomi: value.kunyomi,
					meaning: value.meaning,
					level: value.level,
					strokeCount: value.strokeCount,
					lessonId: lessonId,
					examples: value.examples
						.filter((ex: Omit<Example, 'id'>) => ex.title.trim() !== '')
						.map((ex: Omit<Example, 'id'>) => ({
							title: ex.title,
							description: ex.description,
						})),
				};

				const response = await fetch('http://localhost:4000/kanji', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || 'Failed to create kanji');
				}

				toast.success('Thêm kanji thành công!');
				form.reset();
				setMediaPreview('');
			} catch (error: unknown) {
				console.error('Error creating kanji:', error);
				const errorMessage =
					error instanceof Error ? error.message : 'Có lỗi xảy ra khi thêm kanji';
				toast.error(errorMessage);
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

				<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{/* Kanji Character */}
					<form.Field
						name='character'
						validators={{
							onChange: ({ value }) =>
								!value ? 'Vui lòng nhập ký tự kanji' : undefined,
						}}
					>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='character'>Ký tự Kanji *</Label>
								<Input
									id='character'
									name='character'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder='例：学'
									maxLength={1}
									className='text-3xl text-center font-bold'
								/>
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

					{/* Onyomi */}
					<form.Field name='onyomi'>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='onyomi'>Âm On</Label>
								<Input
									id='onyomi'
									name='onyomi'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder='例：ガク'
								/>
							</div>
						)}
					</form.Field>

					{/* Kunyomi */}
					<form.Field name='kunyomi'>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='kunyomi'>Âm Kun</Label>
								<Input
									id='kunyomi'
									name='kunyomi'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder='例：まな'
								/>
							</div>
						)}
					</form.Field>

					{/* Stroke Count */}
					<form.Field name='strokeCount'>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='strokeCount'>Số nét</Label>
								<Input
									id='strokeCount'
									name='strokeCount'
									type='number'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(Number(e.target.value))}
									placeholder='0'
									min={0}
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
					<CardTitle>Từ vựng sử dụng</CardTitle>
					<form.Field name='examples' mode='array'>
						{(field) => (
							<Button
								variant={'outline'}
								type='button'
								onClick={() => field.pushValue({ title: '', description: '' })}
							>
								<Plus />
								Thêm từ
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
												Từ vựng {index + 1}
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
														placeholder='Từ tiếng Nhật'
													/>
												)}
											</form.Field>
											<form.Field name={`examples[${index}].description`}>
												{(subField) => (
													<Input
														value={subField.state.value}
														onBlur={subField.handleBlur}
														onChange={(e) => subField.handleChange(e.target.value)}
														placeholder='Ý nghĩa tiếng Việt'
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
							{isSubmitting ? 'Đang lưu...' : 'Lưu Kanji'}
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
