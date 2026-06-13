import { Moon, Sun, Github } from "lucide-react";
import { useTempMail } from "./TempMailContext";

export function Header() {
  const { theme, toggleTheme } = useTempMail();
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ship text-paper">
            <span className="font-serif text-base leading-none">t</span>
          </span>
          <span className="font-serif text-xl tracking-tight text-ship">
            tempbox<span className="text-passion">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#inbox"   className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">Inbox</a>
          <a href="#how"     className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">How it works</a>
          <a href="#privacy" className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">Privacy</a>
          <a href="#faq"     className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href="https://github.com"
            target="_blank" rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <Github className="h-4 w-4" />
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#generator"
            className="ml-1 hidden items-center rounded-md bg-ship px-3.5 py-2 text-[12.5px] font-medium text-paper transition-colors hover:bg-passion sm:inline-flex"
          >
            Get inbox
          </a>
        </div>
      </div>
    </header>
  );
}
