"use server";

import { apiUpdate, Endpoint } from "@/data/apiCRUD";
import { Tag, TagFormSchema, TagFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  tag: Tag,
  prevState: TagFormState | null,
  formData: FormData,
): Promise<TagFormState> {
  const prevSubmissionData = {
    name: tag.name,
    workspace: tag.workspace,
  };

  // retreive form data
  const rawFormData = Object.fromEntries(formData);
  const stateFormData = {
    ...prevSubmissionData,
    ...rawFormData,
  };

  // Validate form (using Zod)
  const validatedFormData = TagFormSchema.safeParse(stateFormData);

  // handle zod validation errors
  if (!validatedFormData.success) {
    return {
      data: stateFormData,
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Failed to Create Workspace due to field errors.",
    };
  }

  //custom validation

  // prepare form data for submission to backend
  const apiSubmissionData = {
    ...validatedFormData.data,
  };

  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "tag";

  try {
    response = await apiUpdate(
      endpoint,
      userId,
      tag.id,
      apiSubmissionData,
    );
  } catch (error) {
    return {
      data: stateFormData,
      message: `Server error: failed to create workspace. ${error}`,
    };
  }

  // handle fetch failed responses
  if (!response.ok) {
    return {
      data: stateFormData,
      message: "Server error.",
    };
  }

  // revalidate and redirect
  revalidateTag("user-data");
  redirect(`/workspace/${tag.workspace}`);
}
