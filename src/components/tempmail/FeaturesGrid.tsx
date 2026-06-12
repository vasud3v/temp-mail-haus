import { Zap, ShieldCheck, Timer, Infinity as InfinityIcon } from "lucide-react";

const FEATURES = [
  {
    title: "Instant Inbox",
    description: "An address is ready before the page finishes loading. Mail lands in seconds.",
    Icon: Zap,
    bg: "bg-brand-yellow",
  },
  {
    title: "Privacy First",
    description: "No account, no tracking, no marketing graph. Your real inbox stays yours.",
    Icon: ShieldCheck,
    bg: "bg-brand-green",
  },
  {
    title: "Auto Delete",
    description: "Every address and every message self-destructs within 24 hours. Always.",
    Icon: Timer,
    bg: "bg-brand-pink",
  },
  {
    title: "Unlimited Addresses",
    description: "Spin up as many burner inboxes as you like. One per signup is the move.",
    Icon: InfinityIcon,
    bg: "bg-brand-blue",
  },
] as const;

export function FeaturesGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="brutal-border inline-block rounded-full bg-card px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink brutal-shadow-sm">
          What you get
        </span>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
          Built for one job. Done well.
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          No bloat. No upsell. Just a fast, private, throwaway inbox that respects your time.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ title, description, Icon, bg }) => (
          <div
            key={title}
            className="brutal-border brutal-shadow brutal-lift rounded-3xl bg-card p-6"
          >
            <div className={`brutal-border inline-flex h-14 w-14 items-center justify-center rounded-2xl ${bg}`}>
              <Icon className="h-6 w-6 text-ink" strokeWidth={2.75} />
            </div>
            <h3 className="mt-5 text-lg font-black text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
