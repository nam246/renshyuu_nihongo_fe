'use client';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	CheckCircle2,
	Flag,
	Send,
	SkipForward,
	XCircle,
} from 'lucide-react';
import { toast } from 'sonner';

import SidebarTracking from './sidebar-tracking';
import QuestionCard from './question-card';
import TestTimer from './test-timer';
import TestProgress from './test-progress';
import { TestInfomation } from './test-infomation';

type MockQuestion = {
	id: string;
	question: string;
	options: string[];
	correctAnswer: number;
	explanation: string;
	difficulty: string;
	type: string;
	answered: boolean;
	userAnswer: number | null;
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
	const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 phút
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [testStarted, setTestStarted] = useState(false);

	const currentQuestion = questions[currentQuestionIndex];
	const totalQuestions = questions.length;
	const answeredQuestions = questions.filter((q) => q.answered).length;
	const flaggedQuestions = questions.filter((q) => q.isFlagged).length;

	const handleStartTest = () => {
		setTestStarted(true);
		toast.success('Bài test đã bắt đầu!');
	};

	const handleAnswerSelect = (optionIndex: number) => {
		const updatedQuestions = [...questions];
		updatedQuestions[currentQuestionIndex] = {
			...updatedQuestions[currentQuestionIndex],
			answered: true,
			userAnswer: optionIndex,
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

	const handleSubmitTest = async () => {
		setIsSubmitting(true);

		// Tính điểm
		const correctAnswers = questions.filter(
			(q) => q.userAnswer === q.correctAnswer,
		).length;

		const score = Math.round((correctAnswers / totalQuestions) * 100);

		// Mock submit
		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast.success('Nộp bài thành công!', {
			description: `Điểm của bạn: ${score}/100`,
		});

		router.push(`/quick-test/${level}/result?score=${score}`);
	};

	// Timer effect
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
	}, [testStarted, timeLeft]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Chi tiết</Button>
			</DialogTrigger>
			<DialogContent className='min-w-full min-h-screen'>
				<DialogHeader>
					<DialogTitle>{`Quick Test -`}</DialogTitle>
					<DialogDescription>Luyện tập nhanh với cấp độ.</DialogDescription>
				</DialogHeader>
				{!testStarted ? (
					<TestInfomation
						totalQuestions={totalQuestions}
						handleStartTest={handleStartTest}
					/>
				) : (
					<div className='flex h-screen bg-background'>
						{/* Sidebar Tracking */}
						<SidebarTracking
							questions={questions}
							currentQuestionIndex={currentQuestionIndex}
							onNavigate={handleNavigateQuestion}
							flaggedQuestions={flaggedQuestions}
							answeredQuestions={answeredQuestions}
							totalQuestions={totalQuestions}
						/>

						{/* Main Content */}
						<div className='flex-1 flex flex-col'>
							{/* Top Bar */}
							<div className='border-b bg-card'>
								<div className='container mx-auto px-6 py-4'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-4'>
											<Badge variant='secondary' className='text-lg'>
												N5
											</Badge>
											<TestProgress
												current={currentQuestionIndex + 1}
												total={totalQuestions}
											/>
										</div>

										<div className='flex items-center gap-4'>
											<TestTimer timeLeft={timeLeft} />
											<Button
												variant='outline'
												size='sm'
												onClick={handleFlagQuestion}
												className={
													currentQuestion.isFlagged ? 'bg-orange-50 border-orange-200' : ''
												}
											>
												<Flag
													className={`h-4 w-4 mr-2 ${currentQuestion.isFlagged ? 'text-orange-500 fill-orange-500' : ''}`}
												/>
												{currentQuestion.isFlagged ? 'Bỏ đánh dấu' : 'Đánh dấu'}
											</Button>
										</div>
									</div>
								</div>
							</div>

							{/* Question Content */}
							<div className='flex-1 overflow-auto'>
								<div className='container mx-auto px-6 py-8 max-w-4xl'>
									{/* Question Navigation */}
									<div className='flex items-center justify-between mb-6'>
										<div className='flex items-center gap-2'>
											<Badge variant='outline'>
												Câu {currentQuestionIndex + 1}/{totalQuestions}
											</Badge>
											<Badge variant='secondary' className='capitalize'>
												{currentQuestion.type}
											</Badge>
											<Badge
												variant={
													currentQuestion.difficulty === 'easy'
														? 'default'
														: currentQuestion.difficulty === 'medium'
															? 'secondary'
															: 'destructive'
												}
												className='capitalize'
											>
												{currentQuestion.difficulty}
											</Badge>
										</div>

										<div className='text-sm text-muted-foreground'>
											{currentQuestion.answered ? (
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
										</div>
									</div>

									{/* Question Card */}
									<QuestionCard
										question={currentQuestion}
										onAnswerSelect={handleAnswerSelect}
										currentAnswer={currentQuestion.userAnswer}
									/>

									{/* Navigation Buttons */}
									<div className='flex justify-between mt-8 pt-6 border-t'>
										<Button
											variant='outline'
											onClick={handlePreviousQuestion}
											disabled={currentQuestionIndex === 0}
										>
											← Câu trước
										</Button>

										<div className='flex gap-2'>
											{currentQuestionIndex < totalQuestions - 1 ? (
												<Button variant='outline' onClick={handleNextQuestion}>
													Câu tiếp theo →
												</Button>
											) : (
												<Button
													variant='default'
													onClick={handleSubmitTest}
													disabled={isSubmitting}
												>
													{isSubmitting ? (
														<>Đang nộp...</>
													) : (
														<>
															<Send className='h-4 w-4 mr-2' />
															Nộp bài
														</>
													)}
												</Button>
											)}

											{currentQuestionIndex < totalQuestions - 1 && (
												<Button
													variant='ghost'
													onClick={() => handleNavigateQuestion(currentQuestionIndex + 1)}
												>
													<SkipForward className='h-4 w-4 mr-1' />
													Bỏ qua
												</Button>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					{/* <Button type='submit'>Save changes</Button> */}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
