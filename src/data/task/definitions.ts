import { FormConfig, FormFieldsIndicator } from "@/lib/types";
import { z } from "zod";
import { Project } from "../project/definitions";
import { Workspace } from "../workspace/definitions";
import { Category } from "../category/definitions";
import { Status } from "../status/definitions";
import { Priority } from "../priority/definitions";

export const TaskFormSchema = z.object({
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
    z.boolean().default(true),
  ),

  parent: z.coerce.number().int().optional(),
  workspace: z.coerce.number().int().positive("This is a required field."),
  category: z.coerce.number().int().positive("This is a required field."),
  project: z.coerce.number().int().optional(),

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
    (arg) => (arg === "" ? undefined : arg),
    z.coerce.number().int().positive().optional(),
  ),
  actual_effort: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.coerce.number().int().positive().optional(),
  ),
});

export const TaskApiSchema = TaskFormSchema;

export const TaskSchema = TaskApiSchema.extend({
  id: z.number().int(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const TaskUpdateDataSchema = TaskFormSchema.partial()

export const TaskFormKeysSchema = TaskFormSchema.keyof();

export type Task = z.infer<typeof TaskSchema>;
export type TaskForm = z.infer<typeof TaskFormSchema>;
export type TaskUpdateData = z.infer<typeof TaskUpdateDataSchema>;
export type TaskApi = z.infer<typeof TaskApiSchema>;
export type TaskFormKeys = z.infer<typeof TaskFormKeysSchema>;

export const TaskFormDataSchema = TaskFormSchema.partial();
export type TaskFormData = z.infer<typeof TaskFormDataSchema>;

export type TaskFormState = {
  data: TaskFormData;
  errors?: {
    [Property in keyof TaskFormData]: string[];
  };
  message?: string | null;
};

export type TaskFormConfig = FormConfig<FormFieldsIndicator<TaskForm>> & {
  project?: Project;
};

export interface TaskTableData {
  userId: string;
  task: Task;
  parent?: Task;
  project: Project;
  workspace: Workspace;
  category: Category;
  status?: Status;
  priority?: Priority;
}
