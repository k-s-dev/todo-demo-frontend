import { z } from "zod";

export const TagFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name cannot be empty.",
    }),
  workspace: z.coerce.number().int(),
});

export const TagApiSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name cannot be empty.",
    }),
  workspace: z.coerce.number().int(),
});

export const TagObjectSchema = TagApiSchema.extend({
  id: z.number().int(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const TagFormKeysSchema = TagFormSchema.keyof();

export type Tag = z.infer<typeof TagObjectSchema>;
export type TagForm = z.infer<typeof TagFormSchema>;
export type TagApi = z.infer<typeof TagApiSchema>;
export type TagFormKeys = z.infer<typeof TagFormKeysSchema>;

export type TagFormState = {
  data?: {
    name?: string | undefined;
    workspace?: number | undefined;
  };
  errors?: {
    name?: string[];
    workspace?: string[];
  };
  message?: string | null;
};
