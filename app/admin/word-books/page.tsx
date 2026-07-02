import { AppCard } from "@/components/app-card";

export default function AdminWordBooksPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Admin</p>
      <h1>Word books</h1>
      <div className="app-grid">
        <AppCard title="Collections" description="Backed by `/api/word-books`." />
        <AppCard title="Ordering" description="Word book items preserve card sequence." />
      </div>
    </main>
  );
}
