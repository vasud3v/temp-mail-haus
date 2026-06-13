export type Attachment = {
  name: string;
  size: string;
  mime: string;
};

export type MockEmail = {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: Date;
  unread: boolean;
  starred?: boolean;
  spam?: boolean;
  attachments?: Attachment[];
};

export const DOMAINS = [
  "tempbox.io",
  "throwmail.dev",
  "burnerly.cc",
  "ghostinbox.app",
  "maskmail.xyz",
];

const now = Date.now();
const minutes = (m: number) => new Date(now - m * 60_000);

export const MOCK_EMAILS: MockEmail[] = [
  {
    id: "1",
    sender: "GitHub",
    senderEmail: "noreply@github.com",
    subject: "Verify your new sign-in",
    preview: "We noticed a new sign-in to your account from a new device.",
    body: "Hi there,\n\nWe noticed a new sign-in to your GitHub account from a new device. If this was you, no action is needed. If you don't recognize this activity, please secure your account immediately.\n\nDevice: MacBook Pro\nLocation: Berlin, DE\n\n— The GitHub Team",
    receivedAt: minutes(2),
    unread: true,
  },
  {
    id: "2",
    sender: "Figma",
    senderEmail: "team@figma.com",
    subject: "Your weekly design digest is here",
    preview: "Catch up on the top files, plugins, and community picks of the week.",
    body: "This week in Figma:\n\n• 12 new community templates\n• 4 plugins worth trying\n• Notes on editorial typography\n\nOpen Figma to dive in.",
    receivedAt: minutes(18),
    unread: true,
    starred: true,
    attachments: [
      { name: "weekly-digest.pdf", size: "412 KB", mime: "application/pdf" },
    ],
  },
  {
    id: "3",
    sender: "Stripe",
    senderEmail: "receipts@stripe.com",
    subject: "Receipt from Acme Coffee — $4.20",
    preview: "Thanks for your purchase. Your receipt is attached below.",
    body: "Acme Coffee\nOrder #A1029\n\n1x Flat White — $4.20\n\nPaid with •••• 4242\nThanks for stopping by!",
    receivedAt: minutes(47),
    unread: false,
    attachments: [{ name: "receipt-A1029.pdf", size: "36 KB", mime: "application/pdf" }],
  },
  {
    id: "4",
    sender: "Notion",
    senderEmail: "no-reply@notion.so",
    subject: "You've been invited to 'Q3 Roadmap'",
    preview: "Alex shared a workspace with you. Tap to accept the invite.",
    body: "Alex Rivera invited you to collaborate on 'Q3 Roadmap'.\n\nAccept the invitation to start editing together.",
    receivedAt: minutes(120),
    unread: false,
  },
  {
    id: "5",
    sender: "Linear",
    senderEmail: "updates@linear.app",
    subject: "3 new issues assigned to you",
    preview: "ENG-204, ENG-217 and DES-88 were assigned to you this morning.",
    body: "Your queue:\n\n• ENG-204 — Fix flaky inbox poll\n• ENG-217 — Tighten auth middleware\n• DES-88 — Polish empty state\n\nHead to Linear to triage.",
    receivedAt: minutes(220),
    unread: false,
  },
  {
    id: "6",
    sender: "Vercel",
    senderEmail: "noreply@vercel.com",
    subject: "Deployment ready: tempbox-web",
    preview: "Production deployment finished in 38s. Preview URL inside.",
    body: "tempbox-web → Production\n\nBuild: success in 38s\nCommit: chore: refine surfaces\n\nOpen the dashboard for logs.",
    receivedAt: minutes(360),
    unread: false,
  },
  {
    id: "7",
    sender: "Hacker News",
    senderEmail: "digest@hn.dev",
    subject: "Top stories — editorial design returns",
    preview: "Long-form layouts and serif headlines top the front page.",
    body: "Today on HN:\n\n1. Editorial design returns (412)\n2. Show HN: a tiny mail server (188)\n3. Why your inbox is full (96)\n\nSee full digest online.",
    receivedAt: minutes(720),
    unread: false,
  },
];

export function randomLocalPart(): string {
  const a = ["fuzzy","brisk","quiet","lucky","swift","calm","bold","tiny","mellow","sharp"];
  const n = ["otter","comet","ember","pixel","fern","panda","quartz","robin","yeti","heron"];
  const p = a[Math.floor(Math.random()*a.length)];
  const q = n[Math.floor(Math.random()*n.length)];
  const num = Math.floor(Math.random() * 9000 + 1000);
  return `${p}.${q}${num}`;
}

const SENDERS = [
  { sender: "Slack",   senderEmail: "notify@slack.com" },
  { sender: "Dropbox", senderEmail: "no-reply@dropbox.com" },
  { sender: "Apple",   senderEmail: "appleid@id.apple.com" },
  { sender: "Discord", senderEmail: "noreply@discord.com" },
  { sender: "X",       senderEmail: "info@x.com" },
];
const SUBJECTS = [
  "Your one-time code: 482910",
  "New device signed in",
  "Welcome aboard",
  "Confirm your email to continue",
  "Action required: verify your account",
];

export function makeRandomEmail(): MockEmail {
  const s = SENDERS[Math.floor(Math.random()*SENDERS.length)];
  const subject = SUBJECTS[Math.floor(Math.random()*SUBJECTS.length)];
  return {
    id: crypto.randomUUID(),
    ...s,
    subject,
    preview: subject,
    body: `${subject}\n\nThis is an automated message delivered to your temporary inbox.`,
    receivedAt: new Date(),
    unread: true,
  };
}

export function relativeTime(date: Date): string {
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export function senderInitials(name: string): string {
  return name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
