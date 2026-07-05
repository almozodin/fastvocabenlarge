import type { Prisma, PrismaClient } from "@prisma/client";

export function createAdminRepository(prisma: PrismaClient) {
  return {
    listUsers() {
      return prisma.user.findMany({
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
    },

    listImports() {
      return prisma.importBatch.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 50,
      });
    },

    createImport(data: Prisma.ImportBatchCreateInput) {
      return prisma.importBatch.create({ data });
    },
  };
}
