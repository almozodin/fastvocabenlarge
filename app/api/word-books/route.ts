import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { HttpError, created, handleApiError, ok } from "@/lib/http";

export const runtime = "nodejs";

export async function GET() {
  try {
    const books = await prisma.wordBook.findMany({
      include: {
        _count: {
          select: {
            items: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return ok(books);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = (await request.json()) as {
      title?: string;
      slug?: string;
      description?: string;
    };

    if (!body.title || !body.slug) {
      throw new HttpError(400, "Missing title or slug");
    }

    const book = await prisma.wordBook.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        createdById: admin.id,
      },
    });

    return created(book);
  } catch (error) {
    return handleApiError(error);
  }
}
