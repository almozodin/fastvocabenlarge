import { AppCard } from "@/components/app-card";

export default function AdminWordsPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Admin</p>
      <h1>Words</h1>
      <div className="app-grid">
        <AppCard title="Canonical records" description="Backed by `/api/words`." />
        <AppCard title="Cards" description="Backed by `/api/cards`." />
      </div>
    </main>
  );
}
