import { HOW_IT_WORKS_STEPS } from "@/constants/landing/how-it-works";

export default function HowItWorksSection() {
  return (
    <section className="bg-muted/30 py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Start Your Learning Journey
            <span className="text-primary"> In Five Simple Steps</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            EduStream makes learning simple, engaging, and structured so you can
            focus on achieving your goals.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mt-24">

          {/* Desktop Line */}

          <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-border lg:block" />

          <div className="grid gap-10 lg:grid-cols-5">
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
      </div>
    </section>
  );
}