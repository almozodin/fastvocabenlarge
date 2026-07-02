import { AppCard } from "@/components/app-card";

export default function LibraryPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Content system</p>
      <h1>Library</h1>
      <div className="app-grid">
        <AppCard title="Words" description="Canonical word records live here." />
        <AppCard title="Cards" description="Learner-facing cards are generated from words." />
        <AppCard title="Word books" description="Group cards into books, courses, or import batches." />
      </div>
    </main>
  );
}
