import { useEffect, useState } from "react";
import { InboxList } from "./InboxList";
import { EmailViewer } from "./EmailViewer";
import { MOCK_EMAILS } from "./mock";

export function InboxSection() {
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setSelectedId(MOCK_EMAILS[0].id);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const selected = MOCK_EMAILS.find((e) => e.id === selectedId) ?? null;

  return (
    <section id="inbox" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="brutal-border inline-block rounded-full bg-brand-blue px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink brutal-shadow-sm">
            Live preview
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
            Your inbox, no waiting.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Messages stream in the moment they arrive. Click any thread to read it on the right.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <InboxList
          emails={MOCK_EMAILS}
          selectedId={selectedId}
          onSelect={setSelectedId}
          loading={loading}
        />
        <EmailViewer email={loading ? null : selected} />
      </div>
    </section>
  );
}
