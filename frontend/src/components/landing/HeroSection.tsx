import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/common/SectionContainer";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white dark:from-slate-950 dark:via-background dark:to-background"
        aria-hidden="true"
      />

      <SectionContainer
        as="div"
        className="py-0 focus:outline-none"
        containerClassName="flex min-h-[calc(100vh-80px)] flex-col-reverse items-center gap-16 py-20 lg:flex-row lg:py-0"
      >
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}

          <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            🎓 Modern Learning Platform
          </div>

          {/* Heading */}

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
            Everything You Need
            <br />
            <span className="text-primary">To Learn Without Limits.</span>
          </h1>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-muted-foreground lg:mx-0">
            Master new skills through interactive courses, live classes,
            assignments, quizzes, and real-world learning experiences—all in
            one powerful platform designed to help you achieve your goals.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button size="lg" asChild>
              <Link href="/student/signup">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">
                <PlayCircle className="mr-2 h-5 w-5" />
                Explore Courses
              </Link>
            </Button>
          </div>

          {/* Feature Highlights */}

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <span className="text-2xl" role="img" aria-label="Books">📚</span>
              <p className="mt-2 text-sm font-medium">
                Interactive Courses
              </p>
            </div>

            <div>
              <span className="text-2xl" role="img" aria-label="Video camera">🎥</span>
              <p className="mt-2 text-sm font-medium">
                Live Classes
              </p>
            </div>

            <div>
              <span className="text-2xl" role="img" aria-label="Memo">📝</span>
              <p className="mt-2 text-sm font-medium">
                Assignments
              </p>
            </div>

            <div>
              <span className="text-2xl" role="img" aria-label="Trophy">🏆</span>
              <p className="mt-2 text-sm font-medium">
                Certificates
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}

        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-2xl">
            {/* Decorative Blur */}

            <div
              className="absolute -left-8 -top-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
              aria-hidden="true"
            />

            {/* Dashboard Image */}

            <div className="relative overflow-hidden rounded-3xl border bg-white shadow-2xl dark:bg-slate-900">
              <Image
                src="/images/landing/dashboard-preview.png"
                alt="EduStream Dashboard preview displaying student learning progress"
                width={1000}
                height={700}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}