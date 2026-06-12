import { Reply, Trash2, Archive, Printer, Download, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { type MockEmail, AVATAR_BG, relativeTime } from "./mock";
import { useTempMail } from "./TempMailContext";

type Props = { email: MockEmail | null };

export function EmailViewer({ email }: Props) {
  const { deleteEmail, email: address } = useTempMail();
  if (!email) return <EmptyState />;

  const exportEml = () => {
    const eml = [
      `From: ${email.sender} <${email.senderEmail}>`,
      `To: ${address}`,
      `Subject: ${email.subject}`,
      `Date: ${email.receivedAt.toUTCString()}`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      email.body,
    ].join("\r\n");
    const blob = new Blob([eml], { type: "message/rfc822" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${email.subject.replace(/[^a-z0-9-_]+/gi, "_").slice(0, 40)}.eml`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Message downloaded");
  };

  const print = () => {
    const w = window.open("", "_blank", "width=720,height=900");
    if (!w) return;
    w.document.write(`<html><head><title>${email.subject}</title>
      <style>body{font-family:Inter,system-ui,sans-serif;padding:32px;color:#111}
      h1{font-size:22px;margin:0 0 8px}.meta{color:#666;font-size:12px;margin-bottom:16px}
      pre{white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.6}</style></head><body>
      <h1>${email.subject}</h1>
      <div class="meta">From <b>${email.sender}</b> &lt;${email.senderEmail}&gt; · ${email.receivedAt.toLocaleString()}</div>
      <pre>${email.body.replace(/</g, "&lt;")}</pre>
      </body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  };

  const downloadAttachment = (name: string, mime: string) => {
    const blob = new Blob([`[mock attachment: ${name}]`], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
    toast(`Downloaded ${name}`);
  };

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
        <div className="flex flex-wrap items-center gap-2">
          <IconButton label="Reply"><Reply className="h-4 w-4" strokeWidth={2.75} /></IconButton>
          <IconButton label="Print" onClick={print}><Printer className="h-4 w-4" strokeWidth={2.75} /></IconButton>
          <IconButton label="Download .eml" onClick={exportEml}><Download className="h-4 w-4" strokeWidth={2.75} /></IconButton>
          <IconButton label="Archive"><Archive className="h-4 w-4" strokeWidth={2.75} /></IconButton>
          <IconButton label="Delete" onClick={() => deleteEmail(email.id)}><Trash2 className="h-4 w-4" strokeWidth={2.75} /></IconButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <h4 className="text-2xl font-black leading-tight tracking-tight text-ink">{email.subject}</h4>
        <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">
          {email.body}
        </pre>

        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Paperclip className="h-3.5 w-3.5" strokeWidth={2.75} />
              {email.attachments.length} attachment{email.attachments.length > 1 ? "s" : ""}
            </p>
            <ul className="flex flex-wrap gap-2">
              {email.attachments.map((a) => (
                <li key={a.name}>
                  <button
                    onClick={() => downloadAttachment(a.name, a.mime)}
                    className="brutal-border brutal-press inline-flex items-center gap-2 rounded-xl bg-paper px-3 py-2 text-xs font-bold text-ink"
                  >
                    <Paperclip className="h-3.5 w-3.5" strokeWidth={2.75} />
                    <span className="max-w-[160px] truncate">{a.name}</span>
                    <span className="text-muted-foreground">· {a.size}</span>
                    <Download className="h-3.5 w-3.5" strokeWidth={2.75} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function IconButton({
  children, label, onClick,
}: { children: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
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
