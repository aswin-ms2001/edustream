import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  className?: string;
}

export default function SidebarFooter({
  className,
}: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "mt-auto border-t p-4",
        className
      )}
    >
      {/* Footer content will be added after authentication */}

    </div>
  );
}