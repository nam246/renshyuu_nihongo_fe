'use client';

import { useState } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Plus, Save, X } from 'lucide-react';
import PageHeader from '@/components/layout/page-header';
import { AddQuestionForm } from '../_components/form/add-question-form';

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

			<AddQuestionForm />
		</div>
	);
};

export default AddQuestionPage;
