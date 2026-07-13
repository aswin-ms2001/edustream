import { FEATURES } from "@/constants/landing/features";
import SectionContainer from "@/components/common/SectionContainer";
import SectionHeader from "@/components/common/SectionHeader";

export default function FeaturesSection() {
  return (
    <SectionContainer id="features">
      <SectionHeader
        badge="Why EduStream?"
        title="Everything You Need To"
        highlightedText="Learn Smarter"
        description="EduStream combines modern learning tools into one seamless platform, helping students stay motivated and teachers deliver engaging learning experiences."
      />

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                <Icon className="h-7 w-7 text-primary group-hover:text-white" />
              </div>

              <h3 className="mb-4 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}