"use client";

import { useActionState } from "react";
import { Priority, PriorityFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";
import { Workspace } from "@/data/workspace/definitions";

export default function FormPriorityUpdate({
  userId,
  priority,
  workspaces,
  disabled = false,
  formIdBase = "form-priority-update",
}: {
  userId: string;
  priority: Priority;
  workspaces?: Workspace[];
  disabled?: boolean;
  formIdBase?: string;
}) {
  const formActionPartial = action.bind(null, userId, priority);

  const initialFormData = {
    name: priority.name,
    description: priority.description,
    order: priority.order,
    workspace: priority.workspace,
  };

  const initialFormState: PriorityFormState = {
    data: initialFormData,
    message: "",
    errors: {},
  };

  const [formState, formAction, isPending] = useActionState(
    formActionPartial,
    initialFormState,
  );

  const formId = `${formIdBase}-${priority.id}`;

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
