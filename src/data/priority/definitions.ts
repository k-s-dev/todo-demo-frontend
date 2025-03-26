import { z } from "zod";

export const PriorityFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name cannot be empty.",
    }),
  description: z.string().optional(),
  workspace: z.coerce.number().int(),
  order: z.number().int().optional(),
});

export const PriorityApiSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name cannot be empty.",
    }),
  description: z.string().optional(),
  workspace: z.coerce.number().int(),
  order: z.number().int().optional(),
});

export const PrioritySchema = PriorityApiSchema.extend({
  id: z.number().int(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const PriorityFormKeysSchema = PriorityFormSchema.keyof();

export type Priority = z.infer<typeof PrioritySchema>;
export type PriorityForm = z.infer<typeof PriorityFormSchema>;
export type PriorityApi = z.infer<typeof PriorityApiSchema>;
export type PriorityFormKeys = z.infer<typeof PriorityFormKeysSchema>;

export type PriorityFormState = {
  data?: {
    name?: string | undefined;
    description?: string | undefined;
    order?: number | undefined;
    workspace?: number | undefined;
  };
  errors?: {
    name?: string[];
    description?: string[];
    order?: string[];
    workspace?: string[];
  };
  message?: string | null;
};
