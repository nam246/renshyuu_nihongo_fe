'use client';

import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Question, AnswerOption } from '@/types/types';

interface QuestionCardProps {
	question: Question;
	currentAnswer: AnswerOption | null;
	onAnswerSelect: (option: AnswerOption) => void;
	// Props từ TestQuestionMeta
	currentQuestionIndex: number;
	answered: boolean;
	onFlagged: (id: string) => void;
}

export default function QuestionCard({
	question,
	currentAnswer,
	onAnswerSelect,
	currentQuestionIndex,
	answered,
	onFlagged,
}: QuestionCardProps) {
	const optionLabels = {
		a: '①',
		b: '②',
		c: '③',
		d: '④',
	};

	const optionKeys: AnswerOption[] = ['a', 'b', 'c', 'd'];

	return (
		<Card>
			<CardHeader>
				{/* Question */}
				<div className='flex justify-between mb-4'>
					<Badge variant='secondary'>
						{answered ? (
							<span className='flex items-center text-green-600'>
								<CheckCircle2 className='h-4 w-4 mr-1' />
								Đã trả lời
							</span>
						) : (
							<span className='flex items-center text-amber-600'>
								<XCircle className='h-4 w-4 mr-1' />
								Chưa trả lời
							</span>
						)}
					</Badge>
					<Button variant='outline' size='sm' onClick={() => onFlagged(question.id)}>
						<Flag /> Đánh dấu
					</Button>
				</div>
				{question?.mediaUrl && (
					<div className='mb-4'>
						<audio controls className='mb-5 w-full'>
							<source src={question.mediaUrl} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
					</div>
				)}

				<CardTitle className='text-lg whitespace-pre-line'>
					Câu {currentQuestionIndex + 1}: {question.question}
				</CardTitle>
				<CardAction></CardAction>
			</CardHeader>
			<CardContent>
				{/* Options */}
				<RadioGroup className='max-w-full' value={currentAnswer || ''}>
					{optionKeys.map((key) => {
						const optionValue = question.options[key];
						if (!optionValue) return null;

						return (
							<FieldLabel
								key={key}
								htmlFor={`${question.id}-${key}`}
								onClick={() => onAnswerSelect(key)}
								className={cn(
									'cursor-pointer hover:bg-accent/50',
									currentAnswer === key && 'bg-primary/5 border-primary',
								)}
							>
								<Field orientation='horizontal'>
									<RadioGroupItem
										value={key}
										id={`${question.id}-${key}`}
										checked={currentAnswer === key}
									/>
									<FieldContent className='flex flex-row items-center'>
										<FieldTitle>{optionLabels[key]}</FieldTitle>
										<FieldDescription>{optionValue}</FieldDescription>
									</FieldContent>
								</Field>
							</FieldLabel>
						);
					})}
				</RadioGroup>

				{/* Explanation (if answered) */}
				{currentAnswer !== null && question.explanation && (
					<div className='mt-6 p-4 bg-muted rounded-lg border-l-4 border-primary'>
						<h4 className='font-semibold mb-2 flex items-center'>
							<CheckCircle2 className='h-4 w-4 mr-2 text-primary' />
							Giải thích:
						</h4>
						<p className='text-sm leading-relaxed'>{question.explanation}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
