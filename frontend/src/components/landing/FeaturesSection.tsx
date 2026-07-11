import { FEATURES } from "@/constants/landing/features";

export default function FeaturesSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Why EduStream?
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything You Need To
            <span className="text-primary"> Learn Smarter</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            EduStream combines modern learning tools into one seamless platform,
            helping students stay motivated and teachers deliver engaging learning
            experiences.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

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
      </div>
    </section>
  );
}