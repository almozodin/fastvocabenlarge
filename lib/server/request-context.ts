import { headers } from "next/headers";

export type RequestContext = {
  requestId: string;
  ip: string;
  userAgent: string;
  startedAt: number;
};

export async function createRequestContext(request?: Request): Promise<RequestContext> {
  const headerStore = await headers();
  const requestHeaders = request?.headers;
  const requestId =
    requestHeaders?.get("x-request-id") ??
    headerStore.get("x-request-id") ??
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random()}`;

  const forwardedFor = requestHeaders?.get("x-forwarded-for") ?? headerStore.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";
  const userAgent = requestHeaders?.get("user-agent") ?? headerStore.get("user-agent") ?? "unknown";

  return {
    requestId,
    ip,
    userAgent,
    startedAt: Date.now(),
  };
}
