import { useState } from "react";
import { Reply, Trash2, Download, Paperclip, Star, Forward, Send } from "lucide-react";
import { toast } from "sonner";
import { type MockEmail, relativeTime, senderInitials } from "./mock";
import { useTempMail } from "./TempMailContext";

type Props = { email: MockEmail | null };

export function EmailViewer({ email }: Props) {
  const { deleteEmail, toggleStar, email: address } = useTempMail();
  const [forwardOpen, setForwardOpen] = useState(false);
  const [forwardTo, setForwardTo] = useState("");

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

  const handleForward = () => {
    if (!/^\S+@\S+\.\S+$/.test(forwardTo)) {
      toast.error("Enter a valid email address");
      return;
    }
    toast.success(`Forwarded to ${forwardTo}`);
    setForwardTo("");
    setForwardOpen(false);
  };

  const downloadAttachment = (name: string, mime: string) => {
    const blob = new Blob([`[mock attachment: ${name}]`], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="surface flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line p-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-mist font-serif text-base text-ship">
            {senderInitials(email.sender)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{email.sender}</p>
            <p className="truncate font-mono text-[11px] text-muted-foreground">{email.senderEmail}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              to <span className="font-mono">{address}</span> · {relativeTime(email.receivedAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <IconBtn label={email.starred ? "Unstar" : "Star"} onClick={() => toggleStar(email.id)}>
            <Star className="h-4 w-4" fill={email.starred ? "currentColor" : "none"} />
          </IconBtn>
          <IconBtn label="Reply" onClick={() => toast("Reply is disabled in temp inboxes")}>
            <Reply className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Forward" onClick={() => setForwardOpen((v) => !v)}>
            <Forward className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Download .eml" onClick={exportEml}>
            <Download className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Delete" onClick={() => deleteEmail(email.id)}>
            <Trash2 className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>

      {forwardOpen && (
        <div className="flex items-center gap-2 border-b border-line bg-paper p-3">
          <span className="text-xs font-medium text-muted-foreground">Forward to</span>
          <input
            value={forwardTo}
            onChange={(e) => setForwardTo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleForward()}
            placeholder="you@real-email.com"
            className="flex-1 rounded-md border border-line bg-card px-3 py-1.5 text-sm focus:border-passion focus:outline-none"
            autoFocus
          />
          <button
            onClick={handleForward}
            className="inline-flex items-center gap-1.5 rounded-md bg-ship px-3 py-1.5 text-xs font-medium text-paper hover:bg-passion"
          >
            <Send className="h-3 w-3" /> Send
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <h4 className="font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
          {email.subject}
        </h4>
        <div className="my-5 h-px w-12 bg-passion" />
        <pre className="whitespace-pre-wrap font-sans text-[14.5px] leading-relaxed text-foreground/90">
          {email.body}
        </pre>

        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-8 border-t border-line pt-5">
            <p className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <Paperclip className="h-3 w-3" />
              {email.attachments.length} attachment{email.attachments.length > 1 ? "s" : ""}
            </p>
            <ul className="flex flex-wrap gap-2">
              {email.attachments.map((a) => (
                <li key={a.name}>
                  <button
                    onClick={() => downloadAttachment(a.name, a.mime)}
                    className="press inline-flex items-center gap-2 rounded-md border border-line bg-paper px-3 py-2 text-xs text-foreground hover:bg-muted"
                  >
                    <Paperclip className="h-3 w-3" />
                    <span className="max-w-[180px] truncate font-medium">{a.name}</span>
                    <span className="text-muted-foreground">· {a.size}</span>
                    <Download className="h-3 w-3" />
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

function IconBtn({
  children, label, onClick,
}: { children: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="surface grid h-full min-h-[420px] place-items-center p-10 text-center">
      <div className="max-w-xs">
        <div className="mx-auto h-12 w-12 rounded-full border border-line bg-mist/60" />
        <h4 className="mt-5 font-serif text-2xl text-foreground">No message selected</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a message from the list. New mail appears here within seconds of arriving.
        </p>
      </div>
    </div>
  );
}
