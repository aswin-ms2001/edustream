"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutThunk } from "@/store/features/auth/authThunk";
import { selectCurrentUser, selectAuthLoading } from "@/store/features/auth/authSelectors";

interface TopbarUser {
  name: string;
  role: string;
  avatarUrl?: string;
}

interface ProfileDropdownProps {
  user: TopbarUser;
}

export default function ProfileDropdown({
  user,
}: ProfileDropdownProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const displayUser = reduxUser || user;
  const initial = displayUser.name ? displayUser.name.charAt(0).toUpperCase() : "U";

  const handleConfirmLogout = async () => {
    if (isLoading) return;
    try {
      await dispatch(logoutThunk()).unwrap();
      setIsDialogOpen(false);
      router.push("/login");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Logout failed");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-auto items-center gap-3 rounded-full px-2 py-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {initial}
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-medium">
                {displayUser.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {displayUser.role}
              </p>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56"
        >
          <DropdownMenuLabel>
            My Account
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsDialogOpen(true);
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={(open) => {
        // Prevent closing dialog while loading
        if (!isLoading) {
          setIsDialogOpen(open);
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              This will end your current session. You will need to log back in to access your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmLogout();
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}