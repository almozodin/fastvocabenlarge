import type { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/server/auth/guards";
import { withApi } from "@/lib/server/api-handler";
import { json } from "@/lib/server/response";
import { createImportBatch, listImports } from "@/lib/server/services/admin-service";
import { importBatchCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export const GET = withApi(async (_request: NextRequest, context) => {
  await requireAdmin();
  const imports = await listImports();

  return json(imports, context);
});

export const POST = withApi(async (request: NextRequest, context) => {
  const admin = await requireAdmin();
  const body = importBatchCreateSchema.parse(await request.json());
  const batch = await createImportBatch({
    ...body,
    createdById: admin.id,
  });

  return json(batch, context, { status: 201 });
});
