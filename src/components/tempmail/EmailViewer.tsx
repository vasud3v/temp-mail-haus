import { Reply, Trash2, Archive } from "lucide-react";
import { type MockEmail, AVATAR_BG, relativeTime } from "./mock";

type Props = { email: MockEmail | null };

export function EmailViewer({ email }: Props) {
  if (!email) return <EmptyState />;

  return (
    <div className="brutal-border brutal-shadow flex h-full flex-col rounded-3xl bg-card">
      <div className="flex items-start justify-between gap-3 border-b-[3px] border-ink p-5">
        <div className="flex items-start gap-3">
          <span className={`brutal-border flex h-12 w-12 items-center justify-center rounded-xl text-base font-black text-ink ${AVATAR_BG[email.avatarColor]}`}>
            {email.sender.charAt(0)}
          </span>
          <div>
            <p className="text-base font-black text-ink">{email.sender}</p>
            <p className="font-mono text-xs text-muted-foreground">{email.senderEmail}</p>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {relativeTime(email.receivedAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton label="Reply"><Reply className="h-4 w-4" strokeWidth={2.75} /></IconButton>
          <IconButton label="Archive"><Archive className="h-4 w-4" strokeWidth={2.75} /></IconButton>
          <IconButton label="Delete"><Trash2 className="h-4 w-4" strokeWidth={2.75} /></IconButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <h4 className="text-2xl font-black leading-tight tracking-tight text-ink">{email.subject}</h4>
        <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">
          {email.body}
        </pre>
      </div>
    </div>
  );
}

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="brutal-border brutal-press inline-flex h-9 w-9 items-center justify-center rounded-xl bg-paper text-ink"
    >
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="brutal-border brutal-shadow flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl bg-card p-8 text-center">
      <svg viewBox="0 0 160 120" className="h-32 w-40" aria-hidden>
        <rect x="8" y="22" width="144" height="88" rx="14" fill="#FFD84D" stroke="#111" strokeWidth="4" />
        <path d="M14 30 L80 78 L146 30" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="128" cy="20" r="10" fill="#FF9BCB" stroke="#111" strokeWidth="3" />
        <path d="M30 6 L34 14 M22 12 L30 14" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <h4 className="mt-5 text-lg font-black text-ink">Nothing selected</h4>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Pick a message from the inbox on the left and it will show up here. Fresh mail
        appears within seconds of arriving.
      </p>
    </div>
  );
}
