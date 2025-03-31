"use server";

import { apiCreate, Endpoint } from "@/data/apiCRUD";
import {
  TaskApi,
  TaskFormKeys,
  TaskFormSchema,
  TaskFormState,
} from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  prevState: TaskFormState | null,
  formData: FormData,
): Promise<TaskFormState> {
  // retreive data
  let rawFormData: { [k: string]: FormDataEntryValue | FormDataEntryValue[] } =
    Object.fromEntries(formData);
  const tags = [...formData.getAll("tags")];
  rawFormData = {
    ...rawFormData,
    tags: tags,
    is_visible:
      rawFormData?.is_visible || (false as unknown as FormDataEntryValue),
  };

  // Validate form (using Zod)
  const validatedFormData = TaskFormSchema.safeParse(rawFormData);

  // handle zod validation errors
  if (!validatedFormData.success) {
    return {
      data: rawFormData,
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Failed to Create Task due to field errors.",
    };
  }

  // prepare form data for submission to backend
  const apiSubmissionData = {
    ...validatedFormData.data,
  };

  let key: TaskFormKeys;
  for (key in apiSubmissionData) {
    if (!["is_visible"].includes(key) && !apiSubmissionData[key]) {
      delete apiSubmissionData[key];
    }
  }

  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "task";

  try {
    response = await apiCreate<TaskApi>(endpoint, userId, apiSubmissionData);
    // eslint-disable-next-line
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
