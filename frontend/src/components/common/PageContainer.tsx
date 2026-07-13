import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <main className={cn("min-h-screen flex flex-col focus:outline-none", className)}>
      {children}
    </main>
  );
}
