import { AppCard } from "@/components/app-card";

export default function AdminAiJobsPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Admin</p>
      <h1>AI jobs</h1>
      <div className="app-grid">
        <AppCard title="Generation queue" description="Backed by `/api/ai/jobs`." />
        <AppCard title="Provider boundary" description="OpenAI calls stay server-side." />
      </div>
    </main>
  );
}
