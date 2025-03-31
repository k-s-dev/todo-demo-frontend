"use client";

import { useActionState } from "react";
import { Project, ProjectFormConfig, ProjectFormState } from "../definitions";
import { action } from "./action";
import { FormContent } from "../FormInputs";

export default function FormProjectCreate({
  userId,
  formConfig,
  projects,
}: {
  userId: string;
  formConfig: ProjectFormConfig;
  projects: Project[];
}) {
  formConfig = {
    formId: "form-project-create",
    ...formConfig,
  };
  const formActionPartial = action.bind(null, userId);

  const initialFormState: ProjectFormState = {
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
