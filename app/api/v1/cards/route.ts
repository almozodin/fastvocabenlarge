import type { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/server/auth/guards";
import { withApi } from "@/lib/server/api-handler";
import { parsePagination } from "@/lib/server/pagination";
import { json } from "@/lib/server/response";
import { createCard, listCards } from "@/lib/server/services/word-service";
import { cardCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export const GET = withApi(async (request: NextRequest, context) => {
  const { searchParams } = new URL(request.url);
  const pagination = parsePagination(searchParams);
  const result = await listCards(pagination);

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
  await requireAdmin();
  const body = cardCreateSchema.parse(await request.json());
  const card = await createCard(body);

  return json(card, context, { status: 201 });
});
