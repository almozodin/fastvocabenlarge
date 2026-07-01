import { FuturePanel } from "@/components/future-panel";
import { HeroSection } from "@/components/hero-section";
import { SiteHeader } from "@/components/site-header";
import { WordCardWorkspace } from "@/components/word-card-workspace";
import { wordCards } from "@/lib/word-cards";

export default function Home() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main>
        <HeroSection />
        <section className="workspace" aria-label="Word card workspace">
          <WordCardWorkspace cards={wordCards} />
          <FuturePanel />
        </section>
      </main>
    </div>
  );
}
