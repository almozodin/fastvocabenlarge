import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { created, handleApiError, ok } from "@/lib/http";
import { cardCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cards = await prisma.wordCard.findMany({
      include: {
        word: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return ok(cards);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = cardCreateSchema.parse(await request.json());

    const card = await prisma.wordCard.create({
      data: body,
    });

    return created(card);
  } catch (error) {
    return handleApiError(error);
  }
}
