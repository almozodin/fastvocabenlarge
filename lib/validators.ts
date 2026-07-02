import { z } from "zod";

export const wordCreateSchema = z.object({
  term: z.string().trim().min(1).max(120),
  language: z.string().trim().min(2).max(12).default("en"),
  phonetic: z.string().trim().max(160).optional(),
  source: z.string().trim().max(240).optional(),
});

export const cardCreateSchema = z.object({
  wordId: z.string().trim().min(1),
  meaning: z.string().trim().max(1000).optional(),
  example: z.string().trim().max(1000).optional(),
  etymologySummary: z.string().trim().max(2000).optional(),
  aiNote: z.string().trim().max(3000).optional(),
});

export const progressUpsertSchema = z.object({
  wordId: z.string().trim().min(1),
  rating: z.enum(["UNKNOWN", "AGAIN", "HARD", "KNOWN", "MASTERED"]),
  responseMs: z.number().int().positive().max(120000).optional(),
  studySessionId: z.string().trim().min(1).optional(),
});

export const aiJobCreateSchema = z.object({
  type: z.enum(["WORD_CARD", "ETYMOLOGY", "EXAMPLE_SENTENCE", "MEMORY_HOOK"]),
  wordId: z.string().trim().min(1).optional(),
  input: z.record(z.string(), z.unknown()).default({}),
});
