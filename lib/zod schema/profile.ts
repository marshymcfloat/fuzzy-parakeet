import z from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .max(50, { message: "Name should not exceed 50 characters" })
    .optional(),
  image_url: z.string().optional(),
});

export type UpdateProfileTypes = z.infer<typeof updateProfileSchema>;
