import { useState } from "react";
import { Copy, RefreshCw, Check, ChevronDown, QrCode, Clock } from "lucide-react";
import { DOMAINS } from "./mock";
import { useTempMail } from "./TempMailContext";
import { QrModal } from "./QrModal";
import { Countdown } from "./Countdown";
import { t } from "@/lib/i18n";

export function EmailGenerator() {
  const { localPart, domain, setDomain, regenerate, copyEmail, createdAt, locale } = useTempMail();
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const onCopy = async () => {
    await copyEmail();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const onRegen = () => {
    setSpinning(true);
    regenerate();
    setTimeout(() => setSpinning(false), 500);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="brutal-border brutal-shadow-lg rounded-3xl bg-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t(locale, "gen.label")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/30 px-2.5 py-1 text-[11px] font-bold text-ink">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
            {t(locale, "gen.live")}
          </span>
        </div>

        <div className="mt-4 rounded-2xl border-[3px] border-ink bg-paper px-4 py-5 sm:px-6 sm:py-6">
          <p className="break-all font-mono text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
            {localPart === "loading" ? (
              <span className="inline-block h-8 w-72 max-w-full animate-pulse rounded-md bg-muted align-middle" />
            ) : (
              <>
                <span>{localPart}</span>
                <span className="text-muted-foreground">@</span>
                <span>{domain}</span>
              </>
            )}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative col-span-2 sm:col-span-1">
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              aria-label="Domain"
              className="brutal-border brutal-shadow-sm brutal-press w-full appearance-none rounded-2xl bg-card py-3 pl-4 pr-10 text-sm font-bold text-ink focus:outline-none"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>@{d}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" strokeWidth={3} />
          </div>

          <button
            onClick={onCopy}
            className="brutal-border brutal-shadow-sm brutal-press inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-yellow px-4 py-3 text-sm font-bold text-ink"
          >
            {copied ? <Check className="h-4 w-4" strokeWidth={3} /> : <Copy className="h-4 w-4" strokeWidth={3} />}
            {copied ? t(locale, "gen.copied") : t(locale, "gen.copy")}
          </button>

          <button
            onClick={() => setQrOpen(true)}
            aria-label="Show QR"
            className="brutal-border brutal-shadow-sm brutal-press inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-pink px-4 py-3 text-sm font-bold text-ink"
          >
            <QrCode className="h-4 w-4" strokeWidth={3} />
            {t(locale, "gen.qr")}
          </button>

          <button
            onClick={onRegen}
            className="brutal-border brutal-shadow-sm brutal-press inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-blue px-4 py-3 text-sm font-bold text-ink"
          >
            <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} strokeWidth={3} />
            {t(locale, "gen.new")}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" strokeWidth={2.75} />
          {t(locale, "gen.expires")} <Countdown from={createdAt} />
        </div>
      </div>

      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} email={`${localPart}@${domain}`} />
    </div>
  );
}
