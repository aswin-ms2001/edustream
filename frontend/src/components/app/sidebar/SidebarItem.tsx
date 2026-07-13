import Link from "next/link";

import { cn } from "@/lib/utils";

import type { NavigationItem } from "@/types/navigation";

interface SidebarItemProps {
  item: NavigationItem;
  active?: boolean;
}

export default function SidebarItem({
  item,
  active = false,
}: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        item.disabled && "pointer-events-none opacity-50"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />

      <span className="flex-1">{item.label}</span>

      {item.badge && (
        <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
          {item.badge}
        </span>
      )}
    </Link>
  );
}