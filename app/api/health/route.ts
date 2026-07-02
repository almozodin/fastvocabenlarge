import { ok } from "@/lib/http";

export const runtime = "nodejs";

export function GET() {
  return ok({
    status: "ok",
    service: "fastvocabenlarge",
    timestamp: new Date().toISOString(),
  });
}
