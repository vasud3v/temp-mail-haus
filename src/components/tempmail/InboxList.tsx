import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { type MockEmail, AVATAR_BG, relativeTime } from "./mock";
import { useTempMail } from "./TempMailContext";
import { t } from "@/lib/i18n";

type Props = {
  emails: MockEmail[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loading?: boolean;
};

export function InboxList({ emails, selectedId, onSelect, loading }: Props) {
  const { searchRef, locale } = useTempMail();
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
    <div className="brutal-border brutal-shadow rounded-3xl bg-card">
      <div className="border-b-[3px] border-ink p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black tracking-tight text-ink">{t(locale, "inbox.title")}</h3>
          <span className="brutal-border rounded-full bg-brand-yellow px-2.5 py-0.5 text-xs font-bold text-ink">
            {emails.filter((e) => e.unread).length} {t(locale, "inbox.new")}
          </span>
        </div>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={2.5} />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(locale, "inbox.search")}
            className="brutal-border w-full rounded-2xl bg-paper py-2.5 pl-9 pr-3 text-sm font-medium text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <ul className="max-h-[560px] divide-y-[3px] divide-ink overflow-y-auto">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          : filtered.length === 0
            ? (
              <li className="p-8 text-center text-sm font-medium text-muted-foreground">
                No messages match "{query}".
              </li>
            )
            : filtered.map((email) => {
                const active = email.id === selectedId;
                return (
                  <li key={email.id}>
                    <button
                      onClick={() => onSelect(email.id)}
                      className={`flex w-full items-start gap-3 p-4 text-left transition-colors ${
                        active ? "bg-brand-yellow/40" : "hover:bg-paper"
                      }`}
                    >
                      <span
                        className={`brutal-border flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black text-ink ${AVATAR_BG[email.avatarColor]}`}
                      >
                        {email.sender.charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-bold text-ink">{email.sender}</p>
                          <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">
                            {relativeTime(email.receivedAt)}
                          </span>
                        </div>
                        <p className={`truncate text-sm ${email.unread ? "font-bold text-ink" : "text-muted-foreground"}`}>
                          {email.subject}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">{email.preview}</p>
                      </div>
                      {email.unread && (
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink bg-brand-pink" aria-label="unread" />
                      )}
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
      <span className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-2.5 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </li>
  );
}
