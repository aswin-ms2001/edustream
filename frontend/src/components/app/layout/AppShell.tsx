import Sidebar from "@/components/app/sidebar/Sidebar";
import AppTopbar from "@/components/app/topbar/AppTopbar";
import AppContent from "./AppContent";


import { NavigationGroup } from "@/types/navigation";

interface AppShellProps {
  children: React.ReactNode;
  navigation: NavigationGroup[];
}

export default function AppShell({
  children,
  navigation
}: AppShellProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar items={navigation} />

      <div className="flex flex-1 flex-col">
        <AppTopbar />

        <AppContent>
          {children}
        </AppContent>
      </div>
    </div>
  );
}