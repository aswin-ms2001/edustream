import { WHY_CHOOSE_ITEMS } from "@/constants/landing/why-choose";

export default function WhyChooseSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Why Choose EduStream
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Learn With Confidence,
            <span className="text-primary"> Grow With EduStream</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Everything we build is focused on creating an engaging and enjoyable
            learning experience for every student.
          </p>

        </div>

        <div className="grid auto-rows-auto gap-6 lg:grid-cols-4">

          {WHY_CHOOSE_ITEMS.map((item, index) => {
            const Icon = item.icon;

        const gridClass =
        index === 0
            ? "lg:col-span-2"
            : index === 5
            ? "lg:col-span-2"
            : "";

            return (
              <div
                key={item.title}
                className={`${gridClass} rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl`}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="mb-4 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}