import { HOW_IT_WORKS_STEPS } from "@/constants/landing/how-it-works";
import SectionContainer from "@/components/common/SectionContainer";
import SectionHeader from "@/components/common/SectionHeader";

export default function HowItWorksSection() {
  return (
    <SectionContainer id="how-it-works" className="bg-muted/30">
      <SectionHeader
        badge="How It Works"
        title="Start Your Learning Journey"
        highlightedText="In Five Simple Steps"
        description="EduStream makes learning simple, engaging, and structured so you can focus on achieving your goals."
      />

      {/* Timeline */}

      <div className="relative">

        {/* Desktop Line */}

        <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-border lg:block" />

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative text-center"
              >
                {/* Circle */}

                <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-background bg-primary text-white shadow-lg">
                  <Icon className="h-10 w-10" />
                </div>

                {/* Step Number */}

                <div className="mt-6">
                  <span className="text-sm font-semibold text-primary">
                    STEP {index + 1}
                  </span>

                  <h3 className="mt-3 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}