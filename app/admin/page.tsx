import { AppCard } from "@/components/app-card";

export default function AdminPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Admin</p>
      <h1>Control room</h1>
      <div className="app-grid">
        <AppCard title="Words" description="Create, review, and publish canonical words." href="/admin/words" />
        <AppCard title="Word books" description="Manage course-like collections." href="/admin/word-books" />
        <AppCard title="AI jobs" description="Queue and inspect AI generation jobs." href="/admin/ai-jobs" />
        <AppCard title="Imports" description="Track file and batch imports." href="/admin/imports" />
        <AppCard title="Users" description="Inspect users, roles, and learning activity." href="/admin/users" />
      </div>
    </main>
  );
}
