import type { Prisma, PrismaClient } from "@prisma/client";

export function createCardRepository(prisma: PrismaClient) {
  return {
    list({ limit, offset }: { limit: number; offset: number }) {
      return prisma.wordCard.findMany({
        include: {
          word: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: offset,
      });
    },

    count() {
      return prisma.wordCard.count();
    },

    create(data: Prisma.WordCardUncheckedCreateInput) {
      return prisma.wordCard.create({ data });
    },
  };
}
