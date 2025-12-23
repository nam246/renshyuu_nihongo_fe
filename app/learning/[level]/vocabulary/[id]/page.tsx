import { examples, vocabularies } from "@/lib/mock-data";
import { ArrowLeft, BookOpen, Volume2 } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export default async function VocabularyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Tối ưu: Sử dụng find thay vì filter
  const vocabulary = vocabularies.find((v) => v.id === id);

  // Handle không tìm thấy từ vựng
  if (!vocabulary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Không tìm thấy từ vựng</CardTitle>
            <CardDescription>
              Từ vựng bạn đang tìm kiếm không tồn tại.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/vocabularies">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tối ưu: Sử dụng find thay vì filter và loại bỏ undefined
  const getExampleById = (exId: string) => {
    return examples.find((ex) => ex.id === exId);
  };

  return (
    <>
      {/* Header với gradient và shadow */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-4">
          <Link href="/vocabularies">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-slate-600">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Chi tiết từ vựng</span>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="shadow-lg border-0 overflow-hidden">
        {/* Header với gradient background */}
        <div className="bg-primary p-6 text-white">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <h1 className="text-4xl font-bold tracking-tight">
                  {vocabulary.word}
                </h1>
                <p className="text-xl text-blue-50 font-light">
                  {vocabulary.romaji}
                </p>
              </div>
              <Button variant="secondary" size="icon">
                <Volume2 className="w-5 h-5" />
              </Button>
            </div>
            <Badge variant="secondary">{vocabulary.wordType}</Badge>
          </div>
        </div>

        <CardHeader className="border-b bg-slate-50">
          <CardTitle className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Ví dụ câu ({vocabulary.exampleId.length})
          </CardTitle>
          <CardDescription>
            Các ví dụ sử dụng từ vựng trong ngữ cảnh thực tế
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {vocabulary.exampleId.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Chưa có ví dụ nào cho từ vựng này</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vocabulary.exampleId.map((exId, index) => {
                const example = getExampleById(exId);

                if (!example) return null;

                return (
                  <Item
                    key={exId}
                    variant="outline"
                    className="hover:shadow-md transition-all duration-200 hover:border-blue-300 bg-white"
                  >
                    <ItemContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 space-y-2">
                          <ItemTitle className="text-lg font-medium text-slate-800 leading-relaxed">
                            {example.japanese}
                          </ItemTitle>
                          <ItemDescription className="text-base text-slate-600 leading-relaxed">
                            {example.vietnamese}
                          </ItemDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0 hover:bg-blue-50"
                        >
                          <Volume2 className="w-4 h-4 text-slate-500" />
                        </Button>
                      </div>
                    </ItemContent>
                  </Item>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <CardFooter className="gap-3 justify-end">
        <Link href="/vocabularies">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
        </Link>
        <Button>
          <BookOpen className="w-4 h-4" />
          Thêm vào bộ học
        </Button>
      </CardFooter>
    </>
  );
}
