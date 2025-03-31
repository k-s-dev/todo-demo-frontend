import { z } from "zod";

export const WorkpsaceSchema = z.object({
  url: z.string(),
  id: z.number().int(),
  name: z.string({
    required_error: "Name is required."
  }).min(1, {
    message: "Cannot be empty."
  }),
  description: z.string().optional(),
  is_default: z.boolean().optional(),
  created_by: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  tag_list: z.string().url().optional(),
  priority_list: z.string().url().optional(),
  status_list: z.string().url().optional(),
  category_list: z.string().url().optional(),
  comment_list: z.string().url().optional(),
});


export const WorkspaceFormSchema = z.object({
  name: z.string({
    required_error: "Name is required."
  }).min(1, {
    message: "Name cannot be empty."
  }),
  description: z.string().optional(),
  is_default: z.boolean().optional(),
});

export interface IWorkspaceApiCreate {
  name: string;
  description?: string;
  is_default?: boolean;
  created_by: string;
}

export interface IWorkspaceApiUpdate {
  name: string;
  description?: string;
  is_default?: boolean;
}

export type Workspace = z.infer<typeof WorkpsaceSchema>;
export type WorkspaceForm = z.infer<typeof WorkspaceFormSchema> | undefined;

export type WorkspaceFormState = {
  data?: {
    // [k: string]: FormDataEntryValue,
    name?: string;
    description?: string | undefined;
    is_default?: boolean | undefined;
  };
  errors?: {
    name?: string[];
    description?: string[];
    is_default?: string[];
  };
  message?: string | null;
};

