"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Level } from "@/lib/types";

import type { LucideIcon } from "lucide-react";
import { BookOpen, BookMarked, Languages, GraduationCap } from "lucide-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type navItem = {
  href: string;
  label: string;
  labelEn: string;
  icon: LucideIcon;
  description: string;
};

const getLevelInfo = (level: Level) => {
  const levels = {
    N5: {
      color: "emerald",
      bgClass: "from-emerald-500 to-teal-500",
      description: "Cơ bản - Basic",
      borderClass: "border-emerald-500",
    },
    N4: {
      color: "blue",
      bgClass: "from-blue-500 to-cyan-500",
      description: "Sơ cấp - Elementary",
      borderClass: "border-blue-500",
    },
    N3: {
      color: "purple",
      bgClass: "from-purple-500 to-pink-500",
      description: "Trung cấp - Intermediate",
      borderClass: "border-purple-500",
    },
    N2: {
      color: "orange",
      bgClass: "from-orange-500 to-red-500",
      description: "Trung cao cấp - Upper Intermediate",
      borderClass: "border-orange-500",
    },
    N1: {
      color: "red",
      bgClass: "from-red-500 to-rose-500",
      description: "Cao cấp - Advanced",
      borderClass: "border-red-500",
    },
  };
  return levels[level] || levels.N5;
};

const navItems: navItem[] = [
  {
    href: "grammar",
    label: "Ngữ pháp",
    labelEn: "Grammar",
    icon: BookOpen,
    description: "Học các mẫu câu và cấu trúc",
  },
  {
    href: "kanji",
    label: "Kanji",
    labelEn: "Kanji",
    icon: Languages,
    description: "Học chữ Hán và cách viết",
  },
  {
    href: "vocabulary",
    label: "Từ vựng",
    labelEn: "Vocabulary",
    icon: BookMarked,
    description: "Mở rộng vốn từ vựng",
  },
];

function NavItem({
  item,
  isActive,
  level,
}: {
  item: navItem;
  isActive: boolean;
  level: Level;
}) {
  const Icon = item.icon;
  const levelInfo = getLevelInfo(level);

  return (
    <Link
      href={`/learning/${level}/${item.href}`}
      className={`
        group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300
        ${
          isActive
            ? `bg-gradient-to-r ${levelInfo.bgClass} text-white shadow-lg scale-105`
            : "bg-white hover:bg-slate-50 text-slate-700 hover:shadow-md border-2 border-slate-200 hover:border-slate-300"
        }
      `}
    >
      <div
        className={`
        p-3 rounded-lg transition-all duration-300
        ${
          isActive
            ? "bg-white/20"
            : `bg-${levelInfo.color}-50 group-hover:bg-${levelInfo.color}-100`
        }
      `}
      >
        <Icon
          className={`w-6 h-6 ${
            isActive ? "text-white" : `text-${levelInfo.color}-600`
          }`}
        />
      </div>

      <div className="flex-1">
        <div className="font-bold text-lg">{item.label}</div>
        <div
          className={`text-sm ${isActive ? "text-white/80" : "text-slate-500"}`}
        >
          {item.labelEn}
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-white rounded-l-full" />
      )}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const activeTab = pathname.split("/").pop();

  const params = useParams();
  const level = params.level;
  
  return (
    <aside className="lg:col-span-3">
      <div className="sticky top-32 space-y-3">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
            Nội dung học
          </h2>
        </div>
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isActive={activeTab === item.href}
            level={level}
          />
        ))}

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <span>Tiến độ học tập</span>
            </CardTitle>
          </CardHeader>
          {navItems.map((item) => (
            <CardContent key={item.href}>
              <div className="flex justify-between text-sm">
                <span className="text-slate-700">{item.label}</span>
                <span className="font-medium text-slate-900">0%</span>
              </div>
              <Progress value={30} />
            </CardContent>
          ))}
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <CardHeader className="text-sm opacity-90">
            Tổng thời gian học
          </CardHeader>
          <CardContent className="text-3xl font-bold">0h</CardContent>
          <CardFooter className="text-sm opacity-90">Tuần này</CardFooter>
        </Card>
      </div>
    </aside>
  );
}
