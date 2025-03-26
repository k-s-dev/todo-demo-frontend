import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name cannot be empty.",
    }),
  description: z.string().optional(),
  workspace: z.coerce.number().int(),
  parent: z.number().int().optional(),
});

export const CategoryApiSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name cannot be empty.",
    }),
  description: z.string().optional(),
  workspace: z.coerce.number().int(),
  parent: z.number().int().optional(),
});

export const CategorySchema = CategoryApiSchema.extend({
  id: z.number().int(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const CategoryFormKeysSchema = CategoryFormSchema.keyof();

export type Category = z.infer<typeof CategorySchema>;
export type CategoryFormType = z.infer<typeof CategoryFormSchema>;
export type CategoryApiType = z.infer<typeof CategoryApiSchema>;
export type CategoryFormKeys = z.infer<typeof CategoryFormKeysSchema>;

export type CategoryFormState = {
  data?: {
    name?: string | undefined;
    description?: string | undefined;
    parent?: number | undefined;
    workspace?: number | undefined;
  };
  errors?: {
    name?: string[];
    description?: string[];
    parent?: string[];
    workspace?: string[];
  };
  message?: string | null;
};
