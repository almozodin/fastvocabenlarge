import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { checkRateLimit } from "@/lib/rate-limit";
import { created, handleApiError, ok } from "@/lib/http";
import { aiJobCreateSchema } from "@/lib/validators";
import type { Prisma } from "@prisma/client";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdmin();
    const jobs = await prisma.aiGenerationJob.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return ok(jobs);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    checkRateLimit({
      key: `ai:${admin.id}`,
      limit: 20,
      windowMs: 60_000,
    });

    const body = aiJobCreateSchema.parse(await request.json());

    const job = await prisma.aiGenerationJob.create({
      data: {
        type: body.type,
        wordId: body.wordId,
        createdById: admin.id,
        provider: "openai",
        input: body.input as Prisma.InputJsonValue,
      },
    });

    return created(job);
  } catch (error) {
    return handleApiError(error);
  }
}
