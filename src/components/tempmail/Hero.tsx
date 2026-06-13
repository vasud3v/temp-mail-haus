import { EmailGenerator } from "./EmailGenerator";
import { ShieldCheck, Zap, EyeOff } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            01 / Temporary email
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Disposable inboxes,<br />
            <span className="italic text-passion">handled with care.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Generate an address in a single click. Receive verification codes, signup links and
            receipts — without ever exposing your real email.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-muted-foreground">
            <Tag icon={<Zap className="h-3 w-3" />}>Instant</Tag>
            <Tag icon={<ShieldCheck className="h-3 w-3" />}>No signup</Tag>
            <Tag icon={<EyeOff className="h-3 w-3" />}>Auto-deletes in 24h</Tag>
          </div>
        </div>

        <div id="generator" className="mt-12 sm:mt-16">
          <EmailGenerator />
        </div>
      </div>
    </section>
  );
}

function Tag({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-passion">{icon}</span>
      {children}
    </span>
  );
}
