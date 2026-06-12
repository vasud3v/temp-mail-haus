import { useEffect, useState } from "react";

const TTL_MS = 24 * 60 * 60 * 1000;

export function Countdown({ from }: { from: number }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const remaining = Math.max(0, from + TTL_MS - now);
  const h = Math.floor(remaining / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="font-mono font-bold tabular-nums text-ink">
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}
