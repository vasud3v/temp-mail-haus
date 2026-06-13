import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/tempmail/Header";
import { Hero } from "@/components/tempmail/Hero";
import { InboxSection } from "@/components/tempmail/InboxSection";
import { HowItWorks, Privacy, FAQ } from "@/components/tempmail/InfoSections";
import { Footer } from "@/components/tempmail/Footer";
import { TempMailProvider } from "@/components/tempmail/TempMailContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tempbox — Disposable email, handled with care" },
      {
        name: "description",
        content:
          "Generate a private temporary email in one click. Receive verification codes and signup mail without exposing your real address. Auto-deletes in 24h.",
      },
      { property: "og:title", content: "Tempbox — Disposable email, handled with care" },
      {
        property: "og:description",
        content:
          "Private, disposable inboxes with zero retention. No signup, no tracking.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <TempMailProvider>
      <div className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <main>
          <Hero />
          <InboxSection />
          <HowItWorks />
          <Privacy />
          <FAQ />
        </main>
        <Footer />
        <Toaster />
      </div>
    </TempMailProvider>
  );
}
