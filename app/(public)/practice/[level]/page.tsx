import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Level } from "@/lib/types";
import Link from "next/link";
import {
  VocabularyPracticeContent,
  GrammarPracticeContent,
  ReadingPracticeContent,
  ListeningContentType,
} from "@/lib/types";

const vocabularyContent = [
  {
    title: "Cách đọc Kanji",
    type: VocabularyPracticeContent.KANJI_READING,
  },
  {
    title: "Cách đọc Hiragana",
    type: VocabularyPracticeContent.HIRAGANA_READING,
  },
  {
    title: "biểu hiện từ",
    type: VocabularyPracticeContent.WORD_EXPRESSIONS,
  },
  {
    title: "Từ đồng nghĩa",
    type: VocabularyPracticeContent.SYNONYMS,
  },
];

const grammarContent = [
  { title: "Dạng ngữ pháp" },
  { title: "Thành lập câu" },
  { title: "Ngữ pháp theo đoạn văn" },
];

const readingContent = [
  { title: "Đoạn văn ngắn" },
  { title: "Đoạn văn trung bình" },
  { title: "Tìm thông tin" },
];

const listeningContent = [
  { title: "Nghe hiểu chủ đề" },
  { title: "Nghe hiểu điểm chính" },
  { title: "Nghe hiểu diễn đạt" },
  { title: "Trả lời nhanh" },
];

const Content = ({ content }: { content: any }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {content.map((c: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{c.title}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Progress />
          </CardContent>
          <CardFooter>
            <Link href={`/practice/${c.level}/vocabulary?type=${c?.type}`}>
              Luyện tập ngay
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default async function PracticeListPage({
  params,
}: {
  params: Promise<{ level: Level }>;
}) {
  const { level } = await params;
  return (
    <div className="container mx-auto">
      <Tabs defaultValue="vocabulary">
        <TabsList>
          <TabsTrigger value="vocabulary">Từ vựng</TabsTrigger>
          <TabsTrigger value="grammar">Ngữ pháp</TabsTrigger>
          <TabsTrigger value="reading">Đọc</TabsTrigger>
          <TabsTrigger value="listening">Nghe</TabsTrigger>
        </TabsList>
        <TabsContent value="vocabulary">
          <div className="grid grid-cols-3 gap-3">
            {vocabularyContent.map((content, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{content.title}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress />
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/practice/${level}/vocabulary?type=${content?.type}`}
                  >
                    Luyện tập ngay
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="grammar">
          <Content content={grammarContent} />
          {/* <div className="grid grid-cols-3 gap-3">
            {grammarContent.map((content, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{content.title}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            ))}
          </div> */}
        </TabsContent>
        <TabsContent value="reading">
          <Content content={readingContent} />
          {/* <div className="grid grid-cols-3 gap-3">
            {readingContent.map((content, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{content.title}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            ))}
          </div> */}
        </TabsContent>
        <TabsContent value="listening">
          <Content content={listeningContent} />
          {/* <div className="grid grid-cols-3 gap-3">
            {listeningContent.map((content, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{content.title}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            ))}
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
