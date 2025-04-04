"use server";

import { apiDelete, Endpoint } from "@/data/apiCRUD";
import { Status, StatusFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  status: Status,
): Promise<StatusFormState> {
  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "status"

  try {
    response = await apiDelete(endpoint, userId, status.id.toString());
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
  redirect(`/workspace/${status.workspace}`);
}
