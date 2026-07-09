import {
  BookOpen,
  Video,
  ClipboardCheck,
  Award,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

export interface WhyChooseItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    icon: BookOpen,
    title: "Structured Courses",
    description:
      "Learn through well-organized course content designed for effective learning.",
  },
  {
    icon: Video,
    title: "Live Interactive Classes",
    description:
      "Join live sessions where you can interact with instructors in real time.",
  },
  {
    icon: ClipboardCheck,
    title: "Assignments & Assessments",
    description:
      "Test your knowledge through quizzes and assignments after every learning phase.",
  },
  {
    icon: Award,
    title: "Course Certificates",
    description:
      "Earn certificates after successfully completing your enrolled courses.",
  },
  {
    icon: GraduationCap,
    title: "Expert Instructors",
    description:
      "Learn from experienced educators committed to helping you succeed.",
  },
  {
    icon: MessageSquare,
    title: "Community Discussions",
    description:
      "Collaborate, ask questions and grow together with fellow learners.",
  },
];