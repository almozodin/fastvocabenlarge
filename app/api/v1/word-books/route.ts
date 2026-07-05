import type { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/server/auth/guards";
import { withApi } from "@/lib/server/api-handler";
import { json } from "@/lib/server/response";
import { createWordBook, listWordBooks } from "@/lib/server/services/word-service";
import { wordBookCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export const GET = withApi(async (_request: NextRequest, context) => {
  const books = await listWordBooks();
  return json(books, context);
});

export const POST = withApi(async (request: NextRequest, context) => {
  const admin = await requireAdmin();
  const body = wordBookCreateSchema.parse(await request.json());
  const book = await createWordBook({
    ...body,
    createdById: admin.id,
  });

  return json(book, context, { status: 201 });
});
