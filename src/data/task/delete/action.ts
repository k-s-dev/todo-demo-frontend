"use server";

import { apiDelete, Endpoint } from "@/data/apiCRUD";
import { Task, TaskFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  task: Task,
): Promise<TaskFormState> {
  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "task"

  try {
    response = await apiDelete(endpoint, userId, task.id.toString());
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
