import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CTA_CONTENT } from "@/constants/landing/cta";
import SectionContainer from "@/components/common/SectionContainer";

export default function CTASection() {
  return (
    <SectionContainer id="cta">
      <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-primary to-blue-600 px-6 py-12 sm:px-10 sm:py-20 text-center text-white shadow-2xl">
        <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
          {CTA_CONTENT.badge}
        </span>

        <h2 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          {CTA_CONTENT.title}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
          {CTA_CONTENT.description}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            asChild
          >
            <Link href={CTA_CONTENT.primaryButton.href}>
              {CTA_CONTENT.primaryButton.text}

              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
          >
            <Link href={CTA_CONTENT.secondaryButton.href}>
              {CTA_CONTENT.secondaryButton.text}
            </Link>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}