import { useEffect, useState } from "react";
import { Copy, RefreshCw, Check, QrCode, Clock, Plus, History, Trash2 } from "lucide-react";
import { DOMAINS } from "./mock";
import { useTempMail } from "./TempMailContext";
import { QrModal } from "./QrModal";

function pad(n: number) { return String(n).padStart(2, "0"); }

function Countdown({ to }: { to: number }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const r = Math.max(0, to - now);
  const h = Math.floor(r / 3_600_000);
  const m = Math.floor((r % 3_600_000) / 60_000);
  const s = Math.floor((r % 60_000) / 1000);
  return <span className="font-mono tabular-nums">{pad(h)}:{pad(m)}:{pad(s)}</span>;
}

export function EmailGenerator() {
  const {
    localPart, domain, setDomain, regenerate, copyEmail, expiresAt, extendSession,
    history, switchTo, removeFromHistory,
  } = useTempMail();
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [histOpen, setHistOpen] = useState(false);

  const onCopy = async () => {
    await copyEmail();
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const onRegen = () => {
    setSpinning(true);
    regenerate();
    setTimeout(() => setSpinning(false), 500);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="surface relative p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-passion/50" />
              <span className="relative inline-block h-2 w-2 rounded-full bg-passion" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Active inbox
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <Clock className="h-3 w-3" />
            expires in <Countdown to={expiresAt} />
            <button onClick={extendSession} className="ml-1 inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-foreground hover:bg-muted">
              <Plus className="h-3 w-3" /> 24h
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-line bg-paper px-4 py-5 sm:px-6 sm:py-6">
          <p className="break-all font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {localPart === "loading" ? (
              <span className="inline-block h-9 w-72 max-w-full animate-pulse rounded bg-muted align-middle" />
            ) : (
              <>
                <span>{localPart}</span>
                <span className="text-mauve">@</span>
                <span className="text-passion">{domain}</span>
              </>
            )}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-[1fr_auto_auto_auto_auto]">
          <div className="relative col-span-2 sm:col-span-1">
            <label className="absolute -top-2 left-3 bg-card px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Domain
            </label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              aria-label="Domain"
              className="w-full appearance-none rounded-md border border-line bg-card px-3 py-2.5 text-sm font-medium text-foreground focus:border-passion focus:outline-none"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>@{d}</option>
              ))}
            </select>
          </div>

          <button
            onClick={onCopy}
            className="press inline-flex items-center justify-center gap-2 rounded-md bg-ship px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-passion"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            onClick={() => setQrOpen(true)}
            aria-label="Show QR"
            title="Show QR code"
            className="press inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-card text-foreground hover:bg-muted"
          >
            <QrCode className="h-4 w-4" />
          </button>

          <button
            onClick={() => setHistOpen((v) => !v)}
            aria-label="Address history"
            title="Recent addresses"
            className="press relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-card text-foreground hover:bg-muted"
          >
            <History className="h-4 w-4" />
            {history.length > 1 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-passion px-1 text-[10px] font-semibold text-paper">
                {history.length}
              </span>
            )}
          </button>

          <button
            onClick={onRegen}
            className="press inline-flex items-center justify-center gap-2 rounded-md border border-line bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} />
            New
          </button>
        </div>

        {histOpen && history.length > 0 && (
          <div className="mt-4 rounded-lg border border-line bg-paper p-3">
            <p className="px-1 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Recent addresses
            </p>
            <ul className="divide-y divide-line">
              {history.map((h) => {
                const active = `${localPart}@${domain}` === h.id;
                return (
                  <li key={h.id} className="flex items-center justify-between gap-2 py-2">
                    <button
                      onClick={() => { switchTo(h.id); setHistOpen(false); }}
                      className="min-w-0 flex-1 truncate text-left font-mono text-xs text-foreground hover:text-passion"
                    >
                      {h.id}
                      {active && <span className="ml-2 rounded bg-mist px-1.5 py-0.5 text-[10px] font-medium text-ship">current</span>}
                    </button>
                    <button
                      onClick={() => removeFromHistory(h.id)}
                      aria-label="Remove"
                      className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} email={`${localPart}@${domain}`} />
    </div>
  );
}
