"use client";

import { useActionState } from "react";
import { Category, CategoryFormState } from "../definitions";
import { action } from "./action";
import DeletePage from "@/components/protected/DeletePage";

export default function FormCategoryDelete({
  userId,
  category,
  disabled = false,
  formId = "form-category-delete",
}: {
  userId: string;
  category: Category;
  disabled?: boolean;
  formId?: string;
}) {
  const formActionPartial = action.bind(null, userId, category);

  const initialFormState: CategoryFormState = {
    message: "",
    errors: {},
  };

  const [formState, formAction] = useActionState(
    formActionPartial,
    initialFormState,
  );

  return (
    <>
      <DeletePage
        formAction={formAction}
        formState={formState}
        formId={formId}
        disabled={disabled}
      />
    </>
  );
}
