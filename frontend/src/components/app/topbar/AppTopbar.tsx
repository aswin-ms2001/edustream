import { cn } from "@/lib/utils";

import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";

interface AppTopbarProps {
  className?: string;
}

export default function AppTopbar({
  className,
}: AppTopbarProps) {
  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between border-b bg-background px-6",
        className
      )}
    >
      <SearchBar placeholder="Search..." />

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