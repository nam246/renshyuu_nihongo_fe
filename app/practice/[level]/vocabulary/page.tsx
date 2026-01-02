import PracticeQuestion from "@/app/practice/_components/PracticeQuestion";
import { Level } from "@/lib/types";

export default async function PracticeVocabularyPage({
  params,
  searchParams,
}: {
  params: Promise<{ level: Level }>;
  searchParams: Promise<{ type: string }>;
}) {
  const { level } = await params;
  const { type } = await searchParams;
  return (
    <div className="container mx-auto">
        <h1 className="">{type}</h1>
      <PracticeQuestion />
    </div>
  );
}
