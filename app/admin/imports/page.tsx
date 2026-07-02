import { AppCard } from "@/components/app-card";

export default function AdminImportsPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Admin</p>
      <h1>Imports</h1>
      <div className="app-grid">
        <AppCard title="Import batches" description="Backed by `/api/admin/imports`." />
        <AppCard title="Review workflow" description="Imported words can stay draft until approved." />
      </div>
    </main>
  );
}
