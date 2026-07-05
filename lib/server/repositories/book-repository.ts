import type { Prisma, PrismaClient } from "@prisma/client";

export function createBookRepository(prisma: PrismaClient) {
  return {
    list() {
      return prisma.wordBook.findMany({
        include: {
          _count: {
            select: {
              items: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },

    create(data: Prisma.WordBookCreateInput) {
      return prisma.wordBook.create({ data });
    },
  };
}
