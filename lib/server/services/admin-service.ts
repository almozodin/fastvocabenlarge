import { prisma } from "@/lib/db";
import { createAdminRepository } from "@/lib/server/repositories/admin-repository";

const admin = createAdminRepository(prisma);

export function listUsers() {
  return admin.listUsers();
}

export function listImports() {
  return admin.listImports();
}

export function createImportBatch(input: { label: string; source?: string; createdById: string }) {
  return admin.createImport({
    label: input.label,
    source: input.source,
    createdBy: {
      connect: {
        id: input.createdById,
      },
    },
  });
}
