"use client";

import { useActionState } from "react";
import { Status, StatusFormState } from "../definitions";
import { action } from "./action";
import DeletePage from "@/components/protected/DeletePage";

export default function FormStatusDelete({
  userId,
  status,
  disabled = false,
  formId = "form-status-delete",
  isModal = true,
}: {
  userId: string;
  status: Status;
  disabled?: boolean;
  formId?: string;
  isModal?: boolean;
}) {
  const formActionPartial = action.bind(null, userId, status);

  const initialFormState: StatusFormState = {
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
