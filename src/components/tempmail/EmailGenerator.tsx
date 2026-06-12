import { useEffect, useState } from "react";
import { Copy, RefreshCw, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { DOMAINS, randomLocalPart } from "./mock";

export function EmailGenerator() {
  const [localPart, setLocalPart] = useState<string>("loading");
  const [domain, setDomain] = useState<string>(DOMAINS[0]);
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setLocalPart(randomLocalPart());
  }, []);

  const email = `${localPart}@${domain}`;

  const regenerate = () => {
    setSpinning(true);
    setLocalPart(randomLocalPart());
    setTimeout(() => setSpinning(false), 500);
    toast("Fresh address generated", { description: "Your old one was instantly forgotten." });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Copied to clipboard", { description: email });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="brutal-border brutal-shadow-lg rounded-3xl bg-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Your temporary address
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/30 px-2.5 py-1 text-[11px] font-bold text-ink">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
            LIVE
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

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto]">
          {/* Domain select */}
          <div className="relative">
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
            onClick={copy}
            className="brutal-border brutal-shadow-sm brutal-press inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-yellow px-5 py-3 text-sm font-bold text-ink"
          >
            {copied ? <Check className="h-4 w-4" strokeWidth={3} /> : <Copy className="h-4 w-4" strokeWidth={3} />}
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            onClick={regenerate}
            className="brutal-border brutal-shadow-sm brutal-press inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-blue px-5 py-3 text-sm font-bold text-ink"
          >
            <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} strokeWidth={3} />
            New address
          </button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Auto-deletes in <span className="font-bold text-ink">24 hours</span>. Refresh the address anytime.
        </p>
      </div>
    </div>
  );
}
