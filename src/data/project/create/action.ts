"use server";

import { apiCreate, Endpoint } from "@/data/apiCRUD";
import {
  ProjectApi,
  ProjectFormKeys,
  ProjectFormSchema,
  ProjectFormState,
} from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  prevState: ProjectFormState | null,
  formData: FormData,
): Promise<ProjectFormState> {
  // retreive data
  let rawFormData = Object.fromEntries(formData);
  const tags = [...formData.getAll("tags")];
  rawFormData = {
    ...rawFormData,
    tags: tags,
    is_visible: rawFormData?.is_visible || false,
  };

  // Validate form (using Zod)
  const validatedFormData = ProjectFormSchema.safeParse(rawFormData);

  // handle zod validation errors
  if (!validatedFormData.success) {
    return {
      data: rawFormData,
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Failed to Create Project due to field errors.",
    };
  }

  // prepare form data for submission to backend
  const apiSubmissionData = {
    ...validatedFormData.data,
  };

  let key: ProjectFormKeys;
  for (key in apiSubmissionData) {
    if (!["is_visible"].includes(key) && !apiSubmissionData[key]) {
      delete apiSubmissionData[key];
    }
  }

  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "project";

  try {
    response = await apiCreate<ProjectApi>(endpoint, userId, apiSubmissionData);
  } catch (error) {
    return {
      data: rawFormData,
      message: `Server error: Failed to create resource.`,
    };
  }

  // handle fetch failed responses
  if (!response.ok) {
    return {
      data: rawFormData,
      message: `Server error: Failed to create resource.`,
    };
  }

  // revalidate and redirect
  revalidateTag("user-data");
  redirect(`/dashboard`);
}
