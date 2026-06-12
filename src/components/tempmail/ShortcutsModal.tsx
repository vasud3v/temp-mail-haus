import { X } from "lucide-react";
import { useEffect } from "react";

const ITEMS: Array<[string, string]> = [
  ["R", "Regenerate address"],
  ["C", "Copy address"],
  ["Q", "Show QR code"],
  ["/", "Focus search"],
  ["J / K", "Next / previous message"],
  ["D / ⌫", "Delete selected"],
  ["?", "Toggle this help"],
];

export function ShortcutsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 animate-fade-in" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="brutal-border brutal-shadow-lg w-full max-w-md rounded-3xl bg-card p-6 animate-scale-in">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-ink">Keyboard shortcuts</h3>
          <button aria-label="Close" onClick={onClose} className="brutal-border brutal-press inline-flex h-9 w-9 items-center justify-center rounded-xl bg-paper text-ink">
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
        <ul className="mt-5 space-y-2">
          {ITEMS.map(([k, label]) => (
            <li key={k} className="flex items-center justify-between gap-3 rounded-xl border-[3px] border-ink bg-paper px-4 py-2.5">
              <span className="text-sm font-semibold text-ink">{label}</span>
              <kbd className="brutal-border rounded-md bg-card px-2 py-0.5 font-mono text-xs font-bold text-ink">{k}</kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
