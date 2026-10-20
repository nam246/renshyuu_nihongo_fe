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
	SelectTrigger,
	SelectValue,
	SelectLabel,
} from '@/components/ui/select';
import { Level } from '@/types/types';

interface QuestionOption {
	text: string;
}

interface QuestionFormData {
	question: string;
	options: QuestionOption[];
	correctAnswer: number;
	explanation: string;
	level: Level;
	category: string;
	mediaFile: File | null;
	mediaPreview: string;
}

export function AddQuestionForm() {
	const [mediaPreview, setMediaPreview] = useState<string>('');

	const form = useForm({
		defaultValues: {
			question: '',
			options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
			correctAnswer: 0,
			explanation: '',
			level: Level.N5,
			category: 'vocabulary',
			mediaFile: null as File | null,
			mediaPreview: '',
		} as QuestionFormData,
		onSubmit: async ({ value }) => {
			try {
				// Validate options
				const validOptions = value.options.filter((o) => o.text.trim());
				if (validOptions.length < 2) {
					throw new Error('Vui lòng nhập ít nhất 2 đáp án');
				}
				if (value.correctAnswer >= validOptions.length) {
					// This might happen if user selected an option that was empty and thus filtered out,
					// strict logic might be needed, but sticking to basic validation.
					// Actually, if we send all options (even empty ones) to backend, we should be careful.
					// The original code filtered validOptions BEFORE creating payload.
				}

				// Construct payload similar to original
				const payload = {
					question: value.question.trim(),
					options: validOptions.map((o) => o.text),
					correctAnswer: value.correctAnswer, // This index might need adjustment if we filter options!
					// Original code:
					// const validOptions = formData.options.filter((o) => o.text.trim());
					// ...
					// const payload = { options: validOptions.map((o) => o.text), ... }
					// BUT, if correctAnswer pointed to index 3, and index 2 was empty/removed, then index 3 becomes index 2.
					// The original code DID NOT re-calculate correctAnswer based on filtered options in handleSubmit logic,
					// IT DID adjust it in removeOption however.
					// But in handleSubmit it just took validOptions. This implies if I have [A, "", C] and correct is index 2 (C).
					// validOptions is [A, C]. payload options is [A, C].
					// payload correctAnswer is 2. But C is now at index 1. So 2 is out of bounds or wrong.
					// This is a logic flaw in the original code or I misread it.
					// Original:
					// const validOptions = formData.options.filter((o) => o.text.trim());
					// ...
					// payload = { options: validOptions.map(...) ... correctAnswer: formData.correctAnswer }
					// Yes, it looks potentially buggy if empty options exist in the middle.
					// I will assume for now we send what is in the form, or I should replicate "filter empty" but handle index.
					// Simpler: Don't allow empty options in the middle or just send all options and let backend handle?
					// Better: I will use the current form state as is (with empty strings if any) OR
					// to be safe/clean: I will replicate the "filter" logic but I'll assume the user fills them in order or I won't filter mid-stream empties to avoid index shift issues unless I remap the index.
					// For now, I'll allow sending the strings as is, OR implement strict validation "Please fill all options".
					// Original code allowed filtering. I'll stick to a simple mapping for now.
					explanation: value.explanation.trim(),
					level: value.level,
					category: value.category,
				};

				// Actually, let's just make sure we don't mess up indices.
				// If I filter, I must re-calculate correct index.
				// For simplicity in this refactor, I will filter empty ones but I'll warn if selected answer is empty?
				// Let's just trust the form state index matches the options array index.
				// If I filter the options array, I break the index relationship unless I track which one was selected.
				// Strategy: Map options to { text, isCorrect } then filter, then reconstruct?
				// But payload expects { options: string[], correctAnswer: number }.
				// I will maintain the logic:
				// 1. Identify the selected option object or ID.
				// 2. Filter options.
				// 3. Find the new index of the selected option.

				const selectedOption = value.options[value.correctAnswer];
				if (!selectedOption || !selectedOption.text.trim()) {
					throw new Error('Đáp án đúng không hợp lệ');
				}

				const finalOptions = value.options.filter((o) => o.text.trim());
				// Find new index
				// Note: duplicates? If two options have same text...
				// Only safe way is if we tracked IDs. We don't have IDs.
				// I will assume standard usage.
				const newCorrectAnswer = finalOptions.findIndex(
					(o) => o === selectedOption,
				);

				const finalPayload = {
					...payload,
					options: finalOptions.map((o) => o.text),
					correctAnswer: newCorrectAnswer,
				};

				const response = await fetch('http://localhost:3000/question', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(finalPayload),
				});

				if (!response.ok) {
					throw new Error('Failed to create question');
				}

				toast.success('Thêm câu hỏi thành công!');
				form.reset();
				setMediaPreview('');
			} catch (error) {
				console.error('Error creating question:', error);
				toast.error(
					error instanceof Error ? error.message : 'Có lỗi xảy ra khi thêm câu hỏi',
				);
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
					<CardTitle>Thông tin câu hỏi</CardTitle>
				</CardHeader>

				<CardContent className='space-y-4'>
					{/* Question */}
					<form.Field
						name='question'
						validators={{
							onChange: ({ value }) => (!value ? 'Vui lòng nhập câu hỏi' : undefined),
						}}
					>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='question'>Câu hỏi *</Label>
								<Textarea
									id='question'
									name='question'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder='Nhập câu hỏi trắc nghiệm'
									rows={3}
								/>
								{field.state.meta.errors ? (
									<p className='text-sm text-red-500'>
										{field.state.meta.errors.join(', ')}
									</p>
								) : null}
							</div>
						)}
					</form.Field>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Category */}
						<form.Field name='category'>
							{(field) => (
								<div className='w-full space-y-2'>
									<Label htmlFor='category'>Danh mục *</Label>
									<Select
										value={field.state.value}
										onValueChange={(value) => field.handleChange(value)}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Chọn danh mục' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value='vocabulary'>Từ vựng</SelectItem>
												<SelectItem value='grammar'>Ngữ pháp</SelectItem>
												<SelectItem value='kanji'>Kanji</SelectItem>
												<SelectItem value='reading'>Đọc hiểu</SelectItem>
												<SelectItem value='listening'>Nghe hiểu</SelectItem>
												<SelectItem value='writing'>Viết</SelectItem>
												<SelectItem value='other'>Khác</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							)}
						</form.Field>

						{/* Level */}
						<form.Field name='level'>
							{(field) => (
								<div className='w-full space-y-2'>
									<Label htmlFor='level'>Trình độ N-Jlpt *</Label>
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
					</div>
				</CardContent>
			</Card>

			{/* Media Upload */}
			<Card>
				<CardHeader>
					<CardTitle>Hình ảnh minh họa (Tùy chọn)</CardTitle>
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

			{/* Options */}
			<Card>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle>
						<form.Subscribe selector={(state) => state.values.options.length}>
							{(length) => `Đáp án (${length})`}
						</form.Subscribe>
					</CardTitle>
					<form.Field name='options' mode='array'>
						{(field) => (
							<Button
								type='button'
								variant='outline'
								onClick={() => {
									if (field.state.value.length < 10) {
										field.pushValue({ text: '' });
									}
								}}
								disabled={field.state.value.length >= 10}
							>
								<Plus className='w-4 h-4 mr-2' />
								Thêm đáp án
							</Button>
						)}
					</form.Field>
				</CardHeader>

				<CardContent className='space-y-3'>
					<form.Field name='options' mode='array'>
						{(field) => (
							<>
								{field.state.value.map((_, index) => (
									<div key={index} className='flex items-center gap-3'>
										{/* Radio for correct answer */}
										<form.Field name='correctAnswer'>
											{(answerField) => (
												<input
													type='radio'
													name='correctAnswer'
													checked={answerField.state.value === index}
													onChange={() => answerField.handleChange(index)}
													className='w-5 h-5 text-blue-600 cursor-pointer'
												/>
											)}
										</form.Field>

										<span className='text-sm font-medium text-gray-600 min-w-fit'>
											{String.fromCharCode(65 + index)}.
										</span>

										<form.Field name={`options[${index}].text`}>
											{(subField) => (
												<Input
													value={subField.state.value}
													onBlur={subField.handleBlur}
													onChange={(e) => subField.handleChange(e.target.value)}
													placeholder={`Đáp án ${String.fromCharCode(65 + index)}`}
													className='flex-1'
												/>
											)}
										</form.Field>

										{field.state.value.length > 2 && (
											<Button
												variant='ghost'
												size='icon'
												type='button'
												onClick={() => {
													field.removeValue(index);
													// Handle correct answer shift?
													// useForm might not handle this index shift automatically if we just remove item at index.
													// If we remove an item before the correct answer, the correct answer index needs to decrement.
													// If we remove the correct answer, we probably reset or shift.
													// I'll leave basic remove logic, but ideally we should update correctAnswer.
													// Access form state to update correctAnswer?
													// This is tricky inside the helper.
													// Let's assume standard behavior for now or improved later.
													// Actually, I can access form instance in the closure if I wasn't inside the render prop?
													// I can capture `form` from outer scope.
													const currentCorrect = form.getFieldValue('correctAnswer');
													if (index < currentCorrect) {
														form.setFieldValue('correctAnswer', currentCorrect - 1);
													} else if (index === currentCorrect) {
														form.setFieldValue('correctAnswer', 0); // Reset or careful choice
													}
												}}
												className='hover:bg-red-100 hover:text-red-600'
											>
												<X className='w-4 h-4' />
											</Button>
										)}
									</div>
								))}
							</>
						)}
					</form.Field>
					<p className='text-xs text-gray-500 mt-4'>
						Chọn đáp án đúng bằng nút radio. Tối đa 10 đáp án.
					</p>
				</CardContent>
			</Card>

			{/* Explanation */}
			<Card>
				<CardHeader>
					<CardTitle>Giải thích (Tùy chọn)</CardTitle>
				</CardHeader>
				<CardContent>
					<form.Field name='explanation'>
						{(field) => (
							<div className='w-full space-y-2'>
								<Label htmlFor='explanation'>Giải thích đáp án đúng</Label>
								<Textarea
									id='explanation'
									name='explanation'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder='Cung cấp giải thích chi tiết về đáp án đúng'
									rows={4}
								/>
							</div>
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
							{isSubmitting ? 'Đang lưu...' : 'Lưu câu hỏi'}
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
