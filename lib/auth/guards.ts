import { auth } from "@/auth";
import { HttpError } from "@/lib/http";

export async function requireUser() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new HttpError(401, "Authentication required");
  }

  return session.user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    throw new HttpError(403, "Admin access required");
  }

  return user;
}
