import type { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/server/auth/guards";
import { withApi } from "@/lib/server/api-handler";
import { parsePagination } from "@/lib/server/pagination";
import { json } from "@/lib/server/response";
import { createWord, listWords } from "@/lib/server/services/word-service";
import { wordCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export const GET = withApi(async (request: NextRequest, context) => {
  const { searchParams } = new URL(request.url);
  const pagination = parsePagination(searchParams);
  const result = await listWords({
    query: searchParams.get("q")?.trim() || undefined,
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
  const admin = await requireAdmin();
  const body = wordCreateSchema.parse(await request.json());
  const word = await createWord({
    ...body,
    createdById: admin.id,
  });

  return json(word, context, { status: 201 });
});
