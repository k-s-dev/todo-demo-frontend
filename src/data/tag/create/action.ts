"use server";

import { apiCreate, Endpoint } from "@/data/apiCRUD";
import { TagFormSchema, TagFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  workspaceId: number,
  prevState: TagFormState | null,
  formData: FormData,
): Promise<TagFormState> {
  // retreive data
  const rawFormData = Object.fromEntries(formData);
  const stateFormData = {
    ...rawFormData,
    workspace: workspaceId,
  };
  // Validate form (using Zod)
  const validatedFormData = TagFormSchema.safeParse(stateFormData);

  // handle zod validation errors
  if (!validatedFormData.success) {
    return {
      data: stateFormData,
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Failed to Create Category due to field errors.",
    };
  }

  // prepare form data for submission to backend
  const apiSubmissionData = {
    ...validatedFormData.data,
    workspace: workspaceId,
  };

  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "tag"

  try {
    response = await apiCreate(endpoint, userId, apiSubmissionData);
  } catch (error) { // eslint-disable-line
    return {
      data: stateFormData,
      message: `Server error: failed to create workspace.`,
    };
  }

  // handle fetch failed responses
  if (!response.ok) {
    return {
      data: stateFormData,
      message: `Server error: failed to create workspace.`,
    };
  }

  // revalidate and redirect
  revalidateTag("user-data");
  redirect(`/workspace/${workspaceId}`);
}
