import {
  LayoutDashboard,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";

import type { NavigationGroup } from "@/types/navigation";

export const SYSTEM_ADMIN_NAVIGATION: NavigationGroup[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/system-admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Institution Admins",
        href: "/system-admin/institution-admins",
        icon: Building2,
      },
      {
        label: "Settings",
        href: "/system-admin/settings",
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
