import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  BookMarked,
  Bookmark,
} from "lucide-react";

export default function LearningHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
