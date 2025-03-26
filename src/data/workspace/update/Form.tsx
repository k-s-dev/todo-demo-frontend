"use client";

import { useActionState } from "react";
import { Workspace, WorkspaceFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";

export default function FormWorkspaceUpdate({
  userId,
  workspace,
  workspaces,
  disabled = false,
  formId = "form-workspace-update",
}: {
  userId: string;
  workspaces: Workspace[];
  workspace: Workspace;
  disabled?: boolean;
  formId?: string;
}) {
  const formActionWorkspaceUpdatePartial = action.bind(
    null,
    userId,
    workspace,
    workspaces,
  );

  const initialFormData = {
    name: workspace.name,
    description: workspace.description,
    is_default: workspace.is_default,
    created_by: workspace.created_by,
  };

  const initialFormState: WorkspaceFormState = {
    data: initialFormData,
    message: "",
    errors: {},
  };

  const [formState, formAction, isPending] = useActionState(
    formActionWorkspaceUpdatePartial,
    initialFormState,
  );

  return (
    <form action={formAction} id={formId} inert={disabled}>
      <FormContent
        formId={formId}
        formState={formState}
        disabled={disabled}
        isPending={isPending}
      />
    </form>
  );
}
