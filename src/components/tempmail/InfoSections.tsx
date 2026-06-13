import { useState } from "react";
import { ChevronDown, Wand2, Inbox, Trash2, Lock, Server, Eye } from "lucide-react";

export function HowItWorks() {
  const steps = [
    { n: "01", icon: <Wand2 className="h-4 w-4" />,  title: "Generate",       text: "Tap once to mint a fresh address on one of our domains. No signup, no captcha." },
    { n: "02", icon: <Inbox className="h-4 w-4" />,  title: "Receive",        text: "Hand it out anywhere. Messages stream into your inbox in seconds." },
    { n: "03", icon: <Trash2 className="h-4 w-4" />, title: "Auto-destruct",  text: "After 24 hours the address and everything in it is permanently gone." },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl border-t border-line px-5 py-20 sm:px-8">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">03 / How it works</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
            Three steps.<br /><span className="italic text-passion">No friction.</span>
          </h2>
        </div>
        <ol className="grid gap-3 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="surface lift p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">{s.n}</span>
                <span className="grid h-7 w-7 place-items-center rounded-md bg-mist text-ship">{s.icon}</span>
              </div>
              <h3 className="mt-6 font-serif text-xl text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Privacy() {
  const items = [
    { icon: <Lock className="h-4 w-4" />,   title: "Zero retention",   text: "Messages live in memory only and are wiped on expiry. No backups, no archives." },
    { icon: <Server className="h-4 w-4" />, title: "No accounts",      text: "Nothing to sign up for. We can't leak data we never collect." },
    { icon: <Eye className="h-4 w-4" />,    title: "No trackers",      text: "No analytics, no third-party scripts, no fingerprinting. Just the inbox." },
  ];
  return (
    <section id="privacy" className="border-t border-line bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">04 / Privacy</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
            Built so we know <span className="italic text-passion">nothing about you</span>.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Tempbox exists to break the link between your identity and the services that demand it.
            That requires restraint at every layer.
          </p>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {items.map((i) => (
            <li key={i.title} className="surface p-5">
              <span className="inline-grid h-8 w-8 place-items-center rounded-md bg-mist text-ship">{i.icon}</span>
              <h3 className="mt-4 font-medium text-foreground">{i.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{i.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "How long does an address last?",
    a: "Every address auto-expires after 24 hours. You can extend the session in one tap, or generate a new one at any time.",
  },
  {
    q: "Can I send mail from a Tempbox address?",
    a: "No. Tempbox is receive-only by design. This keeps the service free of abuse and protects you from being impersonated.",
  },
  {
    q: "Is this really anonymous?",
    a: "We don't ask for any personal information and we don't log message contents. As long as you don't share identifying details inside your mail, your inbox is anonymous.",
  },
  {
    q: "Can I keep messages forever?",
    a: "Download any message as a .eml file before it expires. Once the address is gone, the inbox is gone.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-6xl border-t border-line px-5 py-20 sm:px-8">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">05 / FAQ</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
            Common <span className="italic text-passion">questions.</span>
          </h2>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium text-foreground">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <p className="-mt-1 pb-5 pr-8 text-[14px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
