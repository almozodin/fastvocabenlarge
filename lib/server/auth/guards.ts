import { auth } from "@/auth";
import { forbidden, unauthorized } from "@/lib/server/errors";

export async function requireUser() {
  const session = await auth();

  if (!session?.user?.id) {
    throw unauthorized();
  }

  return session.user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    throw forbidden("Admin access required");
  }

  return user;
}
