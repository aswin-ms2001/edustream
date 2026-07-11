"use client";

import Link from "next/link";
import { Menu, ChevronDown, GraduationCap } from "lucide-react";

import {
  PUBLIC_NAVIGATION,
  LOGIN_NAVIGATION,
  REGISTER_NAVIGATION,
} from "@/constants/navigation";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function HomeNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <GraduationCap className="h-8 w-8 text-primary" />

          <span className="text-2xl font-black">
            EduStream
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">
          {PUBLIC_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}

        <div className="hidden items-center gap-3 lg:flex">

          {/* Login */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>

              <Button variant="ghost">

                Login

                <ChevronDown className="ml-2 h-4 w-4" />

              </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              {LOGIN_NAVIGATION.map((item) => (

                <DropdownMenuItem key={item.href} asChild>

                  <Link href={item.href}>
                    {item.label}
                  </Link>

                </DropdownMenuItem>

              ))}

            </DropdownMenuContent>

          </DropdownMenu>

          {/* Register */}

          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <Button>

                Register

                <ChevronDown className="ml-2 h-4 w-4" />

              </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              {REGISTER_NAVIGATION.map((item) => (

                <DropdownMenuItem key={item.href} asChild>

                  <Link href={item.href}>
                    {item.label}
                  </Link>

                </DropdownMenuItem>

              ))}

            </DropdownMenuContent>

          </DropdownMenu>

        </div>

        {/* Mobile */}

        <div className="lg:hidden">

          <Sheet>

            <SheetTrigger asChild>

              <Button
                size="icon"
                variant="ghost"
              >
                <Menu className="h-6 w-6" />
              </Button>

            </SheetTrigger>

            <SheetContent side="right">

              <div className="mt-10 flex flex-col gap-6">

                {PUBLIC_NAVIGATION.map((item) => (

                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                  >
                    {item.label}
                  </Link>

                ))}

                <hr />

                <p className="font-semibold">
                  Login
                </p>

                {LOGIN_NAVIGATION.map((item) => (

                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    {item.label}
                  </Link>

                ))}

                <hr />

                <p className="font-semibold">
                  Register
                </p>

                {REGISTER_NAVIGATION.map((item) => (

                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    {item.label}
                  </Link>

                ))}

              </div>

            </SheetContent>

          </Sheet>

        </div>

      </div>
    </header>
  );
}