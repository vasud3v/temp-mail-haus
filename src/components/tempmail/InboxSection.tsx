import { useMemo } from "react";
import { RefreshCw, Inbox, Star, Mail } from "lucide-react";
import { InboxList } from "./InboxList";
import { EmailViewer } from "./EmailViewer";
import { useTempMail } from "./TempMailContext";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

export function InboxSection() {
  const {
    emails, selectedId, setSelectedId, loading,
    autoRefresh, toggleAutoRefresh, refreshNow,
    filter, setFilter, markRead,
  } = useTempMail();

  useKeyboardShortcuts();

  const visible = useMemo(() => {
    const noSpam = emails.filter((e) => !e.spam);
    if (filter === "unread") return noSpam.filter((e) => e.unread);
    if (filter === "starred") return noSpam.filter((e) => e.starred);
    return noSpam;
  }, [emails, filter]);

  const counts = useMemo(() => {
    const noSpam = emails.filter((e) => !e.spam);
    return {
      all: noSpam.length,
      unread: noSpam.filter((e) => e.unread).length,
      starred: noSpam.filter((e) => e.starred).length,
    };
  }, [emails]);

  const selected = visible.find((e) => e.id === selectedId) ?? null;
  if (selected && selected.unread) setTimeout(() => markRead(selected.id), 0);

  return (
    <section id="inbox" className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">02 / Inbox</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
            Your messages
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-md border border-line bg-card p-0.5">
            <FilterTab active={filter === "all"}     onClick={() => setFilter("all")}     icon={<Inbox className="h-3.5 w-3.5" />} label="All"     count={counts.all} />
            <FilterTab active={filter === "unread"}  onClick={() => setFilter("unread")}  icon={<Mail className="h-3.5 w-3.5" />}  label="Unread"  count={counts.unread} />
            <FilterTab active={filter === "starred"} onClick={() => setFilter("starred")} icon={<Star className="h-3.5 w-3.5" />}  label="Starred" count={counts.starred} />
          </div>

          <button
            onClick={refreshNow}
            className="press inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
          <button
            onClick={toggleAutoRefresh}
            aria-pressed={autoRefresh}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              autoRefresh ? "bg-ship text-paper" : "border border-line bg-card text-foreground hover:bg-muted"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${autoRefresh ? "bg-paper" : "bg-mauve"}`} />
            Auto-refresh {autoRefresh ? "on" : "off"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,360px)_1fr]">
        <InboxList
          emails={visible}
          selectedId={selectedId}
          onSelect={setSelectedId}
          loading={loading}
        />
        <EmailViewer email={loading ? null : selected} />
      </div>

      <p className="mt-4 hidden text-[11px] text-muted-foreground sm:block">
        Shortcuts: <kbd className="rounded border border-line bg-card px-1 font-mono text-[10px]">/</kbd> search ·
        <kbd className="ml-1 rounded border border-line bg-card px-1 font-mono text-[10px]">j/k</kbd> move ·
        <kbd className="ml-1 rounded border border-line bg-card px-1 font-mono text-[10px]">c</kbd> copy ·
        <kbd className="ml-1 rounded border border-line bg-card px-1 font-mono text-[10px]">n</kbd> new address ·
        <kbd className="ml-1 rounded border border-line bg-card px-1 font-mono text-[10px]">r</kbd> refresh ·
        <kbd className="ml-1 rounded border border-line bg-card px-1 font-mono text-[10px]">s</kbd> star
      </p>
    </section>
  );
}

function FilterTab({
  active, onClick, icon, label, count,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; count: number }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
        active ? "bg-mist text-ship" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
      <span className={`ml-0.5 rounded px-1 text-[10px] ${active ? "bg-card text-ship" : "text-muted-foreground"}`}>
        {count}
      </span>
    </button>
  );
}
