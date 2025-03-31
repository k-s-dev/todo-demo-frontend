"use server";

import { apiDelete } from "@/data/apiCRUD";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteWorkspace(
  userId: string,
  workspaceId: string,
  sourcePath?: string,
) {
  await apiDelete("workspace", userId, workspaceId);
  revalidateTag("user-data");
  if (sourcePath) {
    redirect(sourcePath);
  }
}

export async function deleteWorkspaces(
  userId: string,
  workspaceIds: number[],
  sourcePath?: string,
) {
  workspaceIds.forEach(async (workspaceId) => {
    await apiDelete("workspace", userId, workspaceId.toString());
  });
  revalidateTag("user-data");
  if (sourcePath) {
    redirect(sourcePath);
  }
}
