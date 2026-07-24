"use client";

import Sidebar from "@/components/app/sidebar/Sidebar";
import AppTopbar from "@/components/app/topbar/AppTopbar";
import AppContent from "./AppContent";

import { STUDENT_NAVIGATION } from "@/constants/navigation/student";
import { SYSTEM_ADMIN_NAVIGATION } from "@/constants/navigation/system-admin";
import { INSTITUTION_NAVIGATION } from "@/constants/navigation/institution";
import { TEACHER_NAVIGATION } from "@/constants/navigation/teacher";

import type { NavigationGroup } from "@/types/navigation";
import type { AppRole, RouteSection } from "@/types/role";

interface AppShellProps {
  children: React.ReactNode;
  role: AppRole | RouteSection;
}

function getNavigation(role: AppShellProps["role"]): NavigationGroup[] {
  switch (role) {
    case "SYSTEM_ADMIN":
    case "system-admin":
      return SYSTEM_ADMIN_NAVIGATION;
    case "INSTITUTION_ADMIN":
    case "institution":
      return INSTITUTION_NAVIGATION;
    case "TEACHER":
    case "teacher":
      return TEACHER_NAVIGATION;
    case "STUDENT":
    case "student":
    default:
      return STUDENT_NAVIGATION;
  }
}

export default function AppShell({
  children,
  role
}: AppShellProps) {
  const navigation = getNavigation(role);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar items={navigation} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <AppTopbar navigation={navigation} />

        <AppContent>
          {children}
        </AppContent>
      </div>
    </div>
  );
}