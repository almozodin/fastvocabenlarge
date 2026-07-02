import { signIn } from "@/auth";

export default function SignInPage() {
  return (
    <main className="app-shell page-shell">
      <p className="eyebrow">Authentication</p>
      <h1>Sign in</h1>
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <button className="response primary" type="submit">
          Continue with GitHub
        </button>
      </form>
    </main>
  );
}
