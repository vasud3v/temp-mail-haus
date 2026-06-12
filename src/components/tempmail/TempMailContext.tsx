import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { DOMAINS, MOCK_EMAILS, makeRandomEmail, randomLocalPart, type MockEmail } from "./mock";

type Theme = "light" | "dark";
export type Locale = "en" | "es" | "fr" | "de";

type Ctx = {
  // address
  localPart: string;
  domain: string;
  email: string;
  setDomain: (d: string) => void;
  regenerate: () => void;
  copyEmail: () => Promise<void>;
  createdAt: number; // ms epoch when address was made
  // emails
  emails: MockEmail[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  deleteEmail: (id: string) => void;
  markRead: (id: string) => void;
  // toggles
  theme: Theme;
  toggleTheme: () => void;
  sound: boolean;
  toggleSound: () => void;
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  spamFilter: boolean;
  toggleSpamFilter: () => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  // loading
  loading: boolean;
  // search
  searchRef: React.RefObject<HTMLInputElement | null>;
};

const TempMailCtx = createContext<Ctx | null>(null);

export function useTempMail() {
  const c = useContext(TempMailCtx);
  if (!c) throw new Error("useTempMail outside provider");
  return c;
}

function playBeep() {
  try {
    const AC = (window.AudioContext || (window as any).webkitAudioContext);
    if (!AC) return;
    const ctx = new AC();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    g.gain.value = 0.07;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.18);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
    o.stop(ctx.currentTime + 0.23);
    setTimeout(() => ctx.close(), 400);
  } catch {}
}

export function TempMailProvider({ children }: { children: ReactNode }) {
  const [localPart, setLocalPart] = useState("loading");
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [createdAt, setCreatedAt] = useState(() => Date.now());
  const [emails, setEmails] = useState<MockEmail[]>(MOCK_EMAILS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>("light");
  const [sound, setSound] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [spamFilter, setSpamFilter] = useState(true);
  const [locale, setLocale] = useState<Locale>("en");
  const searchRef = useRef<HTMLInputElement | null>(null);

  // initial address + load
  useEffect(() => {
    setLocalPart(randomLocalPart());
    const t = setTimeout(() => {
      setLoading(false);
      setSelectedId(MOCK_EMAILS[0].id);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  // theme apply
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  // restore prefs
  useEffect(() => {
    try {
      const s = localStorage.getItem("tempbox:prefs");
      if (s) {
        const p = JSON.parse(s);
        if (p.theme) setTheme(p.theme);
        if (typeof p.sound === "boolean") setSound(p.sound);
        if (typeof p.autoRefresh === "boolean") setAutoRefresh(p.autoRefresh);
        if (typeof p.spamFilter === "boolean") setSpamFilter(p.spamFilter);
        if (p.locale) setLocale(p.locale);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(
        "tempbox:prefs",
        JSON.stringify({ theme, sound, autoRefresh, spamFilter, locale }),
      );
    } catch {}
  }, [theme, sound, autoRefresh, spamFilter, locale]);

  // auto-refresh: every 25s maybe add a new email
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      const next = makeRandomEmail();
      setEmails((prev) => [next, ...prev]);
      if (sound) playBeep();
      toast(`New message from ${next.sender}`, { description: next.subject });
    }, 25_000);
    return () => clearInterval(id);
  }, [autoRefresh, sound]);

  const email = `${localPart}@${domain}`;

  const regenerate = useCallback(() => {
    setLocalPart(randomLocalPart());
    setCreatedAt(Date.now());
    setEmails(MOCK_EMAILS);
    setSelectedId(MOCK_EMAILS[0].id);
    toast("Fresh address generated", { description: "Your old one was instantly forgotten." });
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${localPart}@${domain}`);
      toast.success("Copied to clipboard", { description: `${localPart}@${domain}` });
    } catch {
      toast.error("Could not copy");
    }
  }, [localPart, domain]);

  const deleteEmail = useCallback((id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    setSelectedId((sel) => (sel === id ? null : sel));
    toast("Message deleted");
  }, []);

  const markRead = useCallback((id: string) => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, unread: false } : e)));
  }, []);

  const value: Ctx = useMemo(
    () => ({
      localPart, domain, email, setDomain, regenerate, copyEmail, createdAt,
      emails, selectedId, setSelectedId, deleteEmail, markRead,
      theme, toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      sound, toggleSound: () => setSound((s) => !s),
      autoRefresh, toggleAutoRefresh: () => setAutoRefresh((v) => !v),
      spamFilter, toggleSpamFilter: () => setSpamFilter((v) => !v),
      locale, setLocale,
      loading, searchRef,
    }),
    [localPart, domain, email, regenerate, copyEmail, createdAt, emails, selectedId,
     deleteEmail, markRead, theme, sound, autoRefresh, spamFilter, locale, loading],
  );

  return <TempMailCtx.Provider value={value}>{children}</TempMailCtx.Provider>;
}
