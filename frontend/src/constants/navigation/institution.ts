import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  Settings,
  LogOut,
} from "lucide-react";

import type { NavigationGroup } from "@/types/navigation";

export const INSTITUTION_NAVIGATION: NavigationGroup[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/institution/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Teachers",
        href: "/institution/teachers",
        icon: Users,
      },
      {
        label: "Courses",
        href: "/institution/courses",
        icon: BookOpen,
      },
      {
        label: "Batches",
        href: "/institution/batches",
        icon: Layers,
      },
      {
        label: "Settings",
        href: "/institution/settings",
        icon: Settings,
      },
      {
        label: "Logout",
        href: "/logout",
        icon: LogOut,
      },
    ],
  },
];
