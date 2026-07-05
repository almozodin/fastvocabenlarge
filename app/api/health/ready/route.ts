import type { NextRequest } from "next/server";

import { prisma } from "@/lib/db";
import { withApi } from "@/lib/server/api-handler";
import { hasDatabaseUrl } from "@/lib/server/config/env";
import { serviceUnavailable } from "@/lib/server/errors";
import { json } from "@/lib/server/response";

export const runtime = "nodejs";

export const GET = withApi(async (_request: NextRequest, context) => {
  if (!hasDatabaseUrl()) {
    throw serviceUnavailable("DATABASE_URL is not configured");
  }

  await prisma.$queryRaw`SELECT 1`;

  return json(
    {
      status: "ok",
      service: "fastvocabenlarge",
      check: "ready",
      dependencies: {
        database: "ok",
      },
      timestamp: new Date().toISOString(),
    },
    context,
  );
});
