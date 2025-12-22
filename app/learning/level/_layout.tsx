import NavMenu from "../_components/nav-menu";
import Sidebar from '../_components/sidebar';

export default async function LearningLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;

  console.log(level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <NavMenu />
            <div className="min-h-screen">
              <div className="max-w-5xl mx-auto space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
