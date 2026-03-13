import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { Question } from '@/types/types';

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ level: string }> }
) {
	try {
		const { level } = await params;
		
		// Đường dẫn tệp mock-tests.json
		const jsonDirectory = path.join(process.cwd(), 'public', 'data');
		const fileContents = fs.readFileSync(path.join(jsonDirectory, 'mock-tests.json'), 'utf8');
		
		// Phân tích dữ liệu JSON
		const allQuestions: Question[] = JSON.parse(fileContents);

		// Kiểm tra mức độ được yêu cầu
		const requestedLevel = level.toUpperCase();
		
		// Lọc các câu hỏi theo level
		const filteredQuestions = allQuestions.filter(
			(q) => q.level === requestedLevel
		);

		return NextResponse.json({
			success: true,
			data: filteredQuestions,
		});
	} catch (error) {
		console.error('Error reading mock tests data:', error);
		return NextResponse.json(
			{ success: false, message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
