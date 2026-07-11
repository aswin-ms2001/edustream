import {
  BookOpen,
  Video,
  ClipboardCheck,
  Award,
} from "lucide-react";

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
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need To Learn Better
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            EduStream combines interactive learning tools into one
            modern platform, making learning engaging, structured,
            and effective.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
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
      </div>
    </section>
  );
}