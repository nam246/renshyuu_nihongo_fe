import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Copy,
  Volume2,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemHeader,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { lessons } from "@/lib/mockData";
import { Level, Grammar } from "@/lib/types";
import { Button } from "@/components/ui/button";

// Mock data - thay bằng data thật từ API/database
const lessonData = {
  id: "1a2f4d91-7e3a-4d65-9f8e-1a8a8f9b0001",
  lessonNumber: 1,
  level: "N5",
  source: "Minna no Nihongo",
  grammar: [
    {
      id: "g-0001",
      pattern: "～です",
      structure: "N は N です",
      meaning: "là",
      explaination:
        "Dùng để khẳng định rằng chủ ngữ là gì hoặc thuộc về nhóm nào đó. Đây là cấu trúc cơ bản nhất trong tiếng Nhật để giới thiệu hoặc xác định danh từ.",
      notes: "Cấu trúc cơ bản nhất, lịch sự và trang trọng",
      examples: [
        {
          japanese: "わたしは学生です。",
          romaji: "Watashi wa gakusei desu.",
          vietnamese: "Tôi là sinh viên.",
          explanation: "Sử dụng です để khẳng định nghề nghiệp",
        },
        {
          japanese: "これは本です。",
          romaji: "Kore wa hon desu.",
          vietnamese: "Đây là quyển sách.",
          explanation: "Sử dụng です để xác định đồ vật",
        },
        {
          japanese: "田中さんは先生です。",
          romaji: "Tanaka-san wa sensei desu.",
          vietnamese: "Anh/Chị Tanaka là giáo viên.",
          explanation: "Giới thiệu nghề nghiệp của người khác",
        },
      ],
      level: "N5",
      usageNotes: [
        "です là thể lịch sự, dùng trong giao tiếp chính thức",
        "だ là thể thông thường, dùng trong văn viết hoặc nói chuyện thân mật",
        "Luôn đặt ở cuối câu",
      ],
      commonMistakes: [
        "Không dùng です sau い-adjective (sai: おおきいです, đúng: おおきいです nhưng nên dùng おおきい)",
        "Quên thêm です khi nói lịch sự với danh từ",
      ],
    },
    {
      id: "g-0002",
      pattern: "～ではありません",
      structure: "N は N ではありません",
      meaning: "không phải là",
      explaination:
        "Dạng phủ định lịch sự của です. Dùng để phủ nhận một điều gì đó.",
      notes: "Dạng phủ định của です, cũng rất lịch sự",
      examples: [
        {
          japanese: "わたしは学生ではありません。",
          romaji: "Watashi wa gakusei dewa arimasen.",
          vietnamese: "Tôi không phải là sinh viên.",
          explanation: "Phủ định nghề nghiệp",
        },
        {
          japanese: "これは本ではありません。",
          romaji: "Kore wa hon dewa arimasen.",
          vietnamese: "Đây không phải là sách.",
          explanation: "Phủ định đồ vật",
        },
      ],
      level: "N5",
      usageNotes: [
        "じゃありません là dạng rút gọn của ではありません, dùng trong hội thoại",
        "じゃない là dạng thông thường",
        "Cách phát âm: dewa → dụa, arimasen → a-ri-ma-sen",
      ],
      commonMistakes: [
        "Nhầm lẫn giữa ではありません và じゃありません",
        "Quên thêm は trước ではありません",
      ],
    },
  ],
};

const getLevelColor = (level: Level) => {
  switch (level) {
    case Level.N5:
      return "bg-emerald-500 text-white";
    case Level.N4:
      return "bg-blue-500 text-white";
    case Level.N3:
      return "bg-purple-500 text-white";
    case Level.N2:
      return "bg-orange-500 text-white";
    case Level.N1:
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

function GrammarPatternCard({
  grammar,
  index,
}: {
  grammar: Grammar;
  index: number;
}) {
  return (
    <Card>
      <CardHeader className="border-b-2 pb-6">
        <CardTitle className="text-2xl font-bold text-slate-900 mb-1">
          {grammar.pattern}
        </CardTitle>
        <CardDescription>
          <p className="text-blue-600 font-medium">{grammar.meaning}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Cấu trúc */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-lg text-slate-900">Cấu trúc</h3>
          </div>
          <div className="bg-slate-900 text-white p-4 rounded-md font-mono text-lg">
            {grammar.structure}
          </div>
        </div>

        {/* Giải thích */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-lg text-slate-900">Giải thích</h3>
          </div>
          <p className="text-slate-700 leading-relaxed bg-amber-50 p-4 rounded-md border-l-2 border-amber-400">
            {grammar.explaination}
          </p>
        </div>

        {/* Tabs cho Examples và Notes */}
        <Tabs defaultValue="examples" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="examples">
              Ví dụ ({grammar.examples?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="notes">Ghi chú</TabsTrigger>
          </TabsList>

          {/* Ví dụ */}
          <TabsContent value="examples" className="space-y-4 mt-4">
            <ItemGroup className="gap-4">
              {grammar.examples && grammar.examples.length > 0 ? (
                grammar.examples.map((example, idx) => (
                  <Item key={idx} variant={"outline"}>
                    <ItemHeader className="items-start">
                      <ItemTitle className="flex-col items-start justify-start">
                        <p className="text-slate-600 italic">
                          {example.romaji}
                        </p>
                        <p className="text-2xl font-bold text-slate-900">
                          {example.japanese}
                        </p>
                        <p className="text-lg text-blue-600 font-medium">
                          → {example.vietnamese}
                        </p>
                      </ItemTitle>
                      <ItemDescription>
                        <Button>
                          <Volume2 />
                        </Button>
                      </ItemDescription>
                    </ItemHeader>
                    <ItemContent>
                      <div className="space-y-3">
                        {example.explanation && (
                          <Alert className="bg-blue-50 border-blue-200">
                            <AlertCircle className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-sm text-slate-700">
                              {example.explanation}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </ItemContent>
                  </Item>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">Chưa có ví dụ</p>
              )}
            </ItemGroup>
          </TabsContent>

          {/* Ghi chú */}
          <TabsContent value="notes" className="space-y-4 mt-4">
            {/* Usage Notes */}
            {/* {grammar.usageNotes && grammar.usageNotes.length > 0 && (
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Lưu ý khi sử dụng
                </h4>
                <ul className="space-y-2">
                  {grammar.usageNotes.map((note, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-200"
                    >
                      <span className="text-green-600 font-bold">•</span>
                      <span className="text-slate-700">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

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
              <Alert className="bg-slate-50">
                <MessageSquare className="h-4 w-4" />
                <AlertDescription className="text-slate-700">
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
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lessonById = lessons.filter((lesson) => lesson.id === id);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-md">
        <div className="flex items-center gap-4">
          <Button className="p-2 bg-transparent hover:bg-slate-100 rounded-md transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                Bài {lessonById[0].lessonNumber} - {lessonById[0].source}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge className={getLevelColor(lessonById[0].level)}>
                  {lessonById[0].level}
                </Badge>
                <span className="text-sm text-slate-600">
                  {lessonById[0].grammar.length} mẫu ngữ pháp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {lessonById[0].grammar.map((grammar, index) => (
          <GrammarPatternCard
            key={grammar.id}
            grammar={grammar}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
