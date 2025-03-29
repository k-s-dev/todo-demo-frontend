"use client";

import { useActionState } from "react";
import { Task, TaskFormState } from "../definitions";
import { action } from "./action";
import DeletePage from "@/components/protected/DeletePage";

export default function FormTaskDelete({
  userId,
  task,
  disabled = false,
  formId = "form-task-delete",
}: {
  userId: string;
  task: Task;
  disabled?: boolean;
  formId?: string;
}) {
  const formActionPartial = action.bind(null, userId, task);

  const initialFormState: TaskFormState = {
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
      />
    </>
  );
}
