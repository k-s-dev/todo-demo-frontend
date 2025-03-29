"use client";

import { useActionState } from "react";
import { StatusFormState } from "../definitions";
import { action } from "./action";
import { Workspace } from "@/data/workspace/definitions";
import { FormContent } from "../FormInputs";

export default function FormStatusCreate({
  userId,
  workspaceId,
  workspaces,
  disabled = false,
  formId = "form-status-create",
}: {
  userId: string;
  workspaceId: number;
  workspaces?: Workspace[];
  disabled?: boolean;
  formId?: string;
}) {
  const formActionPartial = action.bind(null, userId, workspaceId);

  const initialFormData = {
    workspace: workspaceId,
  };
  const initialFormState: StatusFormState = {
    data: initialFormData,
    message: "",
    errors: {},
  };

  const [formState, formAction, isPending] = useActionState(
    formActionPartial,
    initialFormState,
  );

  return (
    <form action={formAction} id={formId}>
      <FormContent
        workspaces={workspaces}
        formId={formId}
        disabled={disabled}
        formState={formState}
        isPending={isPending}
      />
    </form>
  );
}
