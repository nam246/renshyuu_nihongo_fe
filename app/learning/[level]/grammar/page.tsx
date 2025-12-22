"use client";

import Link from "next/link";
import { Grammar, Lesson, Level } from "@/lib/types";
import { lessons } from "@/lib/mockData";
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  BookMarked,
  Bookmark,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import LearningHeader from "../../_components/learning-header";

const getLevelColor = (level: Level) => {
  switch (level) {
    case Level.N5:
      return "bg-emerald-500/10 text-emerald-700 border-emerald-200 hover:bg-emerald-500/20";
    case Level.N4:
      return "bg-blue-500/10 text-blue-700 border-blue-200 hover:bg-blue-500/20";
    case Level.N3:
      return "bg-purple-500/10 text-purple-700 border-purple-200 hover:bg-purple-500/20";
    case Level.N2:
      return "bg-orange-500/10 text-orange-700 border-orange-200 hover:bg-orange-500/20";
    case Level.N1:
      return "bg-red-500/10 text-red-700 border-red-200 hover:bg-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-700 border-gray-200 hover:bg-gray-500/20";
  }
};

// Component cho từng lesson
function LessonItem({ lesson }: { lesson: Lesson }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-1">
          <BookMarked />
          Bài {lesson.lessonNumber}
        </CardTitle>
        <CardDescription>
          {lesson.source}
          <div className="font-medium flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            {lesson.grammar.length} mẫu ngữ pháp
          </div>
        </CardDescription>
        <CardAction className="flex items-center gap-2">
          <Badge variant="outline" className={`${getLevelColor(lesson.level)}`}>
            {lesson.level}
          </Badge>
          <Button
            variant="outline"
            onClick={() =>
              toast("Item have been Bookmarked", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            }
          >
            <Bookmark className="text-slate-400 hover:text-blue-500 transition-all" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {/* Danh sách các pattern ngữ pháp */}
          <ItemGroup className="grid grid-cols-4 gap-2">
            {lesson.grammar.map((item, index) => (
              <GrammarItem grammar={item} index={index} key={index} />
            ))}
          </ItemGroup>
        </div>
      </CardContent>

      <CardFooter>
        <Link
          className="text-slate-400 hover:text-blue-500 hover:translate-x-1 transition-all"
          href={`grammar/${lesson.id}`}
        >
          Xem toàn bộ bài {lesson.lessonNumber}{" "}
          <ChevronRight className="inline" />
        </Link>
      </CardFooter>
    </Card>
  );
}

function GrammarItem({ grammar, index }: { grammar: Grammar; index: number }) {
  return (
    <Item variant="outline">
      <ItemHeader>
        <Badge variant="outline">{index + 1}</Badge>
        <ItemActions>
          <Button
            variant="outline"
            onClick={() =>
              toast("Item have been Bookmarked", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            }
          >
            <Bookmark className="text-slate-400 hover:text-blue-500 transition-all" />
          </Button>
        </ItemActions>
      </ItemHeader>
      <ItemContent key={grammar.id}>
        <ItemTitle className="font-bold text-lg text-slate-900">
          {grammar.pattern}
        </ItemTitle>
        <ItemDescription>→ {grammar.meaning}</ItemDescription>

        <div className="flex-1 min-w-0">
          {grammar.structure && (
            <div className="mt-1 text-sm text-slate-600 font-mono bg-white px-2 py-1 rounded border border-primary inline-block">
              {grammar.structure}
            </div>
          )}
          {grammar.explaination && (
            <p className="text-sm text-slate-500 mt-1">
              {grammar.explaination}
            </p>
          )}
        </div>
      </ItemContent>
      <ItemFooter>
        <Link
          className="hover:text-blue-500 hover:translate-x-1 transition-all"
          href={`grammar/${grammar.id}`}
        >
          Xem chi tiết <ChevronRight className="inline" />
        </Link>
      </ItemFooter>
    </Item>
  );
}

// Component chính
export default function LearningGrammarPage() {
  return (
    <>
      {/* Header */}
      <LearningHeader
        title="Ngữ pháp tiếng Nhật"
        description="Học các mẫu ngữ pháp từ cơ bản đến nâng cao"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-600">
              {lessons.length}
            </CardTitle>
            <CardDescription>Tổng số bài học</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-emerald-600">
              {lessons.reduce((sum, l) => sum + l.grammar.length, 0)}
            </CardTitle>
            <CardDescription>Mẫu ngữ pháp</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-purple-600">
              N5
            </CardTitle>
            <CardDescription>Trình độ hiện tại</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Danh sách bài học */}
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <LessonItem key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </>
  );
}
