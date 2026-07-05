import type { NextRequest } from "next/server";

import { createRequestContext } from "@/lib/server/request-context";
import { errorJson } from "@/lib/server/response";

type ApiHandler = (request: NextRequest, context: Awaited<ReturnType<typeof createRequestContext>>) => Promise<Response>;

export function withApi(handler: ApiHandler) {
  return async function apiRoute(request: NextRequest) {
    const context = await createRequestContext(request);

    try {
      return await handler(request, context);
    } catch (error) {
      return errorJson(error, context);
    }
  };
}
