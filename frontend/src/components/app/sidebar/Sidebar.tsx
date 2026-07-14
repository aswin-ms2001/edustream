import { cn } from "@/lib/utils";

import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";

import type { NavigationGroup } from "@/types/navigation";

interface SidebarProps {
  items: NavigationGroup[];
  className?: string;
}

export default function Sidebar({
  items,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-72 flex-col border-r bg-background",
        className
      )}
    >
      <SidebarHeader />

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {items.map((group, groupIndex) => (
          <div
            key={group.title ?? groupIndex}
            className="space-y-1"
          >
            {group.title && (
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
            )}

            {group.items.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
              />
            ))}
          </div>
        ))}
      </nav>

      <SidebarFooter />
    </aside>
  );
}