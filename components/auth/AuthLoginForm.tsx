"use client";

import { authLoginSchema, AuthLoginTypes } from "@/lib/zod schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function AuthLoginForm({
  setContent,
  setIsOpen,
}: {
  setContent: (content: "login" | "register") => void;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const form = useForm<AuthLoginTypes>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formInputs = Object.keys(
    authLoginSchema.shape
  ) as (keyof AuthLoginTypes)[];

  const { mutate: loginMutate, isPending: loginPending } = useMutation({
    mutationFn: async (values: AuthLoginTypes) => {
      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!signInResult?.ok) {
        return { success: false, error: "Invalid credentials" };
      }
      return { success: true, message: "Login successful" };
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);
      setIsOpen(false);
    },
  });

  function handleSubmission(values: AuthLoginTypes) {
    loginMutate(values);
  }

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(handleSubmission)}
        className="space-y-4 mt-4"
      >
        {formInputs.map((input) => (
          <FormField
            key={input}
            control={form.control}
            name={input}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{input}</FormLabel>
                <FormControl>
                  <Input type={input ?? "password"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex flex-col gap-2 mt-12">
          <Button type="submit" disabled={loginPending}>
            {loginPending && <LoaderCircle className="animate-spin" />}
            {loginPending ? "Logging in..." : "Login"}
          </Button>
          <Button
            type="button"
            variant="link"
            disabled={loginPending}
            onClick={() => setContent("register")}
          >
            Don&apos;t have an account? Register
          </Button>
        </div>
      </form>
    </Form>
  );
}
