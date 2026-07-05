import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { ApiError } from "@/lib/server/errors";
import type { RequestContext } from "@/lib/server/request-context";

type Meta = {
  requestId: string;
  durationMs?: number;
  pagination?: {
    limit: number;
    offset: number;
    total?: number;
  };
};

export function json<T>(data: T, context: RequestContext, init?: ResponseInit & { meta?: Partial<Meta> }) {
  const durationMs = Date.now() - context.startedAt;
  const response = NextResponse.json(
    {
      data,
      meta: {
        requestId: context.requestId,
        durationMs,
        ...init?.meta,
      },
    },
    init,
  );

  response.headers.set("x-request-id", context.requestId);
  response.headers.set("cache-control", "no-store");
  return response;
}

export function errorJson(error: unknown, context: RequestContext) {
  const durationMs = Date.now() - context.startedAt;

  if (error instanceof ApiError) {
    const response = NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
        meta: {
          requestId: context.requestId,
          durationMs,
        },
      },
      { status: error.status },
    );
    response.headers.set("x-request-id", context.requestId);
    response.headers.set("cache-control", "no-store");
    return response;
  }

  if (error instanceof ZodError) {
    const response = NextResponse.json(
      {
        error: {
          code: "BAD_REQUEST",
          message: "Invalid request",
          details: error.flatten(),
        },
        meta: {
          requestId: context.requestId,
          durationMs,
        },
      },
      { status: 400 },
    );
    response.headers.set("x-request-id", context.requestId);
    response.headers.set("cache-control", "no-store");
    return response;
  }

  console.error({ requestId: context.requestId, error });

  const response = NextResponse.json(
    {
      error: {
        code: "INTERNAL_ERROR",
        message: "Internal server error",
      },
      meta: {
        requestId: context.requestId,
        durationMs,
      },
    },
    { status: 500 },
  );
  response.headers.set("x-request-id", context.requestId);
  response.headers.set("cache-control", "no-store");
  return response;
}
