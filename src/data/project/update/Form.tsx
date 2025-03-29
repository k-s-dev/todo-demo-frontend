"use client";

import { useActionState } from "react";
import { Project, ProjectFormConfig, ProjectFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";

export default function FormProjectUpdate({
  userId,
  formConfig,
  project,
  projects,
}: {
  userId: string;
  formConfig: ProjectFormConfig;
  project: Project;
  projects: Project[];
}) {
  formConfig = {
    formId: "form-project-update",
    ...formConfig,
  };
  const formActionPartial = action.bind(null, userId, project);

  const initialFormState: ProjectFormState = {
    data: {
      title: project.title,
      detail: project.detail,
      is_visible: project.is_visible,
      workspace: project.workspace,
      category: project.category,
      priority: project.priority,
      status: project.status,
      tags: project.tags,
      estimated_start_date: project.estimated_start_date,
      estimated_end_date: project.estimated_end_date,
      actual_start_date: project.actual_start_date,
      actual_end_date: project.actual_end_date,
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
      />
    </form>
  );
}
