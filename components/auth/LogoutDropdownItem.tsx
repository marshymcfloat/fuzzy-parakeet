import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function LogoutDropdownItem({
  alertOpen,
  setAlertOpen,
}: {
  alertOpen: boolean;
  setAlertOpen: (isOpen: boolean) => void;
}) {
  return (
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setAlertOpen(true);
        }}
        className="cursor-pointer text-red-600 focus:text-red-600"
      >
        <LogOut className="" />
        Logout
      </DropdownMenuItem>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => signOut()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
