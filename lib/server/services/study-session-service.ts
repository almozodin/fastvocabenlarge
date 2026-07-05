import { prisma } from "@/lib/db";
import { createStudySessionRepository } from "@/lib/server/repositories/study-session-repository";

const sessions = createStudySessionRepository(prisma);

export function listStudySessions(userId: string) {
  return sessions.listForUser(userId);
}

export function createStudySession(userId: string) {
  return sessions.create(userId);
}
