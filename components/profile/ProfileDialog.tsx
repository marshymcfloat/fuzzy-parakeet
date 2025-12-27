import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { User } from "lucide-react";
import ProfileForm from "./ProfileForm";

export default function ProfileDialog({
  profileOpen,
  setProfileOpen,
}: {
  profileOpen: boolean;
  setProfileOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
      <DialogTrigger
        onSelect={(e) => {
          e.preventDefault();
          setProfileOpen(true);
        }}
        asChild
      >
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            Manage your profile and settings.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
}
