import { useEffect } from "react";
import { useTempMail } from "./TempMailContext";

export function useKeyboardShortcuts(onToggleHelp: () => void, onShowQr: () => void) {
  const { regenerate, copyEmail, emails, selectedId, setSelectedId, deleteEmail, searchRef, spamFilter } =
    useTempMail();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement | null;
      const inField = tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || tgt.isContentEditable);
      const visible = spamFilter ? emails.filter((x) => !x.spam) : emails;

      if (e.key === "/" && !inField) {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (e.key === "?" && !inField) {
        e.preventDefault();
        onToggleHelp();
        return;
      }
      if (inField) return;
      const key = e.key.toLowerCase();
      if (key === "r") { e.preventDefault(); regenerate(); }
      else if (key === "c") { e.preventDefault(); copyEmail(); }
      else if (key === "q") { e.preventDefault(); onShowQr(); }
      else if (key === "j" || key === "k") {
        if (visible.length === 0) return;
        e.preventDefault();
        const idx = Math.max(0, visible.findIndex((x) => x.id === selectedId));
        const next = key === "j" ? Math.min(visible.length - 1, idx + 1) : Math.max(0, idx - 1);
        setSelectedId(visible[next].id);
      } else if (key === "d" || e.key === "Backspace" || e.key === "Delete") {
        if (selectedId) { e.preventDefault(); deleteEmail(selectedId); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [regenerate, copyEmail, emails, selectedId, setSelectedId, deleteEmail, searchRef, onToggleHelp, onShowQr, spamFilter]);
}
