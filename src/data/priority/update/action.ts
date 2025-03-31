"use server";

import { apiUpdate, Endpoint } from "@/data/apiCRUD";
import { Priority, PriorityFormSchema, PriorityFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  priority: Priority,
  prevState: PriorityFormState | null,
  formData: FormData,
): Promise<PriorityFormState> {
  const prevSubmissionData = {
    name: priority.name,
    description: priority.description,
    order: priority.order,
    workspace: priority.workspace,
  };

  // retreive form data
  const rawFormData = Object.fromEntries(formData);
  const stateFormData = {
    ...prevSubmissionData,
    ...rawFormData,
  };

  // Validate form (using Zod)
  const validatedFormData = PriorityFormSchema.safeParse(stateFormData);

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
  const endpoint: Endpoint = "priority";

  try {
    response = await apiUpdate(
      endpoint,
      userId,
      priority.id,
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
  redirect(`/workspace/${priority.workspace}`);
}
