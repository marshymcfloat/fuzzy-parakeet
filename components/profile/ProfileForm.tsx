"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  UpdateProfileTypes,
} from "@/lib/zod schema/profile";
import { Input } from "../ui/input";
import Image from "next/image";
import { useState, useRef } from "react";
import { Camera, CameraIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ProfileForm() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);

  const form = useForm<UpdateProfileTypes>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      image_url: "",
    },
  });

  return (
    <Form {...form}>
      <form action="" className="space-y-4">
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem className="mx-auto">
              <FormControl>
                <div className="flex justify-center items-center">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImage(file);
                        setImagePreview(URL.createObjectURL(file));
                        field.onChange(file);
                      }
                    }}
                  />
                  <div
                    className="rounded-full size-30 bg-purple-200  hover:bg-purple-100 transition-all overflow-hidden duration-300 relative cursor-pointer flex items-center justify-center group"
                    onClick={() => imageRef.current?.click()}
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Profile"
                        fill
                        className="object-cover group-hover:brightness-75 transition-all duration-300"
                      />
                    ) : (
                      <CameraIcon className="size-8 text-purple-800 group-hover:text-purple-400 transition-all duration-300" />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-8" type="submit">
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
