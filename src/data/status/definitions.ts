import { z } from "zod";

export const StatusFormSchema = z.object({
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

export const StatusApiSchema = z.object({
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

export const StatusObjectSchema = StatusApiSchema.extend({
  id: z.number().int(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const StatusFormKeysSchema = StatusFormSchema.keyof();

export type Status = z.infer<typeof StatusObjectSchema>;
export type StatusForm = z.infer<typeof StatusFormSchema>;
export type StatusApi = z.infer<typeof StatusApiSchema>;
export type StatusFormKeys = z.infer<typeof StatusFormKeysSchema>;

export type StatusFormState = {
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
