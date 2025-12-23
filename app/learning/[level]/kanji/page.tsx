import { kanjis, lessons } from "@/lib/mock-data";
import Link from "next/link";

import LearningHeader from "../../_components/learning-header";

import {
  Bookmark,
  ChevronRight,
  AudioLines,
  BookMarked,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Kanji } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function KanjiItem({
  kanji,
  index,
}: {
  kanji: Kanji;
  index: number;
}) {
  return (
    <Item variant="outline">
      <ItemHeader>
        <Badge variant="outline">{index + 1}</Badge>
        <ItemActions>
          <Button variant="outline" size="sm">
            <Bookmark />
          </Button>
        </ItemActions>
      </ItemHeader>
      <ItemContent>
        <ItemTitle className="font-bold text-xl">
          {kanji.character}
          <Button variant="ghost" size="sm">
            <AudioLines />
          </Button>
        </ItemTitle>

        <ItemDescription>
          {/* Nên thêm cách đọc bằng hiragana katakana */}
          {kanji.kunyomi}
        </ItemDescription>

        <div>{kanji.meaning}</div>
      </ItemContent>
      <ItemFooter>
        <Link
          className="text-slate-400 hover:text-blue-500 hover:translate-x-1 transition-all block flex items-center"
          href={`kanji/${kanji.id}`}
        >
          Xem chi tiết <ChevronRight />
        </Link>
      </ItemFooter>
    </Item>
  );
}

export default function LearningKanjiPage() {
  const kanjiByLessonId = (lessonId: string) => {
    return kanjis.filter((v) => v.lessonId === lessonId);
  };
  return (
    <>
      {/* Header */}
      <LearningHeader title="Từ vựng" description="Từ vựng các cấp độ" />

      <div className="space-y-4">
        {lessons.length > 0 &&
          lessons.map((lesson, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-1">
                  <BookMarked />
                  Bài {lesson.lessonNumber}
                </CardTitle>
                <CardDescription>
                  {lesson.source}
                  <div className="font-medium flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {kanjiByLessonId(lesson.id).length} từ vựng
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ItemGroup className="grid grid-cols-4 gap-2">
                  {kanjiByLessonId(lesson.id).map((kj, index) => (
                    <KanjiItem
                      key={index}
                      index={index}
                      kanji={kj}
                    />
                  ))}
                </ItemGroup>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
}
