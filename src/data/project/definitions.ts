import { FormConfig, FormFieldsIndicator } from "@/lib/types";
import { z } from "zod";
import { Priority } from "../priority/definitions";
import { Status } from "../status/definitions";
import { Workspace } from "../workspace/definitions";
import { Category } from "../category/definitions";

export const ProjectFormSchema = z.object({
  title: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name cannot be empty.",
    }),
  detail: z.string().optional(),
  is_visible: z.preprocess(
    (arg) => (arg === "on" ? true : false),
    z.boolean().default(true).optional(),
  ),

  parent: z.coerce.number().int().optional(),
  workspace: z.coerce.number().int().positive("This is a required field."),
  category: z.coerce.number().int().positive("This is a required field."),

  priority: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.coerce.number().int().optional(),
  ),
  status: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.coerce.number().int().optional(),
  ),
  tags: z.coerce.number().int().array().optional(),

  estimated_start_date: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.coerce.date().optional(),
  ),
  estimated_end_date: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.coerce.date().optional(),
  ),
  actual_start_date: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.coerce.date().optional(),
  ),
  actual_end_date: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.coerce.date().optional(),
  ),

  estimated_effort: z.preprocess(
    (arg) => (arg === "" || arg === null ? undefined : arg),
    z.coerce.number().int().positive().optional(),
  ),
  actual_effort: z.preprocess(
    (arg) => (arg === "" || arg === null ? undefined : arg),
    z.coerce.number().int().positive().optional(),
  ),
});

export const ProjectUpdateActionSchema = ProjectFormSchema.partial();
export const ProjectApiSchema = ProjectFormSchema;

export const ProjectSchema = ProjectApiSchema.extend({
  id: z.number().int(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const ProjectFormKeysSchema = ProjectFormSchema.keyof();

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectForm = z.infer<typeof ProjectFormSchema>;
export type ProjectUpdateData = z.infer<typeof ProjectUpdateActionSchema>;
export type ProjectApi = z.infer<typeof ProjectApiSchema>;
export type ProjectFormKeys = z.infer<typeof ProjectFormKeysSchema>;

export interface ProjectTableData {
  userId: string;
  project: Project;
  parent?: Project;
  workspace: Workspace;
  category: Category;
  status?: Status;
  priority?: Priority;
}

export const ProjectFormDataSchema = ProjectFormSchema.partial();
export type ProjectFormData = z.infer<typeof ProjectFormDataSchema>;

export type ProjectFormState = {
  data: ProjectFormData;
  errors?: {
    [Property in keyof ProjectFormData]: string[];
  };
  message?: string | null;
};

export type ProjectFormConfig = FormConfig<FormFieldsIndicator<ProjectForm>>;
