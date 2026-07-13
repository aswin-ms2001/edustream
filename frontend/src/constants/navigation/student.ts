import {
  LayoutDashboard,
  BookOpen,
  Compass,
  BarChart3,
  Video,
  ClipboardCheck,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

import type { NavigationGroup } from "@/types/navigation";

export const STUDENT_NAVIGATION: NavigationGroup[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/student/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "My Courses",
        href: "/student/my-courses",
        icon: BookOpen,
      },
      {
        label: "Discover",
        href: "/student/discover",
        icon: Compass,
      },
      {
        label: "Progress",
        href: "/student/progress",
        icon: BarChart3,
      },
      {
        label: "Live Classes",
        href: "/student/live-classes",
        icon: Video,
      },
      {
        label: "Tests",
        href: "/student/tests",
        icon: ClipboardCheck,
      },
      {
        label: "Forum",
        href: "/student/forum",
        icon: MessageSquare,
      },
      {
        label: "Payments",
        href: "/student/payments",
        icon: CreditCard,
      },
      {
        label: "Settings",
        href: "/student/settings",
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