"use server";

import {
  Workspace,
  WorkspaceFormSchema,
  WorkspaceFormState,
} from "../definitions";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { fetchAllUserObjects } from "@/data/apiUserData";
import { createWorkspaceConfigTemplate } from "../actions/createDefaultConfig";
import { apiCreate, Endpoint } from "@/data/apiCRUD";
import { baseUrl, getBaseOptions } from "@/lib/apiConfig";

export async function action(
  userId: string,
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
  if (workspaces.map((obj) => obj.name).includes(validatedFormData.data.name)) {
    return {
      data: stateFormData,
      errors: {
        name: ["A workspace exists with the same name."],
      },
      message:
        "Submission aborted due to field errors. Please rectify the data and try again.",
    };
  }

  // prepare form data for submission to backend
  const apiSubmissionData = { ...validatedFormData.data, created_by: userId };

  // try submitting data to backend
  let response;
  const endpoint: Endpoint = "workspace";

  try {
    response = await apiCreate(endpoint, userId, apiSubmissionData);
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

  // create basic priority and status values for the new workspace
  const wsUrl = `${baseUrl}/user/${userId}/${endpoint}/`;
  response = await fetch(wsUrl, {
    ...getBaseOptions,
    cache: "reload",
  });
  const newWorspaces: Workspace[] = await response.json();
  const newWorkspace = newWorspaces.find(
    (item) =>
      item.name === apiSubmissionData.name &&
      item.created_by === apiSubmissionData.created_by,
  );
  if (newWorkspace) {
    await createWorkspaceConfigTemplate(userId, newWorkspace.id.toString())
  }

  // revalidate and redirect
  revalidateTag("user-data");
  redirect(`/workspace/${newWorkspace?.id}`);
}
