import { AppCard } from "@/components/app-card";

export default function AdminUsersPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Admin</p>
      <h1>Users</h1>
      <div className="app-grid">
        <AppCard title="User list" description="Backed by `/api/admin/users`." />
        <AppCard title="Roles" description="Supports USER, ADMIN, and SUPER_ADMIN." />
      </div>
    </main>
  );
}
