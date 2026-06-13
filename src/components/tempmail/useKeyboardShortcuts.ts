import { useEffect } from "react";
import { useTempMail } from "./TempMailContext";

export function useKeyboardShortcuts() {
  const { regenerate, copyEmail, emails, selectedId, setSelectedId, deleteEmail, searchRef, refreshNow, toggleStar } =
    useTempMail();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement | null;
      const inField = tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || tgt.isContentEditable);

      if (e.key === "/" && !inField) {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (inField) return;
      const key = e.key.toLowerCase();
      if (key === "n") { e.preventDefault(); regenerate(); }
      else if (key === "c") { e.preventDefault(); copyEmail(); }
      else if (key === "r") { e.preventDefault(); refreshNow(); }
      else if (key === "s" && selectedId) { e.preventDefault(); toggleStar(selectedId); }
      else if (key === "j" || key === "k") {
        if (emails.length === 0) return;
        e.preventDefault();
        const idx = Math.max(0, emails.findIndex((x) => x.id === selectedId));
        const next = key === "j" ? Math.min(emails.length - 1, idx + 1) : Math.max(0, idx - 1);
        setSelectedId(emails[next].id);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        if (selectedId) { e.preventDefault(); deleteEmail(selectedId); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [regenerate, copyEmail, emails, selectedId, setSelectedId, deleteEmail, searchRef, refreshNow, toggleStar]);
}
