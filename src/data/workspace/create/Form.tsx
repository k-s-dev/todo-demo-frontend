"use client";

import { useActionState } from "react";
import { Workspace, WorkspaceFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";

export default function FormWorkspaceCreate({
  userId,
  workspaces,
  disabled = false,
  formId = "form-workspace-update",
}: {
  userId: string;
  workspaces: Workspace[];
  disabled?: boolean;
  formId?: string;
}) {
  const formActionPartial = action.bind(
    null,
    userId,
    workspaces,
  );

  const initialFormState: WorkspaceFormState = { message: "", errors: {} };

  const [formState, formAction, isPending] = useActionState(
    formActionPartial,
    initialFormState,
  );

  return (
    <form action={formAction} id={formId}>
      <FormContent
        formId={formId}
        disabled={disabled}
        formState={formState}
        isPending={isPending}
      />
    </form>
  );
}
