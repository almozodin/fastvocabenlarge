import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/guards";
import { created, handleApiError, ok } from "@/lib/http";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    const sessions = await prisma.studySession.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        startedAt: "desc",
      },
      take: 30,
    });

    return ok(sessions);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST() {
  try {
    const user = await requireUser();
    const session = await prisma.studySession.create({
      data: {
        userId: user.id,
      },
    });

    return created(session);
  } catch (error) {
    return handleApiError(error);
  }
}
