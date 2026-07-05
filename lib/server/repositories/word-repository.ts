import type { Prisma, PrismaClient } from "@prisma/client";

export type ListWordsInput = {
  query?: string;
  limit: number;
  offset: number;
};

export function createWordRepository(prisma: PrismaClient) {
  return {
    list({ query, limit, offset }: ListWordsInput) {
      return prisma.word.findMany({
        where: query
          ? {
              term: {
                contains: query,
                mode: "insensitive",
              },
            }
          : undefined,
        include: {
          cards: true,
          etymology: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: offset,
      });
    },

    count({ query }: Pick<ListWordsInput, "query">) {
      return prisma.word.count({
        where: query
          ? {
              term: {
                contains: query,
                mode: "insensitive",
              },
            }
          : undefined,
      });
    },

    create(data: Prisma.WordCreateInput) {
      return prisma.word.create({ data });
    },
  };
}
