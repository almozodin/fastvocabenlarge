import { AppCard } from "@/components/app-card";

export default function SettingsPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Account</p>
      <h1>Settings</h1>
      <div className="app-grid">
        <AppCard title="Profile" description="Reserved for account settings after auth is configured." />
        <AppCard title="Learning preferences" description="Reserved for daily goal and review settings." />
        <AppCard title="Integrations" description="Reserved for AI and content provider settings." />
      </div>
    </main>
  );
}
