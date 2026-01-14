import { useEffect, useState } from "react";
import {
  User,
  Brain,
  Lightbulb,
  FileText,
  Sun,
  Moon,
  Github,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#about", icon: User },
  { name: "What I'd Do", href: "#reasoning", icon: Brain },
  { name: "Concepts", href: "#concepts", icon: Lightbulb },
  { name: "Evidence", href: "#evidence", icon: FileText },
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#about");

  useEffect(() => {
    // Use IntersectionObserver for active section highlighting
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80; // Offset for navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      
      // Update URL without triggering navigation
      window.history.pushState(null, "", href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div className="text-lg font-semibold text-foreground">
            Rushil
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors text-sm font-medium",
                  "flex items-center gap-2",
                  activeSection === item.href
                    ? "bg-primary/10 text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                aria-label={item.name}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </a>
            ))}
            
            {/* External Links */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
              <a
                href="https://github.com/rushilcs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                title="GitHub"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </a>
              <a
                href="https://linkedin.com/in/rushilcs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
