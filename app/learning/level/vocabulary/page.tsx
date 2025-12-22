import { vocabularies } from "@/lib/mockData";
import Link from "next/link";

import LearningHeader from "../../_components/learning-header";

import { Bookmark, ChevronRight, AudioLines } from "lucide-react";
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
import { Vocabulary } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

function VocabularyItem({
  vocabulary,
  index,
}: {
  vocabulary: Vocabulary;
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
          {vocabulary.word}
          <Button variant="ghost" size="sm">
            <AudioLines />
          </Button>
        </ItemTitle>

        <ItemDescription>
          {/* Nên thêm cách đọc bằng hiragana katakana */}
          {vocabulary.romaji}
        </ItemDescription>

        <div>{vocabulary.meaning}</div>
      </ItemContent>
      <ItemFooter>
        <Link
          className="text-slate-400 hover:text-blue-500 hover:translate-x-1 transition-all block flex items-center"
          href={`vocabulary/${vocabulary.id}`}
        >
          Xem chi tiết <ChevronRight />
        </Link>
      </ItemFooter>
    </Item>
  );
}

export default function LearningVocabularyPage() {
  return (
    <>
      {/* Header */}
      <LearningHeader title="Từ vựng" description="Từ vựng các cấp độ" />

      <ItemGroup className="grid grid-cols-4 gap-2">
        {vocabularies.map((vocabulary, index) => (
          <VocabularyItem key={index} index={index} vocabulary={vocabulary} />
        ))}
      </ItemGroup>
    </>
  );
}
