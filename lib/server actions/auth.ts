"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../next-auth/authOptions";
import { authRegisterSchema, AuthRegisterTypes } from "../zod schema/auth";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";

export async function AuthRegisterAction(formValues: AuthRegisterTypes) {
  try {
    const validationResult = authRegisterSchema.safeParse(formValues);

    if (!validationResult.success) {
      return { success: false, error: validationResult.error.message };
    }

    const { email, password, confirmPassword } = validationResult.data;

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return { success: false, error: "User already exists" };
    }

    const hashed_password = await bcrypt.hash(password, 12);

    if (!hashed_password) {
      return { success: false, error: "Failed to hash password" };
    }
    const newUser = await prisma.user.create({
      data: { email, hashed_password },
    });

    if (!newUser) {
      return { success: false, error: "Failed to create user" };
    }

    return {
      success: true,
      message: "User created successfully, Please login now",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to register",
    };
  }
}
