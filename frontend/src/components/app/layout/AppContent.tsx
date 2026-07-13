import { cn } from "@/lib/utils";

interface AppContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppContent({
  children,
  className,
}: AppContentProps) {
  return (
    <main
      className={cn(
        "flex-1 overflow-y-auto p-6",
        className
      )}
    >
      {children}
    </main>
  );
}