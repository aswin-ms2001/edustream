import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  highlightedText,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center mb-16 md:mb-20", className)}>
      {badge && (
        <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
        {highlightedText && (
          <>
            {" "}
            <span className="text-primary">{highlightedText}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
