import type { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/server/auth/guards";
import { withApi } from "@/lib/server/api-handler";
import { json } from "@/lib/server/response";
import { createAiJob, listAiJobs } from "@/lib/server/services/ai-job-service";
import { aiJobCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export const GET = withApi(async (_request: NextRequest, context) => {
  await requireAdmin();
  const jobs = await listAiJobs();

  return json(jobs, context);
});

export const POST = withApi(async (request: NextRequest, context) => {
  const admin = await requireAdmin();
  const body = aiJobCreateSchema.parse(await request.json());
  const job = await createAiJob(admin.id, body);

  return json(job, context, { status: 201 });
});
