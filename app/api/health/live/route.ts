import type { NextRequest } from "next/server";

import { withApi } from "@/lib/server/api-handler";
import { json } from "@/lib/server/response";

export const runtime = "nodejs";

export const GET = withApi(async (_request: NextRequest, context) => {
  return json(
    {
      status: "ok",
      service: "fastvocabenlarge",
      check: "live",
      timestamp: new Date().toISOString(),
    },
    context,
  );
});
