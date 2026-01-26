"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/content";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            {profile.name}
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm transition-colors ${
                isActive("/")
                  ? "text-foreground font-medium"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Work
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-colors ${
                isActive("/about")
                  ? "text-foreground font-medium"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              About
            </Link>
            <Link
              href="/gallery"
              className={`text-sm transition-colors ${
                isActive("/gallery")
                  ? "text-foreground font-medium"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
