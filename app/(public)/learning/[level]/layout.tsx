import { Level } from "@/lib/types";
import NavMenu from "../_components/nav-menu";

export default async function LearningLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ level: Level }>;
}) {
  const { level } = await params;

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <NavMenu />
      <div className="space-y-6">{children}</div>
    </div>
  );
}
