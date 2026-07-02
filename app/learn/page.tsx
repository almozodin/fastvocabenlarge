import { FuturePanel } from "@/components/future-panel";
import { WordCardWorkspace } from "@/components/word-card-workspace";
import { wordCards } from "@/lib/word-cards";

export default function LearnPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Learning</p>
      <h1>Learn</h1>
      <section className="workspace" aria-label="Word card workspace">
        <WordCardWorkspace cards={wordCards} />
        <FuturePanel />
      </section>
    </main>
  );
}
