"use server";

import { apiUpdate, Endpoint } from "@/data/apiCRUD";
import { Status, StatusFormSchema, StatusFormState } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  status: Status,
  prevState: StatusFormState | null,
  formData: FormData,
): Promise<StatusFormState> {
  const prevSubmissionData = {
    name: status.name,
    description: status.description,
    order: status.order,
    workspace: status.workspace,
  };

  // retreive form data
  const rawFormData = Object.fromEntries(formData);
  const stateFormData = {
    ...prevSubmissionData,
    ...rawFormData,
  };

  // Validate form (using Zod)
  const validatedFormData = StatusFormSchema.safeParse(stateFormData);

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
  const endpoint: Endpoint = "status";

  try {
    response = await apiUpdate(
      endpoint,
      userId,
      status.id,
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
  redirect(`/workspace/${status.workspace}`);
}
