import { cn } from "@/lib/utils";

import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";
import MobileDrawer from "@/components/app/layout/MobileDrawer";
import type { NavigationGroup } from "@/types/navigation";

interface AppTopbarProps {
  className?: string;
  navigation: NavigationGroup[];
}

export default function AppTopbar({
  className,
  navigation
}: AppTopbarProps) {
  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between border-b bg-background px-6",
        className
      )}
    >
      <div className="flex items-center gap-3">

          <MobileDrawer navigation={navigation} />

          <SearchBar placeholder="Search..." />

      </div>
      <div className="flex items-center gap-4">
        <NotificationButton count={3} />

        <ProfileDropdown
          user={{
            name: "Aswin M S",
            role: "Student",
          }}
        />
      </div>
    </header>
  );
}