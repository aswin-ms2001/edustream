"use client";

import Sidebar from "@/components/app/sidebar/Sidebar";
import AppTopbar from "@/components/app/topbar/AppTopbar";
import AppContent from "./AppContent";

import { STUDENT_NAVIGATION } from "@/constants/navigation/student";



import { NavigationGroup } from "@/types/navigation";

interface AppShellProps {
  children: React.ReactNode;
  role: "student" ;
}


function getNavigation(role: AppShellProps["role"]) {
  return STUDENT_NAVIGATION;
}

export default function AppShell({
  children,
  role
}: AppShellProps) {

  const navigation = getNavigation(role)

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