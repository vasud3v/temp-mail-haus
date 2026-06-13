export function Footer() {
  return (
    <footer className="border-t border-line bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-ship text-paper">
                <span className="font-serif text-base leading-none">t</span>
              </span>
              <span className="font-serif text-xl tracking-tight text-foreground">
                tempbox<span className="text-passion">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
              A quiet, well-mannered throwaway inbox. No accounts, no tracking,
              no surprise mail at 3am.
            </p>
          </div>

          <FooterCol title="Product" links={["Inbox", "Domains", "API", "Changelog"]} />
          <FooterCol title="Company" links={["About", "Privacy", "Terms", "Contact"]} />
          <FooterCol title="Status"  links={["Uptime", "Roadmap", "Security", "Blog"]} />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Tempbox — Designed with restraint.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-passion" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-[13px] text-foreground/80 transition-colors hover:text-passion">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
