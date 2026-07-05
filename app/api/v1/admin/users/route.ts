import type { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/server/auth/guards";
import { withApi } from "@/lib/server/api-handler";
import { json } from "@/lib/server/response";
import { listUsers } from "@/lib/server/services/admin-service";

export const runtime = "nodejs";

export const GET = withApi(async (_request: NextRequest, context) => {
  await requireAdmin();
  const users = await listUsers();

  return json(users, context);
});
