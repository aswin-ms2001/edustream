import {
  BookOpen,
  Video,
  ClipboardCheck,
  Award,
} from "lucide-react";
import SectionContainer from "@/components/common/SectionContainer";
import SectionHeader from "@/components/common/SectionHeader";

const stats = [
  {
    icon: BookOpen,
    title: "Interactive Courses",
    description:
      "Well-structured courses designed for practical learning.",
  },
  {
    icon: Video,
    title: "Live Classes",
    description:
      "Attend live sessions and interact directly with instructors.",
  },
  {
    icon: ClipboardCheck,
    title: "Assessments",
    description:
      "Practice with quizzes, assignments and real-world tasks.",
  },
  {
    icon: Award,
    title: "Certificates",
    description:
      "Earn certificates after successfully completing courses.",
  },
];

export default function StatsSection() {
  return (
    <SectionContainer id="stats" className="border-y bg-muted/30">
      <SectionHeader
        title="Everything You Need To Learn Better"
        description="EduStream combines interactive learning tools into one modern platform, making learning engaging, structured, and effective."
      />

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                {stat.title}
              </h3>

              <p className="text-muted-foreground">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}