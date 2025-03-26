"use server";

import { apiDelete, Endpoint } from "@/data/apiCRUD";
import { Tag, TagFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  tag: Tag,
): Promise<TagFormState> {
  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "tag"

  try {
    response = await apiDelete(endpoint, userId, tag.id.toString());
  } catch (error) {
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
  redirect(`/workspace/${tag.workspace}`);
}
