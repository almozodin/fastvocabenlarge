import type { NextRequest } from "next/server";

import { requireUser } from "@/lib/server/auth/guards";
import { withApi } from "@/lib/server/api-handler";
import { parsePagination } from "@/lib/server/pagination";
import { json } from "@/lib/server/response";
import { listProgress, recordProgress } from "@/lib/server/services/progress-service";
import { progressUpsertSchema } from "@/lib/validators";

export const runtime = "nodejs";

export const GET = withApi(async (request: NextRequest, context) => {
  const user = await requireUser();
  const { searchParams } = new URL(request.url);
  const pagination = parsePagination(searchParams);
  const result = await listProgress({
    userId: user.id,
    ...pagination,
  });

  return json(result.items, context, {
    meta: {
      pagination: {
        ...pagination,
        total: result.total,
      },
    },
  });
});

export const POST = withApi(async (request: NextRequest, context) => {
  const user = await requireUser();
  const body = progressUpsertSchema.parse(await request.json());
  const progress = await recordProgress(user.id, body);

  return json(progress, context, { status: 201 });
});
