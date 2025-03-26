"use server";

import { apiDelete, Endpoint } from "@/data/apiCRUD";
import { Project, ProjectFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  project: Project,
): Promise<ProjectFormState> {
  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "project"

  try {
    response = await apiDelete(endpoint, userId, project.id.toString());
  } catch (error) {
    return {
      data: {},
      message: `Server error: failed to delete resource.`,
    };
  }

  // handle fetch failed responses
  if (!response.ok) {
    return {
      data: {},
      message: `Server error: failed to delete resource.`,
    };
  }

  // revalidate and redirect
  revalidateTag("user-data");
  redirect(`/dashboard`);
}
