"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AuthRegisterForm from "./AuthRegisterForm";
import AuthLoginForm from "./AuthLoginForm";

export default function AuthDialog() {
  const [content, setContent] = useState<"login" | "register">("login");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-5 font-sans tracking-widest">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Start shopping with ease and convenience
          </DialogDescription>
        </DialogHeader>
        {content === "login" ? (
          <AuthLoginForm setContent={setContent} setIsOpen={setIsOpen} />
        ) : (
          <AuthRegisterForm setContent={setContent} />
        )}
      </DialogContent>
    </Dialog>
  );
}
