import { AppCard } from "@/components/app-card";

export default function ProgressPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Learning data</p>
      <h1>Progress</h1>
      <div className="app-grid">
        <AppCard title="Review queue" description="Tracks what should be reviewed next." />
        <AppCard title="Study sessions" description="Stores each learning session and responses." />
        <AppCard title="Word status" description="Separates new, learning, reviewing, and mastered words." />
      </div>
    </main>
  );
}
