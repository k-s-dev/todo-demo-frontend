"use server";

import { apiUpdate, Endpoint } from "@/data/apiCRUD";
import {
  Workspace,
  WorkspaceFormSchema,
  WorkspaceFormState,
} from "../definitions";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function action(
  userId: string,
  workspace: Workspace,
  workspaces: Workspace[],
  prevState: WorkspaceFormState | null,
  formData: FormData,
): Promise<WorkspaceFormState> {
  // retreive data
  const rawFormData = Object.fromEntries(formData);
  const stateFormData = {
    ...rawFormData,
    is_default: rawFormData?.is_default === "on",
  };

  // Validate form (using Zod)
  const validatedFormData = WorkspaceFormSchema.safeParse(stateFormData);

  // handle zod validation errors
  if (!validatedFormData.success) {
    return {
      data: stateFormData,
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Failed to Create Workspace due to field errors.",
    };
  }

  //custom validation
  if (
    workspaces
      .filter((obj) => obj.id !== workspace.id)
      .map((obj) => obj.name)
      .includes(validatedFormData.data.name)
  ) {
    return {
      data: stateFormData,
      errors: {
        name: ["A workspace exists with the same name."],
      },
      message:
        "Submission aborted due to field errors. Please rectify the data and try again.",
    };
  }

  if (
    !stateFormData?.is_default &&
    workspaces.filter((obj) => obj.is_default).length === 1 &&
    workspaces.find((obj) => obj.id === workspace.id)?.is_default
  ) {
    return {
      data: stateFormData,
      errors: {
        is_default: [
          `There has to be at least 1 default workspace.
          Make some other workspace default to make this non default.`,
        ],
      },
      message:
        "Submission aborted due to validation errors. Please rectify the data and try again.",
    };
  }

  // prepare form data for submission to backend
  const prevSubmissionData = {
    name: workspace.name,
    description: workspace.description,
    is_default: workspace.is_default,
    created_by: workspace.created_by,
  };
  const apiSubmissionData = {
    ...prevSubmissionData,
    ...validatedFormData.data,
  };

  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "workspace";

  try {
    response = await apiUpdate(
      endpoint,
      userId,
      workspace.id,
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
  revalidateTag("user-data")
  redirect(`/workspace/${workspace.id}`);
}
