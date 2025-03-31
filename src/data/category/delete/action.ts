"use server";

import { apiDelete, Endpoint } from "@/data/apiCRUD";
import { Category, CategoryFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  category: Category,
): Promise<CategoryFormState> {
  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "category"

  try {
    response = await apiDelete(endpoint, userId, category.id.toString());
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
  redirect(`/workspace/${category.workspace}`);
}
