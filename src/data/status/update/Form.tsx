"use client";

import { useActionState } from "react";
import { Status, StatusFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";
import { Workspace } from "@/data/workspace/definitions";

export default function FormStatusUpdate({
  userId,
  status,
  workspaces,
  disabled = false,
  formIdBase = "form-status-update",
}: {
  userId: string;
  status: Status;
  workspaces?: Workspace[];
  disabled?: boolean;
  formIdBase?: string;
}) {
  const formActionPartial = action.bind(null, userId, status);

  const initialFormData = {
    name: status.name,
    description: status.description,
    order: status.order,
    workspace: status.workspace,
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

  const formId = `${formIdBase}-${status.id}`;

  return (
    <form action={formAction} id={`${formId}`} inert={disabled}>
      <FormContent
        workspaces={workspaces}
        formId={formId}
        formState={formState}
        disabled={disabled}
        isPending={isPending}
      />
    </form>
  );
}
