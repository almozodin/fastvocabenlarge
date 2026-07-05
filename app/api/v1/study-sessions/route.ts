import type { NextRequest } from "next/server";

import { requireUser } from "@/lib/server/auth/guards";
import { withApi } from "@/lib/server/api-handler";
import { json } from "@/lib/server/response";
import { createStudySession, listStudySessions } from "@/lib/server/services/study-session-service";

export const runtime = "nodejs";

export const GET = withApi(async (_request: NextRequest, context) => {
  const user = await requireUser();
  const sessions = await listStudySessions(user.id);

  return json(sessions, context);
});

export const POST = withApi(async (_request: NextRequest, context) => {
  const user = await requireUser();
  const session = await createStudySession(user.id);

  return json(session, context, { status: 201 });
});
