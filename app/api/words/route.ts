import { prisma } from "@/lib/db";
import { created, handleApiError, ok } from "@/lib/http";
import { requireAdmin } from "@/lib/auth/guards";
import { wordCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    const words = await prisma.word.findMany({
      where: query
        ? {
            term: {
              contains: query,
              mode: "insensitive",
            },
          }
        : undefined,
      include: {
        cards: true,
        etymology: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return ok(words);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = wordCreateSchema.parse(await request.json());

    const word = await prisma.word.create({
      data: {
        term: body.term,
        language: body.language,
        phonetic: body.phonetic,
        source: body.source,
        createdById: admin.id,
      },
    });

    return created(word);
  } catch (error) {
    return handleApiError(error);
  }
}
