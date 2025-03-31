"use client";

import { useActionState } from "react";
import { Task, TaskFormConfig, TaskFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";
import { Project } from "@/data/project/definitions";

export default function FormTaskUpdate({
  userId,
  task,
  formConfig,
  projects,
  tasks,
}: {
  userId: string;
  task: Task;
  formConfig: TaskFormConfig;
  projects: Project[];
  tasks: Task[];
}) {
  formConfig = {
    formId: "form-task-update",
    ...formConfig,
  };
  const formActionPartial = action.bind(null, userId, task);

  const initialFormState: TaskFormState = {
    data: {
      title: task.title,
      detail: task.detail,
      is_visible: task.is_visible,
      workspace: task.workspace,
      category: task.category,
      priority: task.priority,
      status: task.status,
      tags: task.tags,
      estimated_start_date: task.estimated_start_date,
      estimated_end_date: task.estimated_end_date,
      actual_start_date: task.actual_start_date,
      actual_end_date: task.actual_end_date,
    },
    message: "",
    errors: {},
  };

  const [formState, formAction, isPending] = useActionState(
    formActionPartial,
    initialFormState,
  );

  return (
    <form
      inert={formConfig?.disable?.form}
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
