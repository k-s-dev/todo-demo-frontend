"use client";

import { useActionState } from "react";
import { Priority, PriorityFormState } from "../definitions";
import { action } from "./action";
import DeletePage from "@/components/protected/DeletePage";

export default function FormPriorityDelete({
  userId,
  priority,
  disabled = false,
  formId = "form-priority-delete",
  isModal = true,
}: {
  userId: string;
  priority: Priority;
  disabled?: boolean;
  formId?: string;
  isModal?: boolean;
}) {
  const formActionPartial = action.bind(null, userId, priority);

  const initialFormState: PriorityFormState = {
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
        isModal={isModal}
      />
    </>
  );
}
