import { X } from "lucide-react";
import { useEffect } from "react";

type Props = { open: boolean; onClose: () => void; email: string };

export function QrModal({ open, onClose, email }: Props) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(`mailto:${email}`)}`;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ship/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-xl border border-line bg-card p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Scan</p>
        <h3 className="mt-1 font-serif text-2xl text-foreground">Your address</h3>
        <div className="mt-5 grid place-items-center rounded-lg border border-line bg-paper p-5">
          <img src={src} alt={`QR for ${email}`} width={240} height={240} className="h-60 w-60" />
        </div>
        <p className="mt-4 break-all text-center font-mono text-xs text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}
