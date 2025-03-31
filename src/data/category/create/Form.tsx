"use client";

import { useActionState } from "react";
import { CategoryFormState } from "../definitions";
import { action } from "./action";
import { Workspace } from "@/data/workspace/definitions";
import { FormContent } from "../FormInputs";

export default function FormCategoryCreate({
  userId,
  workspaceId,
  workspaces,
  disabled = false,
  formId = "form-category-create",
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
  const initialFormState: CategoryFormState = {
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
