import { Mail, Moon, Sun, Volume2, VolumeX, Languages } from "lucide-react";
import { useTempMail, type Locale } from "./TempMailContext";

const LOCALES: Array<{ code: Locale; label: string }> = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
];

export function Header() {
  const { theme, toggleTheme, sound, toggleSound, locale, setLocale } = useTempMail();
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
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

        <div className="flex items-center gap-2">
          <label className="brutal-border hidden items-center overflow-hidden rounded-xl bg-card sm:inline-flex">
            <Languages className="ml-2 h-3.5 w-3.5 text-ink" strokeWidth={2.75} />
            <select
              aria-label="Language"
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="appearance-none bg-card px-2 py-2 text-xs font-bold text-ink focus:outline-none"
            >
              {LOCALES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </label>

          <button
            onClick={toggleSound}
            aria-label={sound ? "Mute notifications" : "Enable notification sound"}
            title={sound ? "Sound on" : "Sound off"}
            className="brutal-border brutal-press inline-flex h-9 w-9 items-center justify-center rounded-xl bg-card text-ink"
          >
            {sound ? <Volume2 className="h-4 w-4" strokeWidth={2.75} /> : <VolumeX className="h-4 w-4" strokeWidth={2.75} />}
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="brutal-border brutal-press inline-flex h-9 w-9 items-center justify-center rounded-xl bg-card text-ink"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" strokeWidth={2.75} /> : <Moon className="h-4 w-4" strokeWidth={2.75} />}
          </button>

          <a
            href="#generator"
            className="brutal-border brutal-shadow-sm brutal-press hidden items-center rounded-xl bg-ink px-4 py-2 text-sm font-bold text-paper sm:inline-flex"
          >
            Get an address
          </a>
        </div>
      </div>
    </header>
  );
}
