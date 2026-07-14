"use client";

import { Menu } from "lucide-react";

import type { NavigationGroup } from "@/types/navigation";

import Sidebar from "@/components/app/sidebar/Sidebar";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileDrawerProps {
  navigation: NavigationGroup[];
}

export default function MobileDrawer({
  navigation,
}: MobileDrawerProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-72 p-0"
        >
          <Sidebar
            items={navigation}
            className="w-full border-r-0"
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}