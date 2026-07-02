import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { handleApiError, ok } from "@/lib/http";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdmin();
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            progress: true,
            studySessions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

    return ok(users);
  } catch (error) {
    return handleApiError(error);
  }
}
