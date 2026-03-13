'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Question, AnswerOption } from '@/types/types';

import SidebarTracking from './mock-sidebar-tracking';
import TestHeader from '../test-header';
import TestFooterNavigation from '../test-footer-navigation';
import QuestionCard from '../question-card';
import TestDetailLayout from '../test-detail-layout';

interface Section {
	id: string;
	title: string;
	description: string;
	questions: MockQuestion[];
	timeLimit?: number;
}

type MockQuestion = Question & {
	answered: boolean;
	userAnswer: AnswerOption | null;
	isFlagged: boolean;
};

export default function MockTestDetail({
	mockQuestions,
}: {
	mockQuestions: Question[];
}) {
	const params = useParams();
	const router = useRouter();
	const level = (params?.level as string) || '';

	// Khởi tạo questions với đủ các trường cho UI state
	const [questions, setQuestions] = useState<MockQuestion[]>(
		mockQuestions.map((q) => ({
			...q,
			answered: false,
			userAnswer: null,
			isFlagged: false,
		})),
	);

	// Nhóm câu hỏi theo section
	const sections: Section[] = useMemo(() => {
		const sectionMap = new Map<string, MockQuestion[]>();

		questions.forEach((question) => {
			if (!sectionMap.has(question.section)) {
				sectionMap.set(question.section, []);
			}
			sectionMap.get(question.section)!.push(question);
		});

		return Array.from(sectionMap.entries()).map(
			([title, sectionQuestions], index) => ({
				id: `section-${index + 1}`,
				title,
				description: sectionQuestions[0]?.description || '',
				questions: sectionQuestions,
				timeLimit: 30, // Mỗi section 30 phút
			}),
		);
	}, [questions]);

	const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 phút tổng
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [testStarted, setTestStarted] = useState(false);
	const [userAnswers, setUserAnswers] = useState<Record<string, AnswerOption>>(
		{},
	);
	const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(
		new Set(),
	);

	const currentSection = sections[currentSectionIndex];
	const currentQuestion = currentSection?.questions[currentQuestionIndex];
	const totalQuestions = questions.length;

	// Tính toán tiến độ cho từng section
	const answeredQuestions = questions.filter((q) => q.answered).length;

	const handleStartTest = () => {
		setTestStarted(true);
		toast.success('Bài test đã bắt đầu! Chúc bạn làm bài tốt.');
	};

	const handleAnswerSelect = (questionId: string, option: AnswerOption) => {
		setUserAnswers((prev) => ({
			...prev,
			[questionId]: option,
		}));

		// Cập nhật trạng thái answered trong questions
		const updatedQuestions = [...questions];
		const qIndex = updatedQuestions.findIndex((q) => q.id === questionId);
		if (qIndex !== -1) {
			updatedQuestions[qIndex] = {
				...updatedQuestions[qIndex],
				answered: true,
				userAnswer: option,
			};
			setQuestions(updatedQuestions);
		}
	};

	const handleFlagQuestion = (questionId: string) => {
		setFlaggedQuestions((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(questionId)) {
				newSet.delete(questionId);
			} else {
				newSet.add(questionId);
			}
			return newSet;
		});

		// Cập nhật trạng thái flagged trong questions
		const updatedQuestions = [...questions];
		const qIndex = updatedQuestions.findIndex((q) => q.id === questionId);
		if (qIndex !== -1) {
			updatedQuestions[qIndex] = {
				...updatedQuestions[qIndex],
				isFlagged: !updatedQuestions[qIndex].isFlagged,
			};
			setQuestions(updatedQuestions);
		}
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < currentSection.questions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		} else if (currentSectionIndex < sections.length - 1) {
			// Chuyển sang section tiếp theo
			setCurrentSectionIndex((prev) => prev + 1);
			setCurrentQuestionIndex(0);
			toast.info(`Đã chuyển sang ${sections[currentSectionIndex + 1].title}`);
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1);
		} else if (currentSectionIndex > 0) {
			// Chuyển về section trước
			setCurrentSectionIndex((prev) => prev - 1);
			const prevSection = sections[currentSectionIndex - 1];
			setCurrentQuestionIndex(prevSection.questions.length - 1);
		}
	};

	const handleNavigateQuestion = (globalIndex: number) => {
		// Tìm section và index tương ứng với globalIndex
		let accumulated = 0;
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			if (globalIndex < accumulated + section.questions.length) {
				setCurrentSectionIndex(i);
				setCurrentQuestionIndex(globalIndex - accumulated);
				break;
			}
			accumulated += section.questions.length;
		}
	};

	const handleSubmitTest = useCallback(async () => {
		setIsSubmitting(true);

		try {
			// Gửi bài làm lên API
			const response = await fetch('/api/mock-test/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					level: level || currentQuestion?.level,
					userAnswers,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to submit test');
			}

			const resultJSON = await response.json();

			if (resultJSON.success) {
				const { score, correctCount, totalQuestions: totalResponse } = resultJSON.data;
				
				toast.success('Nộp bài thành công!', {
					description: `Bạn đã trả lời đúng ${correctCount}/${totalResponse} câu hỏi.`,
				});

				router.push(`/mock-test/${(level || currentQuestion?.level || '').toLowerCase()}/result?score=${score}`);
			} else {
				throw new Error(resultJSON.message);
			}
		} catch (error) {
			console.error('Error submitting test', error);
			toast.error('Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!');
			setIsSubmitting(false);
		}
	}, [userAnswers, router, level, currentQuestion?.level]);

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
					questions={questions.map((q) => ({
						id: q.id,
						answered: q.answered,
						userAnswer: q.userAnswer,
						isFlagged: q.isFlagged,
						section: q.section as string,
					}))}
					currentQuestionIndex={currentQuestionIndex}
					onNavigate={handleNavigateQuestion}
					flaggedQuestions={flaggedQuestions.size}
					answeredQuestions={answeredQuestions}
					totalQuestions={totalQuestions}
				/>
			}
			mainContent={
				<>
					{/* Top Bar */}
					<TestHeader
						currentQuestionIndex={questions.findIndex(
							(q) => q.id === currentQuestion?.id,
						)}
						totalQuestions={totalQuestions}
						timeLeft={timeLeft}
						onEndTest={handleSubmitTest}
					/>

					{/* Question Content */}
					<div className='flex-1 overflow-auto p-6'>
						<div className='mx-auto max-w-4xl space-y-6'>
							{currentQuestion ? (
								<QuestionCard
									question={currentQuestion}
									currentAnswer={userAnswers[currentQuestion.id] ?? null}
									onAnswerSelect={(option) =>
										handleAnswerSelect(currentQuestion.id, option)
									}
									currentQuestionIndex={currentQuestionIndex}
									answered={currentQuestion.answered}
									onFlagged={handleFlagQuestion}
								/>
							) : (
								<div className="flex justify-center items-center h-40">
									<p className="text-gray-500">Đang tải...</p>
								</div>
							)}

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
