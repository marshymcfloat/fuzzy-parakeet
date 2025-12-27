import { z } from "zod";

export const authLoginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email should not exceed 100 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(50, { message: "Password should not exceed 50 characters" }),
});

export const authRegisterSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email should not exceed 100 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(50, { message: "Password should not exceed 50 characters" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required" })
    .max(50, { message: "Confirm password should not exceed 50 characters" }),
});

export type AuthLoginTypes = z.infer<typeof authLoginSchema>;
export type AuthRegisterTypes = z.infer<typeof authRegisterSchema>;
