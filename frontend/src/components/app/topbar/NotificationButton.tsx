"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NotificationButtonProps {
  count?: number;
}

export default function NotificationButton({
  count = 0,
}: NotificationButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative rounded-full"
    >
      <Bell className="h-5 w-5" />

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  );
}