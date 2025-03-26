"use server";

import { apiDelete, Endpoint } from "@/data/apiCRUD";
import { Priority, PriorityFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  priority: Priority,
): Promise<PriorityFormState> {
  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "priority"

  try {
    response = await apiDelete(endpoint, userId, priority.id.toString());
  } catch (error) { // eslint-disable-line
    return {
      message: `Server error: failed to delete resource.`,
    };
  }

  // handle fetch failed responses
  if (!response.ok) {
    return {
      message: `Server error: failed to delete resource.`,
    };
  }

  // revalidate and redirect
  revalidateTag("user-data");
  redirect(`/workspace/${priority.workspace}`);
}
