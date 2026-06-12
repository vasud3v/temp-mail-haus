import { Mail } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="brutal-border brutal-shadow-sm flex h-10 w-10 items-center justify-center rounded-xl bg-brand-yellow">
            <Mail className="h-5 w-5 text-ink" strokeWidth={2.75} />
          </span>
          <span className="text-xl font-black tracking-tight text-ink">Tempbox</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#inbox" className="text-sm font-semibold text-ink hover:underline underline-offset-4 decoration-[3px]">Inbox</a>
          <a href="#features" className="text-sm font-semibold text-ink hover:underline underline-offset-4 decoration-[3px]">Features</a>
          <a href="#stats" className="text-sm font-semibold text-ink hover:underline underline-offset-4 decoration-[3px]">Stats</a>
        </nav>

        <a
          href="#generator"
          className="brutal-border brutal-shadow-sm brutal-press inline-flex items-center rounded-xl bg-ink px-4 py-2 text-sm font-bold text-paper"
        >
          Get an address
        </a>
      </div>
    </header>
  );
}
