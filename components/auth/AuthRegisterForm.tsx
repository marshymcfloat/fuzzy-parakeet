"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { authRegisterSchema, AuthRegisterTypes } from "@/lib/zod schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { AuthRegisterAction } from "@/lib/server actions/auth";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function AuthRegisterForm({
  setContent,
}: {
  setContent: (content: "login" | "register") => void;
}) {
  const form = useForm<AuthRegisterTypes>({
    resolver: zodResolver(authRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formInputs = Object.keys(
    authRegisterSchema.shape
  ) as (keyof AuthRegisterTypes)[];

  const { mutate: registerMutate, isPending: reigsterPending } = useMutation({
    mutationFn: AuthRegisterAction,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);
      setContent("login");
    },
  });

  function handleSubmission(values: AuthRegisterTypes) {
    registerMutate(values);
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
                <FormLabel className="capitalize">
                  {input === "confirmPassword" ? "Confirm Password" : input}
                </FormLabel>
                <FormControl>
                  <Input
                    type={input === "email" ? "email" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex gap-4 justify-end mt-12">
          <Button
            type="button"
            variant="ghost"
            disabled={reigsterPending}
            onClick={() => setContent("login")}
          >
            Back
          </Button>
          <Button type="submit" disabled={reigsterPending}>
            {reigsterPending && <LoaderCircle className="animate-spin" />}
            {reigsterPending ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
