"use server";

import { apiDelete, Endpoint } from "@/data/apiCRUD";
import {
  Workspace,
  WorkspaceFormState,
} from "../definitions";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  workspace: Workspace,
): Promise<WorkspaceFormState> {

  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "workspace"

  try {
    response = await apiDelete(
      endpoint,
      userId,
      workspace.id.toString(),
    );
  } catch (error) {
    return {
      message: `Server error: failed to delete workspace.`,
    };
  }

  // handle fetch failed responses
  if (!response.ok) {
    return {
      message: `Server error: failed to delete workspace.`,
    };
  }

  // revalidate and redirect
  revalidateTag("user-data")
  redirect(`/workspace`);
}
