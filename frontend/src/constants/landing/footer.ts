export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Platform",
    links: [
      {
        label: "Courses",
        href: "/courses",
      },
      {
        label: "Pricing",
        href: "/pricing",
      },
      {
        label: "About",
        href: "/about",
      },
    ],
  },
  {
    title: "Students",
    links: [
      {
        label: "Student Login",
        href: "/student/login",
      },
      {
        label: "Student Registration",
        href: "/student/signup",
      },
    ],
  },
  {
    title: "Teachers",
    links: [
      {
        label: "Teacher Login",
        href: "/teacher/login",
      },
      {
        label: "Teacher Registration",
        href: "/teacher/signup",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "/privacy",
      },
      {
        label: "Terms & Conditions",
        href: "/terms",
      },
    ],
  },
];