import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/guards";
import { created, handleApiError, ok } from "@/lib/http";
import { progressUpsertSchema } from "@/lib/validators";

export const runtime = "nodejs";

function nextReviewDate(rating: string) {
  const date = new Date();
  const days =
    rating === "AGAIN" ? 0 : rating === "HARD" ? 1 : rating === "KNOWN" ? 3 : rating === "MASTERED" ? 14 : 0;
  date.setDate(date.getDate() + days);
  return date;
}

export async function GET() {
  try {
    const user = await requireUser();
    const progress = await prisma.userWordProgress.findMany({
      where: {
        userId: user.id,
      },
      include: {
        word: {
          include: {
            cards: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 100,
    });

    return ok(progress);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = progressUpsertSchema.parse(await request.json());

    const progress = await prisma.$transaction(async (tx) => {
      const updatedProgress = await tx.userWordProgress.upsert({
        where: {
          userId_wordId: {
            userId: user.id,
            wordId: body.wordId,
          },
        },
        update: {
          rating: body.rating,
          reviewStatus: body.rating === "MASTERED" ? "MASTERED" : "REVIEWING",
          seenCount: {
            increment: 1,
          },
          correctCount: body.rating === "KNOWN" || body.rating === "MASTERED" ? { increment: 1 } : undefined,
          lastReviewedAt: new Date(),
          nextReviewAt: nextReviewDate(body.rating),
        },
        create: {
          userId: user.id,
          wordId: body.wordId,
          rating: body.rating,
          reviewStatus: body.rating === "MASTERED" ? "MASTERED" : "LEARNING",
          seenCount: 1,
          correctCount: body.rating === "KNOWN" || body.rating === "MASTERED" ? 1 : 0,
          lastReviewedAt: new Date(),
          nextReviewAt: nextReviewDate(body.rating),
        },
      });

      await tx.reviewLog.create({
        data: {
          userId: user.id,
          wordId: body.wordId,
          studySessionId: body.studySessionId,
          rating: body.rating,
          responseMs: body.responseMs,
        },
      });

      return updatedProgress;
    });

    return created(progress);
  } catch (error) {
    return handleApiError(error);
  }
}
