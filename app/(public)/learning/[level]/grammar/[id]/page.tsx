import { cn } from '@/lib/utils';
import { lessons, examples, grammars } from '@/lib/mock-data';
import { getGrammarById } from '@/lib/data';
import DetailsNotFound from '../../../_components/details-not-found';

import {
	ArrowLeft,
	BookOpen,
	Lightbulb,
	MessageSquare,
	CheckCircle2,
	AlertCircle,
	Copy,
	Volume2,
} from 'lucide-react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Item,
	ItemHeader,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { Level, Grammar, Example } from '@/lib/types';
import { Button } from '@/components/ui/button';
import DetailsHeader from '../../../_components/details-header';

const getLevelColor = (level: Level) => {
	switch (level) {
		case Level.N5:
			return 'bg-emerald-500 text-white';
		case Level.N4:
			return 'bg-blue-500 text-white';
		case Level.N3:
			return 'bg-purple-500 text-white';
		case Level.N2:
			return 'bg-orange-500 text-white';
		case Level.N1:
			return 'bg-red-500 text-white';
		default:
			return 'bg-gray-500 text-white';
	}
};

function getExampleById(id: string) {
	return examples.filter((ex) => ex.id === id);
}

function GrammarPatternCard({ grammar }: { grammar: Grammar }) {
	return (
		<Card>
			<CardHeader className='border-b-2 pb-6'>
				<CardTitle className='text-2xl font-bold text-slate-900 mb-1'>
					{grammar.pattern}
				</CardTitle>
				<CardDescription>
					<p className='text-blue-600 font-medium'>{grammar.meaning}</p>
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-6'>
				{/* Cấu trúc */}
				<div>
					<div className='flex items-center gap-2 mb-3'>
						<BookOpen className='w-5 h-5 text-blue-500' />
						<h3 className='font-bold text-lg text-slate-900'>Cấu trúc</h3>
					</div>
					<div className='bg-slate-900 text-white p-4 rounded-md font-mono text-lg'>
						{grammar.structure}
					</div>
				</div>

				{/* Giải thích */}
				<div>
					<div className='flex items-center gap-2 mb-3'>
						<Lightbulb className='w-5 h-5 text-amber-500' />
						<h3 className='font-bold text-lg text-slate-900'>Giải thích</h3>
					</div>
					<p className='text-slate-700 leading-relaxed bg-amber-50 p-4 rounded-md border-l-2 border-amber-400'>
						{grammar.explaination}
					</p>
				</div>

				{/* Tabs cho Examples và Notes */}
				<Tabs defaultValue='examples' className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='examples'>
							{/* Ví dụ ({grammar.exampleId.length || 0}) */}
						</TabsTrigger>
						<TabsTrigger value='notes'>Ghi chú</TabsTrigger>
					</TabsList>

					{/* Ví dụ */}
					<TabsContent value='examples' className='space-y-4 mt-4'>
						<ItemGroup className='gap-4'>
							{grammar.exampleId && grammar.exampleId.length > 0 ? (
								grammar.exampleId.map(
									(exId, idx) =>
										getExampleById(exId).length > 0 &&
										getExampleById(exId).map((example, index) => (
											<Item key={index} variant={'outline'}>
												<ItemHeader className='items-start'></ItemHeader>
												<ItemContent>
													<ItemTitle className='flex-col items-start justify-start'>
														<p className='text-slate-600 italic'>{example.romaji}</p>
														<p className='text-2xl font-bold text-slate-900'>
															{example.japanese}
														</p>
														<p className='text-lg text-blue-600 font-medium'>
															→ {example.vietnamese}
														</p>
													</ItemTitle>
													<ItemDescription>
														<Button>
															<Volume2 />
														</Button>
													</ItemDescription>
													<div className='space-y-3'>
														{example.explanation && (
															<Alert className='bg-blue-50 border-blue-200'>
																<AlertCircle className='h-4 w-4 text-blue-600' />
																<AlertDescription className='text-sm text-slate-700'>
																	{example.explanation}
																</AlertDescription>
															</Alert>
														)}
													</div>
												</ItemContent>
											</Item>
										))
								)
							) : (
								<p className='text-slate-500 text-center py-8'>Chưa có ví dụ</p>
							)}
						</ItemGroup>
					</TabsContent>

					{/* Ghi chú */}
					<TabsContent value='notes' className='space-y-4 mt-4'>
						{/* Usage Notes */}
						{grammar.notes && grammar.notes.length > 0 && (
							<div>
								<h4 className='font-bold text-slate-900 mb-3 flex items-center gap-2'>
									<CheckCircle2 className='w-5 h-5 text-green-500' />
									Lưu ý khi sử dụng
								</h4>
								{/* <ul className="space-y-2">
                  {grammar.notes.map((note, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-200"
                    >
                      <span className="text-green-600 font-bold">•</span>
                      <span className="text-slate-700">{note}</span>
                    </li>
                  ))}
                </ul> */}
							</div>
						)}

						{/* Common Mistakes */}
						{/* {grammar.commonMistakes && grammar.commonMistakes.length > 0 && (
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Lỗi thường gặp
                </h4>
                <ul className="space-y-2">
                  {grammar.commonMistakes.map((mistake, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-200"
                    >
                      <span className="text-red-600 font-bold">✕</span>
                      <span className="text-slate-700">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

						{/* General Notes */}
						{grammar.notes && (
							<Alert className='bg-slate-50'>
								<MessageSquare className='h-4 w-4' />
								<AlertDescription className='text-slate-700'>
									{grammar.notes}
								</AlertDescription>
							</Alert>
						)}
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}

export default async function GrammarDetails({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ isLesson: string }>;
}) {
	const { id } = await params;
	const { isLesson } = await searchParams;

	const grammar = await getGrammarById(id);

	if (!grammar) {
		return (
			<DetailsNotFound
				title='Không tìm thấy từ vựng'
				description='Từ vựng bạn đang tìm kiếm không tồn tại.'
			/>
		);
	}

	return (
		<div className='space-y-4'>
			{/* Header */}
			<DetailsHeader title='Chi tiết ngữ pháp' />

			{/* Content */}
			<div className='space-y-8'>
				<GrammarPatternCard grammar={grammar} />
			</div>
		</div>
	);
}
