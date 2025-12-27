"use server";

import { getServerSession } from "next-auth";
import { updateProfileSchema, UpdateProfileTypes } from "../zod schema/profile";
import { authOptions } from "../next-auth/authOptions";
import { prisma } from "@/prisma/prisma";
import { capitalizerName } from "../utils";

export async function UpdateProfileAction(formValues: UpdateProfileTypes) {
  try {
    const session = await getServerSession(authOptions);

    const userEmail = session?.user.email;

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const validationResult = updateProfileSchema.safeParse(formValues);

    if (!validationResult.success) {
      return { success: false, error: validationResult.error.message };
    }

    const { name, image_url } = validationResult.data;

    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const capitalizedName = capitalizerName(name!);

    /* 
    const updatedUser = await prisma.user.update({where: {id: user.id}, data:{
        name: capitalizedName,
    }) */
  } catch (err) {}
}
