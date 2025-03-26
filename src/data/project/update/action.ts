"use server";

import { apiUpdate, Endpoint } from "@/data/apiCRUD";
import {
  Project,
  ProjectApi,
  ProjectFormKeys,
  ProjectFormSchema,
  ProjectFormState,
} from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  project: Project,
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
      message: "Failed to update Project due to field errors.",
    };
  }

  // prepare form data for submission to backend
  const prevSubmissionData = {
    title: project.title,
    detail: project.detail,
    is_visible: project.is_visible,
    workspace: project.workspace,
    category: project.category,
    priority: project.priority,
    status: project.status,
    tags: project.tags,
    estimated_start_date: project.estimated_start_date,
    estimated_end_date: project.estimated_end_date,
    actual_start_date: project.actual_start_date,
    actual_end_date: project.actual_end_date,
    estimated_effort: project.estimated_effort,
    actual_effort: project.actual_effort,
  };

  const apiSubmissionData = {
    ...prevSubmissionData,
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
    response = await apiUpdate<ProjectApi>(
      endpoint,
      userId,
      project.id,
      apiSubmissionData,
    );
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
