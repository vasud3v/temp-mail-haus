import { useMemo, useState } from "react";
import { Search, ShieldOff, ShieldCheck, RefreshCw } from "lucide-react";
import { InboxList } from "./InboxList";
import { EmailViewer } from "./EmailViewer";
import { useTempMail } from "./TempMailContext";
import { t } from "@/lib/i18n";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";
import { ShortcutsModal } from "./ShortcutsModal";
import { QrModal } from "./QrModal";

export function InboxSection() {
  const {
    emails, selectedId, setSelectedId, loading, locale,
    spamFilter, toggleSpamFilter, autoRefresh, toggleAutoRefresh,
    email, markRead,
  } = useTempMail();
  const [help, setHelp] = useState(false);
  const [qr, setQr] = useState(false);

  useKeyboardShortcuts(() => setHelp((v) => !v), () => setQr(true));

  const visible = useMemo(
    () => (spamFilter ? emails.filter((e) => !e.spam) : emails),
    [emails, spamFilter],
  );

  const selected = visible.find((e) => e.id === selectedId) ?? null;
  if (selected && selected.unread) {
    setTimeout(() => markRead(selected.id), 0);
  }

  return (
    <section id="inbox" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="brutal-border inline-block rounded-full bg-brand-blue px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink brutal-shadow-sm">
            Live preview
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
            {t(locale, "inbox.heading")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{t(locale, "inbox.sub")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Toggle
            label={spamFilter ? "Spam: filtered" : "Spam: visible"}
            active={spamFilter}
            onClick={toggleSpamFilter}
            icon={spamFilter ? <ShieldCheck className="h-4 w-4" strokeWidth={2.75} /> : <ShieldOff className="h-4 w-4" strokeWidth={2.75} />}
          />
          <Toggle
            label={autoRefresh ? "Auto-refresh: on" : "Auto-refresh: off"}
            active={autoRefresh}
            onClick={toggleAutoRefresh}
            icon={<RefreshCw className={`h-4 w-4 ${autoRefresh ? "animate-[spin_4s_linear_infinite]" : ""}`} strokeWidth={2.75} />}
          />
          <button
            onClick={() => setHelp(true)}
            className="brutal-border brutal-press hidden items-center gap-2 rounded-xl bg-paper px-3 py-2 text-xs font-bold text-ink md:inline-flex"
            aria-label="Shortcuts"
          >
            <Search className="h-3.5 w-3.5" strokeWidth={2.75} /> Press{" "}
            <kbd className="rounded bg-card px-1.5 py-0.5 font-mono">?</kbd>
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <InboxList
          emails={visible}
          selectedId={selectedId}
          onSelect={setSelectedId}
          loading={loading}
        />
        <EmailViewer email={loading ? null : selected} />
      </div>

      <ShortcutsModal open={help} onClose={() => setHelp(false)} />
      <QrModal open={qr} onClose={() => setQr(false)} email={email} />
    </section>
  );
}

function Toggle({
  label, active, onClick, icon,
}: { label: string; active: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`brutal-border brutal-press inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-ink ${active ? "bg-brand-green" : "bg-paper"}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
