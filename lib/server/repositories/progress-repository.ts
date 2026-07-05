import type { FamiliarityRating, PrismaClient, ReviewStatus } from "@prisma/client";

export type ProgressUpdateInput = {
  userId: string;
  wordId: string;
  rating: FamiliarityRating;
  reviewStatus: ReviewStatus;
  correctIncrement: number;
  nextReviewAt: Date;
  responseMs?: number;
  studySessionId?: string;
};

export function createProgressRepository(prisma: PrismaClient) {
  return {
    listForUser({ userId, limit, offset }: { userId: string; limit: number; offset: number }) {
      return prisma.userWordProgress.findMany({
        where: {
          userId,
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
        take: limit,
        skip: offset,
      });
    },

    countForUser(userId: string) {
      return prisma.userWordProgress.count({
        where: {
          userId,
        },
      });
    },

    recordReview(input: ProgressUpdateInput) {
      return prisma.$transaction(async (tx) => {
        const progress = await tx.userWordProgress.upsert({
          where: {
            userId_wordId: {
              userId: input.userId,
              wordId: input.wordId,
            },
          },
          update: {
            rating: input.rating,
            reviewStatus: input.reviewStatus,
            seenCount: {
              increment: 1,
            },
            correctCount:
              input.correctIncrement > 0
                ? {
                    increment: input.correctIncrement,
                  }
                : undefined,
            lastReviewedAt: new Date(),
            nextReviewAt: input.nextReviewAt,
          },
          create: {
            userId: input.userId,
            wordId: input.wordId,
            rating: input.rating,
            reviewStatus: input.reviewStatus,
            seenCount: 1,
            correctCount: input.correctIncrement,
            lastReviewedAt: new Date(),
            nextReviewAt: input.nextReviewAt,
          },
        });

        await tx.reviewLog.create({
          data: {
            userId: input.userId,
            wordId: input.wordId,
            studySessionId: input.studySessionId,
            rating: input.rating,
            responseMs: input.responseMs,
          },
        });

        return progress;
      });
    },
  };
}
