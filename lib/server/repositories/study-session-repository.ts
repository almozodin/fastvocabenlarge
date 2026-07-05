import type { PrismaClient } from "@prisma/client";

export function createStudySessionRepository(prisma: PrismaClient) {
  return {
    listForUser(userId: string) {
      return prisma.studySession.findMany({
        where: {
          userId,
        },
        orderBy: {
          startedAt: "desc",
        },
        take: 30,
      });
    },

    create(userId: string) {
      return prisma.studySession.create({
        data: {
          userId,
        },
      });
    },
  };
}
