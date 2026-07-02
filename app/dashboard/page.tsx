import { AppCard } from "@/components/app-card";

export default function DashboardPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Workspace</p>
      <h1>Dashboard</h1>
      <div className="app-grid">
        <AppCard title="Learn" description="Start the word-card flow." href="/learn" />
        <AppCard title="Library" description="Browse books, words, and prepared cards." href="/library" />
        <AppCard title="Progress" description="Review study sessions and learning state." href="/progress" />
        <AppCard title="Settings" description="Manage account and future learning preferences." href="/settings" />
      </div>
    </main>
  );
}
