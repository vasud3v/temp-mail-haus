import { STATS } from "./mock";

const fmt = new Intl.NumberFormat("en-US");

const ITEMS = [
  { label: "Emails received today", value: fmt.format(STATS.emailsToday), bg: "bg-brand-yellow" },
  { label: "Active inboxes right now", value: fmt.format(STATS.activeInboxes), bg: "bg-brand-pink" },
  { label: "Available domains", value: String(STATS.domains), bg: "bg-brand-blue" },
];

export function StatsCards() {
  return (
    <section id="stats" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {ITEMS.map((s) => (
          <div
            key={s.label}
            className={`brutal-border brutal-shadow brutal-lift rounded-3xl ${s.bg} p-7`}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-ink/80">{s.label}</p>
            <p className="mt-3 text-5xl font-black tracking-tight text-ink sm:text-6xl">{s.value}</p>
            <p className="mt-2 text-xs font-semibold text-ink/70">updated live · last 24h</p>
          </div>
        ))}
      </div>
    </section>
  );
}
