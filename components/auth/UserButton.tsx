"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useSession } from "next-auth/react";
import AuthDialog from "./AuthDialog";
import LogoutDropdownItem from "./LogoutDropdownItem";
import { useState } from "react";
import ProfileDialog from "../profile/ProfileDialog";

export default function UserButton() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: session } = useSession();

  const isLogged = session?.user;

  return (
    <>
      {isLogged ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback className="bg-purple-700 text-white font-sans font-bold items-center flex justify-center cursor-pointer hover:bg-purple-800 duration-150 transition-all">
                  {session?.user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ProfileDialog
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
              />
              <LogoutDropdownItem
                alertOpen={alertOpen}
                setAlertOpen={setAlertOpen}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <AuthDialog />
        </>
      )}
    </>
  );
}
