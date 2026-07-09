import {
  Award,
  BookOpen,
  ClipboardCheck,
  PlayCircle,
  UserPlus,
} from "lucide-react";

export interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up in minutes and create your EduStream student account.",
  },
  {
    icon: BookOpen,
    title: "Browse & Enroll",
    description:
      "Explore available courses and enroll in the ones that match your goals.",
  },
  {
    icon: PlayCircle,
    title: "Attend Live Classes",
    description:
      "Learn through engaging live sessions and interactive course materials.",
  },
  {
    icon: ClipboardCheck,
    title: "Complete Assessments",
    description:
      "Submit assignments and complete quizzes to strengthen your knowledge.",
  },
  {
    icon: Award,
    title: "Earn Your Certificate",
    description:
      "Successfully finish your course and receive your completion certificate.",
  },
];