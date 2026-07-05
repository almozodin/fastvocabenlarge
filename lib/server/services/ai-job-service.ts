import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";
import { assertRateLimit } from "@/lib/server/rate-limit";
import { createAiJobRepository } from "@/lib/server/repositories/ai-job-repository";
import type { aiJobCreateSchema } from "@/lib/validators";
import type { z } from "zod";

const aiJobs = createAiJobRepository(prisma);

export function listAiJobs() {
  return aiJobs.list();
}

export function createAiJob(userId: string, input: z.infer<typeof aiJobCreateSchema>) {
  assertRateLimit({
    key: `ai:${userId}`,
    limit: 20,
    windowMs: 60_000,
  });

  return aiJobs.create({
    type: input.type,
    wordId: input.wordId,
    createdById: userId,
    provider: "openai",
    input: input.input as Prisma.InputJsonValue,
  });
}
