import { WHY_CHOOSE_ITEMS } from "@/constants/landing/why-choose";
import SectionContainer from "@/components/common/SectionContainer";
import SectionHeader from "@/components/common/SectionHeader";

export default function WhyChooseSection() {
  return (
    <SectionContainer id="why-choose">
      <SectionHeader
        badge="Why Choose EduStream"
        title="Learn With Confidence,"
        highlightedText="Grow With EduStream"
        description="Everything we build is focused on creating an engaging and enjoyable learning experience for every student."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-6">
        {WHY_CHOOSE_ITEMS.map((item, index) => {
          const Icon = item.icon;

          const gridClass =
            index === 0
              ? "md:col-span-2"
              : index === 5
              ? "md:col-span-2"
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
    </SectionContainer>
  );
}