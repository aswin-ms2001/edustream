import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import type { NavigationGroup } from "@/types/navigation";

export const TEACHER_NAVIGATION: NavigationGroup[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/teacher/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "My Courses",
        href: "/teacher/my-courses",
        icon: BookOpen,
      },
      {
        label: "Students",
        href: "/teacher/students",
        icon: Users,
      },
      {
        label: "Settings",
        href: "/teacher/settings",
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
