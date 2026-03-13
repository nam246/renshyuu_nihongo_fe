import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { Question, AnswerOption } from '@/types/types';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { userAnswers, level } = body;

		if (!userAnswers || !level) {
			return NextResponse.json(
				{ success: false, message: 'Missing userAnswers or level' },
				{ status: 400 }
			);
		}

		// Đọc dữ liệu câu hỏi từ file mock-tests.json
		const jsonDirectory = path.join(process.cwd(), 'public', 'data');
		const fileContents = fs.readFileSync(
			path.join(jsonDirectory, 'mock-tests.json'),
			'utf8'
		);

		const allQuestions: Question[] = JSON.parse(fileContents);
		const requestedLevel = level.toUpperCase();

		// Lọc các câu hỏi thuộc bài test hiện tại
		const testQuestions = allQuestions.filter((q) => q.level === requestedLevel);

		if (testQuestions.length === 0) {
			return NextResponse.json(
				{ success: false, message: 'Test not found for this level' },
				{ status: 404 }
			);
		}

		let correctCount = 0;
		const totalQuestions = testQuestions.length;
		const results: Record<string, { isCorrect: boolean; correctAnswer: AnswerOption }> = {};

		// Tính điểm
		for (const question of testQuestions) {
			const userAnswer = userAnswers[question.id];
			const isCorrect = userAnswer === question.correctAnswer;
			
			if (isCorrect) {
				correctCount++;
			}

			results[question.id] = {
				isCorrect,
				correctAnswer: question.correctAnswer,
			};
		}

		const score = Math.round((correctCount / totalQuestions) * 100);

		return NextResponse.json({
			success: true,
			data: {
				score,
				correctCount,
				totalQuestions,
				results,
			},
		});
	} catch (error) {
		console.error('Error submitting mock test:', error);
		return NextResponse.json(
			{ success: false, message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
