'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
	question: {
		id: string;
		question: string;
		options: string[];
		explanation?: string;
	};
	currentAnswer: number | null;
	onAnswerSelect: (optionIndex: number) => void;
}

export default function QuestionCard({
	question,
	currentAnswer,
	onAnswerSelect,
}: QuestionCardProps) {
	const options = ['①', '②', '③', '④'];

	return (
		<Card>
			<CardHeader>
				{/* Question */}
				<CardTitle className='text-lg whitespace-pre-line'>
					{question.question}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				{/* Options */}
				<RadioGroup className='max-w-full'>
					{question.options.map((option, index) => (
						<FieldLabel key={index} htmlFor={options[index]} onClick={() => onAnswerSelect(index)}>
							<Field orientation='horizontal'>
								<RadioGroupItem value={option} id={options[index]} />
								<FieldContent className='flex flex-row items-center'>
									<FieldTitle>{options[index]}</FieldTitle>
									<FieldDescription>{option}</FieldDescription>
								</FieldContent>
							</Field>
						</FieldLabel>
					))}
				</RadioGroup>

				{/* Explanation (if answered) */}
				{currentAnswer !== null && question.explanation && (
					<div className='mt-6 p-4 bg-muted rounded-lg'>
						<h4 className='font-semibold mb-2'>Giải thích:</h4>
						<p className='text-sm'>{question.explanation}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
