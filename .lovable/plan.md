
## Note on stack
This project runs on **TanStack Start + React 19 + Vite + Tailwind v4**, not Next.js 15. I'll keep the exact design spec (Soft Brutalism, your color tokens, components, layout) and implement it idiomatically in TanStack Start. No functional difference for you — file routing instead of `app/`.

## Scope
A single-page marketing + product surface at `/` with mock data only. No backend, no Cloud, no real mail.

## Design tokens (src/styles.css)
- Replace current palette with the soft brutalist system:
  - `--background: #F8F6F1`, `--foreground: #111111`, `--card: #FFFFFF`
  - Accents: `--accent-yellow #FFD84D`, `--accent-blue #6CA6FF`, `--accent-green #89E089`, `--accent-pink #FF9BCB`
  - `--border: #111111`, `--radius: 1.25rem` (20px)
  - Custom shadow token `--shadow-brutal: 6px 6px 0 0 #111` (soft offset, not blurred harsh) + a softer `--shadow-soft` for hover lift
- Register tokens in `@theme inline` so `bg-accent-yellow`, `shadow-brutal`, etc. work as utilities
- Load Inter via `<link>` in `__root.tsx` head, set `--font-sans: "Inter"`
- Global: 3px borders by default on cards/buttons via a `.brutal` `@utility`

## Routes
- `src/routes/index.tsx` — composes the full page
- Update `__root.tsx` head with proper title/description/OG for "Temp Mail — Temporary Email That Just Works"

## Components (`src/components/tempmail/`)
1. `Header.tsx` — chunky logo mark (yellow square + bold wordmark), nav links (Inbox, Features, FAQ), CTA button
2. `Hero.tsx` — oversized H1 "Temporary Email That Just Works.", subtitle on privacy, decorative sticker shapes (rotated accent blobs) for handmade feel
3. `EmailGenerator.tsx` — large white card, thick border, brutal shadow:
   - Generated address shown big & mono
   - Copy button (yellow), Regenerate button (blue), Domain `<Select>` (shadcn) with mock domains
   - Random email on mount via `useState` + `useEffect`; toast on copy via `sonner`
4. `InboxList.tsx` — left column: search input + list of mock messages (avatar circle in random accent, sender, subject, relative time via small helper, unread dot). Click selects.
5. `EmailViewer.tsx` — right column: selected mail preview with header meta + body; empty state with chunky illustration (inline SVG envelope + scribbles) when nothing selected
6. `FeaturesGrid.tsx` — 4 cards (Instant Inbox, Privacy First, Auto Delete, Unlimited Addresses); each card uses a different accent color background for its icon tile
7. `StatsCards.tsx` — 3 oversized stat cards (Emails today, Active inboxes, Domains) with big numbers, colored backgrounds
8. `Footer.tsx` — chunky footer with brand, links, small print

## Mock data
`src/components/tempmail/mock.ts` — array of ~8 emails (sender, avatarColor, subject, preview, body, timestamp, unread), list of 5 domains, stats numbers.

## Interactions
- Buttons: `active:translate-y-[2px] active:shadow-none` press effect
- Cards: `hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#111]` lift, 200ms transition
- Skeleton state on inbox list for ~600ms initial mount
- Sonner toast on copy

## Files touched / created
- Edit: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`
- Add: `src/components/tempmail/{Header,Hero,EmailGenerator,InboxList,EmailViewer,FeaturesGrid,StatsCards,Footer,mock}.tsx`
- Use existing shadcn primitives (`button`, `input`, `select`, `card`); add any missing via the standard shadcn files if needed
- Sonner `<Toaster />` mounted in `__root.tsx`

## Out of scope
Real mailbox, websockets, persistence, auth. Easy to bolt on Lovable Cloud later if you want real inboxes — say the word.
