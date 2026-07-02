import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { created, handleApiError, ok } from "@/lib/http";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdmin();
    const imports = await prisma.importBatch.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return ok(imports);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = (await request.json()) as {
      label?: string;
      source?: string;
    };

    const batch = await prisma.importBatch.create({
      data: {
        label: body.label ?? "Untitled import",
        source: body.source,
        createdById: admin.id,
      },
    });

    return created(batch);
  } catch (error) {
    return handleApiError(error);
  }
}
