import {
  BookOpen,
  Video,
  GraduationCap,
  Trophy,
  ClipboardCheck,
  MessageSquare,
} from "lucide-react";


interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: BookOpen,
    title: "Interactive Courses",
    description:
      "High-quality learning experiences designed to help you master new skills at your own pace.",
  },
  {
    icon: Video,
    title: "Live Classes",
    description:
      "Join engaging live sessions where you can interact directly with instructors.",
  },
  {
    icon: ClipboardCheck,
    title: "Assignments & Quizzes",
    description:
      "Strengthen your understanding through practical exercises and assessments.",
  },
  {
    icon: GraduationCap,
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with detailed progress tracking and milestones.",
  },
  {
    icon: Trophy,
    title: "Certificates",
    description:
      "Receive certificates after successfully completing your learning journey.",
  },
  {
    icon: MessageSquare,
    title: "Community Learning",
    description:
      "Collaborate, ask questions, and learn together with fellow students and teachers.",
  },
];
