"use server";

import { Category, CategoryFormSchema, CategoryFormState, CategoryApiType } from "../definitions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { apiUpdate, Endpoint } from "@/data/apiCRUD";

export async function action(
  userId: string,
  category: Category,
  prevState: CategoryFormState | null,
  formData: FormData,
): Promise<CategoryFormState> {
  // retreive data
  const rawFormData = Object.fromEntries(formData);
  const stateFormData = {
    ...rawFormData,
    workspace: category.workspace,
  };

  // Validate form (using Zod)
  const validatedFormData = CategoryFormSchema.safeParse(stateFormData);

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
  const prevSubmissionData = {
    name: category.name,
    description: category.description,
    parent: category.parent,
    workspace: category.workspace,
  };
  const apiSubmissionData = {
    ...prevSubmissionData,
    ...validatedFormData.data,
  };

  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "category"

  try {
    response = await apiUpdate<CategoryApiType>(
      endpoint,
      userId,
      category.id,
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
  redirect(`/workspace/${category.workspace}`);
}
