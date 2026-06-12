import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <span className="brutal-border brutal-shadow-sm flex h-10 w-10 items-center justify-center rounded-xl bg-brand-yellow">
                <Mail className="h-5 w-5 text-ink" strokeWidth={2.75} />
              </span>
              <span className="text-xl font-black tracking-tight text-ink">Tempbox</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A friendlier throwaway inbox. No account, no tracking, no spam coming back to bite you.
            </p>
          </div>

          <FooterCol title="Product" links={["Inbox", "Domains", "Pricing", "Changelog"]} />
          <FooterCol title="Company" links={["About", "Privacy", "Terms", "Contact"]} />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t-[3px] border-ink pt-6 sm:flex-row sm:items-center">
          <p className="text-xs font-semibold text-muted-foreground">
            © {new Date().getFullYear()} Tempbox. Made with too much coffee.
          </p>
          <div className="flex items-center gap-2">
            <span className="brutal-border rounded-full bg-brand-green px-2.5 py-0.5 text-[11px] font-bold text-ink">
              status: all systems chunky
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-ink">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm font-semibold text-muted-foreground hover:text-ink hover:underline underline-offset-4 decoration-[3px]">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
