"use client";

import { useActionState } from "react";
import { Category, CategoryFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";
import { Workspace } from "@/data/workspace/definitions";

export default function FormCategoryUpdate({
  userId,
  category,
  workspaces,
  disabled = false,
  formIdBase = "form-category-update",
}: {
  userId: string;
  category: Category;
  workspaces?: Workspace[];
  disabled?: boolean;
  formIdBase?: string;
}) {
  const formActionPartial = action.bind(null, userId, category);

  const initialFormData = {
    name: category.name,
    description: category.description,
    parent: category.parent,
    workspace: category.workspace,
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

  const formId = `${formIdBase}-${category.id}`;

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
