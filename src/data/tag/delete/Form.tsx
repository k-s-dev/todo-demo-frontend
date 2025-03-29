"use client";

import { useActionState } from "react";
import { Tag, TagFormState } from "../definitions";
import { action } from "./action";
import DeletePage from "@/components/protected/DeletePage";

export default function FormTagDelete({
  userId,
  tag,
  disabled = false,
  formId = "form-tag-delete",
}: {
  userId: string;
  tag: Tag;
  disabled?: boolean;
  formId?: string;
}) {
  const formActionPartial = action.bind(null, userId, tag);

  const initialFormState: TagFormState = {
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
