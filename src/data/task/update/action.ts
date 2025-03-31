"use server";

import { apiUpdate, Endpoint } from "@/data/apiCRUD";
import {
  Task,
  TaskApi,
  TaskFormKeys,
  TaskFormSchema,
  TaskFormState,
} from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  task: Task,
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
      message: "Failed to update Task due to field errors.",
    };
  }

  // prepare form data for submission to backend
  const prevSubmissionData = {
    title: task.title,
    detail: task.detail,
    is_visible: task.is_visible,
    workspace: task.workspace,
    category: task.category,
    project: task.project,
    priority: task.priority,
    status: task.status,
    tags: task.tags,
    estimated_start_date: task.estimated_start_date,
    estimated_end_date: task.estimated_end_date,
    actual_start_date: task.actual_start_date,
    actual_end_date: task.actual_end_date,
    estimated_effort: task.estimated_effort,
    actual_effort: task.actual_effort,
  };

  const apiSubmissionData = {
    ...prevSubmissionData,
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
    response = await apiUpdate<TaskApi>(
      endpoint,
      userId,
      task.id,
      apiSubmissionData,
    );
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
