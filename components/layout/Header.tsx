import { cn } from "@/lib/utils";

import Logo from "@/components/Logo";
import Navbar from "./Navbar";

export type NavigationSection = {
  title: string;
  href: string;
};

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn("bg-background sticky top-0 z-50 h-16 border-b", className)}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6">
        {/* Logo */}
        <Logo className="gap-3" />

        {/* Navigation */}
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
