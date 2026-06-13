import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { DOMAINS, MOCK_EMAILS, makeRandomEmail, randomLocalPart, type MockEmail } from "./mock";

type Theme = "light" | "dark";

export type SavedAddress = {
  id: string;
  localPart: string;
  domain: string;
  createdAt: number;
  expiresAt: number;
};

type Filter = "all" | "unread" | "starred";

type Ctx = {
  // address
  localPart: string;
  domain: string;
  email: string;
  setDomain: (d: string) => void;
  regenerate: () => void;
  copyEmail: () => Promise<void>;
  createdAt: number;
  expiresAt: number;
  extendSession: () => void;
  // history
  history: SavedAddress[];
  switchTo: (id: string) => void;
  removeFromHistory: (id: string) => void;
  // emails
  emails: MockEmail[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  deleteEmail: (id: string) => void;
  markRead: (id: string) => void;
  toggleStar: (id: string) => void;
  refreshNow: () => void;
  // filter / search
  filter: Filter;
  setFilter: (f: Filter) => void;
  // toggles
  theme: Theme;
  toggleTheme: () => void;
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  // loading
  loading: boolean;
  // search input ref (for shortcut focus)
  searchRef: React.RefObject<HTMLInputElement | null>;
};

const TempMailCtx = createContext<Ctx | null>(null);

export function useTempMail() {
  const c = useContext(TempMailCtx);
  if (!c) throw new Error("useTempMail outside provider");
  return c;
}

const TTL = 24 * 60 * 60 * 1000;

export function TempMailProvider({ children }: { children: ReactNode }) {
  const [localPart, setLocalPart] = useState("loading");
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [createdAt, setCreatedAt] = useState(() => Date.now());
  const [expiresAt, setExpiresAt] = useState(() => Date.now() + TTL);
  const [history, setHistory] = useState<SavedAddress[]>([]);
  const [emails, setEmails] = useState<MockEmail[]>(MOCK_EMAILS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>("light");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const searchRef = useRef<HTMLInputElement | null>(null);

  // initial address
  useEffect(() => {
    const lp = randomLocalPart();
    setLocalPart(lp);
    const t = setTimeout(() => {
      setLoading(false);
      setSelectedId(MOCK_EMAILS[0].id);
    }, 450);
    return () => clearTimeout(t);
  }, []);

  // restore prefs + history
  useEffect(() => {
    try {
      const s = localStorage.getItem("tempbox:v2");
      if (s) {
        const p = JSON.parse(s);
        if (p.theme) setTheme(p.theme);
        if (typeof p.autoRefresh === "boolean") setAutoRefresh(p.autoRefresh);
        if (Array.isArray(p.history)) setHistory(p.history);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("tempbox:v2", JSON.stringify({ theme, autoRefresh, history }));
    } catch {}
  }, [theme, autoRefresh, history]);

  // theme apply
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // record current address in history
  useEffect(() => {
    if (localPart === "loading") return;
    setHistory((prev) => {
      const exists = prev.find((h) => h.localPart === localPart && h.domain === domain);
      if (exists) return prev;
      const entry: SavedAddress = {
        id: `${localPart}@${domain}`,
        localPart, domain, createdAt, expiresAt,
      };
      return [entry, ...prev].slice(0, 8);
    });
  }, [localPart, domain, createdAt, expiresAt]);

  // auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      const next = makeRandomEmail();
      setEmails((prev) => [next, ...prev]);
      toast(`New message · ${next.sender}`, { description: next.subject });
    }, 30_000);
    return () => clearInterval(id);
  }, [autoRefresh]);

  const email = `${localPart}@${domain}`;

  const regenerate = useCallback(() => {
    const lp = randomLocalPart();
    setLocalPart(lp);
    const t0 = Date.now();
    setCreatedAt(t0);
    setExpiresAt(t0 + TTL);
    setEmails(MOCK_EMAILS);
    setSelectedId(MOCK_EMAILS[0].id);
    toast("New address generated");
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${localPart}@${domain}`);
      toast.success("Copied", { description: `${localPart}@${domain}` });
    } catch {
      toast.error("Could not copy");
    }
  }, [localPart, domain]);

  const extendSession = useCallback(() => {
    setExpiresAt((e) => e + TTL);
    toast.success("Session extended by 24 hours");
  }, []);

  const switchTo = useCallback((id: string) => {
    setHistory((prev) => {
      const h = prev.find((x) => x.id === id);
      if (!h) return prev;
      setLocalPart(h.localPart);
      setDomain(h.domain);
      setCreatedAt(h.createdAt);
      setExpiresAt(h.expiresAt);
      setEmails(MOCK_EMAILS);
      setSelectedId(MOCK_EMAILS[0].id);
      return prev;
    });
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const deleteEmail = useCallback((id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    setSelectedId((sel) => (sel === id ? null : sel));
  }, []);

  const markRead = useCallback((id: string) => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, unread: false } : e)));
  }, []);

  const toggleStar = useCallback((id: string) => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)));
  }, []);

  const refreshNow = useCallback(() => {
    const next = makeRandomEmail();
    setEmails((prev) => [next, ...prev]);
    toast(`New message · ${next.sender}`, { description: next.subject });
  }, []);

  const value: Ctx = useMemo(() => ({
    localPart, domain, email, setDomain, regenerate, copyEmail, createdAt, expiresAt, extendSession,
    history, switchTo, removeFromHistory,
    emails, selectedId, setSelectedId, deleteEmail, markRead, toggleStar, refreshNow,
    filter, setFilter,
    theme, toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    autoRefresh, toggleAutoRefresh: () => setAutoRefresh((v) => !v),
    loading, searchRef,
  }), [localPart, domain, email, regenerate, copyEmail, createdAt, expiresAt, extendSession,
       history, switchTo, removeFromHistory,
       emails, selectedId, deleteEmail, markRead, toggleStar, refreshNow,
       filter, theme, autoRefresh, loading]);

  return <TempMailCtx.Provider value={value}>{children}</TempMailCtx.Provider>;
}
