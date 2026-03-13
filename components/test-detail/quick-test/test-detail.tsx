'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Question, AnswerOption } from '@/types/types';

import SidebarTracking from './sidebar-tracking';
import QuestionCard from '../question-card';
import TestHeader from '../test-header';
import TestQuestionMeta from '../test-question-meta';
import TestFooterNavigation from '../test-footer-navigation';
import { Badge } from '@/components/ui/badge';
import TestDetailLayout from '../test-detail-layout';

type MockQuestion = Question & {
	answered: boolean;
	userAnswer: AnswerOption | null;
	isFlagged: boolean;
};

export default function TestDetail({
	mockQuestions,
}: {
	mockQuestions: MockQuestion[];
}) {
	const params = useParams();
	const router = useRouter();
	const level = params.level as string;

	const [questions, setQuestions] = useState(mockQuestions);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [timeLeft, setTimeLeft] = useState(60 * 60);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [testStarted, setTestStarted] = useState(false);

	const currentQuestion = questions[currentQuestionIndex];
	const totalQuestions = questions.length;
	const answeredQuestions = questions.filter((q) => q.answered).length;
	const flaggedQuestions = questions.filter((q) => q.isFlagged).length;

	const handleStartTest = () => {
		setTestStarted(true);
		toast.success('Bài test đã bắt đầu! Chúc bạn làm bài tốt.');
	};

	const handleAnswerSelect = (option: AnswerOption) => {
		const updatedQuestions = [...questions];
		updatedQuestions[currentQuestionIndex] = {
			...updatedQuestions[currentQuestionIndex],
			answered: true,
			userAnswer: option,
		};
		setQuestions(updatedQuestions);
	};

	const handleFlagQuestion = () => {
		const updatedQuestions = [...questions];
		updatedQuestions[currentQuestionIndex] = {
			...updatedQuestions[currentQuestionIndex],
			isFlagged: !updatedQuestions[currentQuestionIndex].isFlagged,
		};
		setQuestions(updatedQuestions);
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < totalQuestions - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1);
		}
	};

	const handleNavigateQuestion = (index: number) => {
		setCurrentQuestionIndex(index);
	};

	const handleSubmitTest = useCallback(async () => {
		setIsSubmitting(true);
		const correctAnswers = questions.filter(
			(q) => q.userAnswer === q.correctAnswer,
		).length;
		const score = Math.round((correctAnswers / totalQuestions) * 100);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		toast.success('Nộp bài thành công!', {
			description: `Bạn đã trả lời đúng ${correctAnswers}/${totalQuestions} câu hỏi.`,
		});
		router.push(`/quick-test/${level}/result?score=${score}`);
	}, [questions, totalQuestions, router, level]);

	useEffect(() => {
		if (!testStarted || timeLeft <= 0) return;
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					handleSubmitTest();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, [testStarted, timeLeft, handleSubmitTest]);

	return (
		<TestDetailLayout
			testStarted={testStarted}
			onStartTest={handleStartTest}
			totalQuestions={totalQuestions}
			sidebar={
				<SidebarTracking
					questions={questions}
					currentQuestionIndex={currentQuestionIndex}
					onNavigate={handleNavigateQuestion}
					flaggedQuestions={flaggedQuestions}
					answeredQuestions={answeredQuestions}
					totalQuestions={totalQuestions} 
				/>
			}
			mainContent={
				<>
					{/* Top Bar */}
					<TestHeader
						currentQuestionIndex={currentQuestionIndex}
						totalQuestions={totalQuestions}
						timeLeft={timeLeft}
						onEndTest={handleSubmitTest}
					/>

					{/* Question Content */}
					<div className='flex-1 overflow-auto p-6'>
						<div className='container mx-auto max-w-4xl space-y-6'>
							{/* Group Header */}
							<div className='p-6 rounded-xl border shadow-sm space-y-3'>
								<div className='flex items-center gap-3'>
									<Badge className='bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'>
										{currentQuestion.section}
									</Badge>
									<span className='text-sm font-medium'>{currentQuestion.level}</span>
								</div>
								<h2 className='text-xl font-bold'>{currentQuestion.description}</h2>
							</div>

							{/* Question Metadata */}
							<TestQuestionMeta
								currentQuestionIndex={currentQuestionIndex}
								totalQuestions={totalQuestions}
								type={currentQuestion.questionType}
								difficulty={currentQuestion.difficulty}
								answered={currentQuestion.answered}
							/>

							{/* Question Card */}
							<QuestionCard
								question={currentQuestion}
								currentAnswer={currentQuestion.userAnswer}
								onAnswerSelect={handleAnswerSelect}
								currentQuestionIndex={currentQuestionIndex}
								answered={currentQuestion.answered}
								onFlagged={handleFlagQuestion}
							/>

							{/* Navigation Buttons */}
							<TestFooterNavigation
								currentQuestionIndex={currentQuestionIndex}
								totalQuestions={totalQuestions}
								isSubmitting={isSubmitting}
								onPrevious={handlePreviousQuestion}
								onNext={handleNextQuestion}
								onSubmit={handleSubmitTest}
							/>
						</div>
					</div>
				</>
			}
		/>
	);
}
