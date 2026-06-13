import { Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { type MockEmail, relativeTime, senderInitials } from "./mock";
import { useTempMail } from "./TempMailContext";

type Props = {
  emails: MockEmail[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loading?: boolean;
};

export function InboxList({ emails, selectedId, onSelect, loading }: Props) {
  const { searchRef, toggleStar } = useTempMail();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return emails;
    return emails.filter(
      (e) =>
        e.sender.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q),
    );
  }, [emails, query]);

  return (
    <div className="surface flex h-full flex-col">
      <div className="border-b border-line p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages…"
            className="w-full rounded-md border border-line bg-paper py-2 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-passion focus:outline-none"
          />
        </div>
      </div>

      <ul className="max-h-[560px] flex-1 divide-y divide-line overflow-y-auto">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          : filtered.length === 0
            ? (
              <li className="grid place-items-center px-6 py-16 text-center text-sm text-muted-foreground">
                {query ? `No messages match "${query}"` : "Your inbox is empty"}
              </li>
            )
            : filtered.map((email) => {
                const active = email.id === selectedId;
                return (
                  <li key={email.id}>
                    <button
                      onClick={() => onSelect(email.id)}
                      className={`group relative flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors ${
                        active ? "bg-mist/60" : "hover:bg-muted/60"
                      }`}
                    >
                      {active && <span className="absolute inset-y-2 left-0 w-0.5 rounded-r bg-passion" />}
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-mist font-serif text-sm text-ship">
                        {senderInitials(email.sender)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`truncate text-sm ${email.unread ? "font-semibold text-foreground" : "font-medium text-foreground/80"}`}>
                            {email.sender}
                          </p>
                          <div className="flex shrink-0 items-center gap-1.5">
                            <span className="text-[11px] text-muted-foreground">{relativeTime(email.receivedAt)}</span>
                            {email.unread && <span className="h-1.5 w-1.5 rounded-full bg-passion" aria-label="unread" />}
                          </div>
                        </div>
                        <p className={`truncate text-[13px] ${email.unread ? "text-foreground" : "text-muted-foreground"}`}>
                          {email.subject}
                        </p>
                        <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{email.preview}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleStar(email.id); }}
                        aria-label={email.starred ? "Unstar" : "Star"}
                        className={`shrink-0 rounded p-1 ${email.starred ? "text-rose" : "text-muted-foreground/60 opacity-0 group-hover:opacity-100"}`}
                      >
                        <Star className="h-3.5 w-3.5" fill={email.starred ? "currentColor" : "none"} />
                      </button>
                    </button>
                  </li>
                );
              })}
      </ul>
    </div>
  );
}

function SkeletonRow() {
  return (
    <li className="flex items-start gap-3 p-4">
      <span className="h-9 w-9 shrink-0 animate-pulse rounded-md bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-2.5 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </li>
  );
}
