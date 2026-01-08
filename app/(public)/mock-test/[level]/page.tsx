import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

import {
  Hourglass,
  CircleDotDashed,
  BadgeInfo,
  ChevronRight,
} from "lucide-react";

import { Level } from "@/lib/types";
import Link from "next/link";

const testData = [
  {
    id: 1,
    title: "Test 1",
    point: 80,
    time: 90,
    progress: 90,
  },
  {
    id: 2,
    title: "Test 2",
    point: 80,
    time: 90,
    progress: 0,
  },
  {
    id: 3,
    title: "Test 3",
    point: 80,
    time: 90,
    progress: 0,
  },
  {
    id: 4,
    title: "Test 4",
    point: 80,
    time: 90,
    progress: 0,
  },
  {
    id: 5,
    title: "Test 5",
    point: 80,
    time: 90,
    progress: 0,
  },
  {
    id: 6,
    title: "Test 6",
    point: 80,
    time: 90,
    progress: 0,
  },
];

const Title = () => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
    <div className="space-y-2">
      <h1 className="text-3xl md:text-4xl text-primary dark:text-white">
        Thư viện đề thi
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg">
        Luyện tập với kho đề thi phong phú
      </p>
    </div>
  </div>
);

export default async function ListTestPage({
  params,
}: {
  params: Promise<{ level: Level }>;
}) {
  const { level } = await params;
  return (
    <>
      <Title />
      <div className="grid grid-cols-4 gap-3">
        {testData.length > 0 &&
          testData.map((data, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{data.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Hourglass className="inline" /> Thời gian:
                  {data.time}
                </div>
                <div>
                  <BadgeInfo className="inline" /> Điểm:
                  {data.point}
                </div>
                <div>
                  <CircleDotDashed className="inline" /> Tiến độ:
                  {data.progress}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/mock-test/${level}/${data.id}`}>
                  DO it right now <ChevronRight className="inline" />
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
}
