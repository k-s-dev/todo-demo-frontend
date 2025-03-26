"use client";

import { useActionState } from "react";
import { Tag, TagFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";
import { Workspace } from "@/data/workspace/definitions";

export default function FormTagUpdate({
  userId,
  tag,
  workspaces,
  disabled = false,
  formIdBase = "form-tag-update",
}: {
  userId: string;
  tag: Tag;
  workspaces?: Workspace[];
  disabled?: boolean;
  formIdBase?: string;
}) {
  const formActionPartial = action.bind(null, userId, tag);

  const initialFormData = {
    name: tag.name,
    description: tag.description,
    order: tag.order,
    workspace: tag.workspace,
  };

  const initialFormState: TagFormState = {
    data: initialFormData,
    message: "",
    errors: {},
  };

  const [formState, formAction, isPending] = useActionState(
    formActionPartial,
    initialFormState,
  );

  const formId = `${formIdBase}-${tag.id}`;

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
