import { EmailGenerator } from "./EmailGenerator";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* decorative sticker shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-[-40px] top-24 hidden h-24 w-24 rotate-12 rounded-2xl border-[3px] border-ink bg-brand-pink md:block" />
        <div className="absolute right-10 top-10 hidden h-16 w-16 -rotate-12 rounded-full border-[3px] border-ink bg-brand-green md:block" />
        <div className="absolute right-[12%] bottom-10 hidden h-20 w-20 rotate-6 rounded-2xl border-[3px] border-ink bg-brand-blue md:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="brutal-border inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink brutal-shadow-sm">
            <span className="h-2 w-2 rounded-full bg-ink" />
            No signup. No tracking. No nonsense.
          </span>

          <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
            Temporary Email
            <br />
            <span className="relative inline-block">
              That Just Works
              <span className="absolute inset-x-0 bottom-1 -z-10 h-3 bg-brand-yellow sm:h-4" aria-hidden />
            </span>
            <span className="text-brand-pink">.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Spin up a throwaway inbox in one click. Receive verification codes, ditch spam,
            and protect your real address — all from your browser, no account required.
          </p>
        </div>

        <div id="generator" className="mt-12 sm:mt-16">
          <EmailGenerator />
        </div>
      </div>
    </section>
  );
}
