"use client";

import { useActionState } from "react";
import { Workspace, WorkspaceFormState } from "../definitions";
import { action } from "./action";
import DeletePage from "@/components/protected/DeletePage";

export default function FormWorkspaceDelete({
  userId,
  workspace,
  disabled = false,
  formId = "form-workspace-delete",
  isModal = true,
}: {
  userId: string;
  workspace: Workspace;
  disabled?: boolean;
  formId?: string;
  isModal?: boolean;
}) {
  const formActionPartial = action.bind(null, userId, workspace);

  const initialFormState: WorkspaceFormState = {
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
