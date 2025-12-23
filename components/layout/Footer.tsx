import {
  BookOpen,
  Home,
  GraduationCap,
  Trophy,
  User,
  Menu,
  X,
  Search,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-5 border-t relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ZipJap
              </span>
            </div>
            <p className="text-sm">
              Nền tảng học tiếng Nhật hiện đại và hiệu quả nhất cho người Việt Nam
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Học tập</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Ngữ pháp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Kanji
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Từ vựng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Luyện nghe
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4">Cộng đồng</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Diễn đàn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm">
          <p>© 2024 ZipJap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
