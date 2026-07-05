import { prisma } from "@/lib/db";
import { createBookRepository } from "@/lib/server/repositories/book-repository";
import { createCardRepository } from "@/lib/server/repositories/card-repository";
import { createWordRepository } from "@/lib/server/repositories/word-repository";
import type { cardCreateSchema, wordCreateSchema } from "@/lib/validators";
import type { z } from "zod";

const words = createWordRepository(prisma);
const cards = createCardRepository(prisma);
const books = createBookRepository(prisma);

export async function listWords(input: { query?: string; limit: number; offset: number }) {
  const [items, total] = await Promise.all([words.list(input), words.count({ query: input.query })]);
  return { items, total };
}

export function createWord(input: z.infer<typeof wordCreateSchema> & { createdById: string }) {
  return words.create({
    term: input.term,
    language: input.language,
    phonetic: input.phonetic,
    source: input.source,
    createdBy: {
      connect: {
        id: input.createdById,
      },
    },
  });
}

export async function listCards(input: { limit: number; offset: number }) {
  const [items, total] = await Promise.all([cards.list(input), cards.count()]);
  return { items, total };
}

export function createCard(input: z.infer<typeof cardCreateSchema>) {
  return cards.create(input);
}

export function listWordBooks() {
  return books.list();
}

export function createWordBook(input: {
  title: string;
  slug: string;
  description?: string;
  createdById: string;
}) {
  return books.create({
    title: input.title,
    slug: input.slug,
    description: input.description,
    createdBy: {
      connect: {
        id: input.createdById,
      },
    },
  });
}
