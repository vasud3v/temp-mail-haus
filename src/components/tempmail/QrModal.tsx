import { X } from "lucide-react";
import { useEffect } from "react";

type Props = { open: boolean; onClose: () => void; email: string };

export function QrModal({ open, onClose, email }: Props) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(`mailto:${email}`)}`;

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="brutal-border brutal-shadow-lg w-full max-w-sm rounded-3xl bg-card p-6 animate-scale-in"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Scan to share</p>
            <p className="mt-1 break-all font-mono text-sm font-bold text-ink">{email}</p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="brutal-border brutal-press inline-flex h-9 w-9 items-center justify-center rounded-xl bg-paper text-ink"
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
        <div className="mt-5 flex items-center justify-center rounded-2xl border-[3px] border-ink bg-white p-3">
          <img src={qrUrl} alt={`QR for ${email}`} width={260} height={260} className="h-[260px] w-[260px]" />
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Point any camera. Opens a new mail to this address.
        </p>
      </div>
    </div>
  );
}
