import type { FamiliarityRating, ReviewStatus } from "@prisma/client";

import { prisma } from "@/lib/db";
import { createProgressRepository } from "@/lib/server/repositories/progress-repository";
import type { progressUpsertSchema } from "@/lib/validators";
import type { z } from "zod";

const progress = createProgressRepository(prisma);

function nextReviewDate(rating: FamiliarityRating) {
  const date = new Date();
  const days =
    rating === "AGAIN" ? 0 : rating === "HARD" ? 1 : rating === "KNOWN" ? 3 : rating === "MASTERED" ? 14 : 0;
  date.setDate(date.getDate() + days);
  return date;
}

function reviewStatusFor(rating: FamiliarityRating): ReviewStatus {
  if (rating === "MASTERED") {
    return "MASTERED";
  }

  if (rating === "UNKNOWN") {
    return "NEW";
  }

  return "REVIEWING";
}

function correctIncrementFor(rating: FamiliarityRating) {
  return rating === "KNOWN" || rating === "MASTERED" ? 1 : 0;
}

export async function listProgress(input: { userId: string; limit: number; offset: number }) {
  const [items, total] = await Promise.all([progress.listForUser(input), progress.countForUser(input.userId)]);
  return { items, total };
}

export function recordProgress(userId: string, input: z.infer<typeof progressUpsertSchema>) {
  return progress.recordReview({
    userId,
    wordId: input.wordId,
    rating: input.rating,
    reviewStatus: reviewStatusFor(input.rating),
    correctIncrement: correctIncrementFor(input.rating),
    nextReviewAt: nextReviewDate(input.rating),
    responseMs: input.responseMs,
    studySessionId: input.studySessionId,
  });
}
