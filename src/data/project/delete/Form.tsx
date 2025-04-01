"use client";

import { useActionState } from "react";
import { Project, ProjectFormState } from "../definitions";
import { action } from "./action";
import DeletePage from "@/components/protected/DeletePage";

export default function FormProjectDelete({
  userId,
  project,
  disabled = false,
  formId = "form-project-delete",
  isModal = true,
}: {
  userId: string;
  project: Project;
  disabled?: boolean;
  formId?: string;
  isModal?: boolean;
}) {
  const formActionPartial = action.bind(null, userId, project);

  const initialFormState: ProjectFormState = {
    data: {},
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
