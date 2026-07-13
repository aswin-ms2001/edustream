import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  as?: "section" | "div" | "header" | "footer";
}

export default function SectionContainer({
  children,
  className,
  containerClassName,
  id,
  as: Component = "section",
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "py-16 md:py-24 lg:py-28 focus:outline-none scroll-mt-20",
        className
      )}
    >
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </Component>
  );
}
