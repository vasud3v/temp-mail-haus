import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/tempmail/Header";
import { Hero } from "@/components/tempmail/Hero";
import { InboxSection } from "@/components/tempmail/InboxSection";
import { FeaturesGrid } from "@/components/tempmail/FeaturesGrid";
import { StatsCards } from "@/components/tempmail/StatsCards";
import { Footer } from "@/components/tempmail/Footer";
import { TempMailProvider } from "@/components/tempmail/TempMailContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tempbox — Temporary Email That Just Works" },
      {
        name: "description",
        content:
          "Free disposable email inbox. No signup. Instant addresses, auto-delete in 24h, total privacy.",
      },
      { property: "og:title", content: "Tempbox — Temporary Email That Just Works" },
      {
        property: "og:description",
        content:
          "Free disposable email inbox. No signup. Instant addresses, auto-delete in 24h, total privacy.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <TempMailProvider>
      <div className="min-h-screen bg-paper text-ink transition-colors">
        <Header />
        <main>
          <Hero />
          <InboxSection />
          <FeaturesGrid />
          <StatsCards />
        </main>
        <Footer />
        <Toaster />
      </div>
    </TempMailProvider>
  );
}
