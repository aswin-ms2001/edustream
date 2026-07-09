import Link from "next/link";
import {
  GraduationCap,
    Phone,
    MapPin,
  Mail,
} from "lucide-react";

import { FOOTER_SECTIONS } from "@/constants/landing/footer";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 lg:grid-cols-5">

          {/* Brand */}

          <div className="lg:col-span-2">

            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <GraduationCap className="h-8 w-8 text-primary" />

              <span className="text-2xl font-bold">
                EduStream
              </span>
            </Link>

            <p className="mt-6 max-w-md leading-7 text-muted-foreground">
              EduStream is a modern learning platform built to
              provide engaging online education through interactive
              courses, live classes, assignments, and assessments.
            </p>

            <div className="mt-8 flex gap-4">

              <Link
                href="#"
                className="rounded-full border p-3 transition-colors hover:bg-primary hover:text-white"
              >
                <Phone className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-3 transition-colors hover:bg-primary hover:text-white"
              >
                <MapPin className="h-5 w-5" />
              </Link>


              <Link
                href="#"
                className="rounded-full border p-3 transition-colors hover:bg-primary hover:text-white"
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
                      className="text-muted-foreground transition-colors hover:text-primary"
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