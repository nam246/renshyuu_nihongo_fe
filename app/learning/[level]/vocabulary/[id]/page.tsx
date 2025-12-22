import { vocabularies } from "@/lib/mockData";
import { Vocabulary } from "@/lib/types";

import { ArrowLeft } from "lucide-react";

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

  const vocabulary = vocabularies.filter((v) => v.id === id);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-md">
        <div className="flex items-center gap-4">
          <Button className="p-2 bg-transparent hover:bg-slate-100 rounded-md transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </Button>
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{vocabulary[0].word}</CardTitle>
            <CardDescription>
              <div>{vocabulary[0].romaji}</div>
              <Badge>{vocabulary[0].wordType}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {vocabulary[0].examples.map((example, index) => (
              <Item key={index} variant='outline'>
                <ItemContent>
                  <ItemTitle>{example.japanese}</ItemTitle>
                  <ItemDescription>{example.vietnamese}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
