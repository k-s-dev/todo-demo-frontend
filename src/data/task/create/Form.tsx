"use client";

import { useActionState } from "react";
import { Task, TaskFormConfig, TaskFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";
import { Project } from "@/data/project/definitions";

export default function FormTaskCreate({
  userId,
  formConfig,
  projects,
  tasks,
}: {
  userId: string;
  formConfig: TaskFormConfig;
  projects: Project[];
  tasks: Task[];
}) {
  formConfig = {
    formId: "form-task-create",
    ...formConfig,
  };
  const formActionPartial = action.bind(null, userId);

  const initialFormState: TaskFormState = {
    data: { is_visible: true, },
    message: "",
    errors: {},
  };

  const [formState, formAction, isPending] = useActionState(
    formActionPartial,
    initialFormState,
  );

  return (
    <form
      inert={formConfig?.disableField?.form}
      action={formAction}
      id={formConfig?.formId}
    >
      <FormContent
        formState={formState}
        isPending={isPending}
        formConfig={formConfig}
        projects={projects}
        tasks={tasks}
      />
    </form>
  );
}
