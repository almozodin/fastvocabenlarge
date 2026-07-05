import type { Prisma, PrismaClient } from "@prisma/client";

export function createAiJobRepository(prisma: PrismaClient) {
  return {
    list() {
      return prisma.aiGenerationJob.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 50,
      });
    },

    create(data: Prisma.AiGenerationJobUncheckedCreateInput) {
      return prisma.aiGenerationJob.create({ data });
    },
  };
}
