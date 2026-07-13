import Link from "next/link";
import {
  Phone,
  MapPin,
  Mail,
} from "lucide-react";

import { FOOTER_SECTIONS } from "@/constants/landing/footer";
import BrandLogo from "@/components/common/BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 focus:outline-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

          {/* Brand */}

          <div className="sm:col-span-2">
            <BrandLogo iconClassName="h-8 w-8" textClassName="font-bold" />

            <p className="mt-6 max-w-md leading-7 text-muted-foreground">
              EduStream is a modern learning platform built to
              provide engaging online education through interactive
              courses, live classes, assignments, and assessments.
            </p>

            <div className="mt-8 flex gap-4">

              <Link
                href="#"
                className="rounded-full border p-3 transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Contact us by phone"
              >
                <Phone className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-3 transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Find our location on map"
              >
                <MapPin className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-3 transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Contact us by email"
              >
                <Mail className="h-5 w-5" />
              </Link>

            </div>

          </div>

          {/* Footer Links */}

          {FOOTER_SECTIONS.map((section) => (

            <div key={section.title}>

              <h3 className="mb-5 text-lg font-semibold">
                {section.title}
              </h3>

              <ul className="space-y-4">

                {section.links.map((link) => (

                  <li key={link.href}>

                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                    </Link>

                  </li>

                ))}

              </ul>

            </div>

          ))}

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">

          <p>
            © {new Date().getFullYear()} EduStream. All rights reserved.
          </p>

          <p>
            Built with ❤️ using Next.js & Shadcn UI
          </p>

        </div>

      </div>
    </footer>
  );
}