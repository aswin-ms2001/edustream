export interface NavigationItem {
  label: string;
  href: string;
}

export type AuthNavigationItem = NavigationItem;

export const PUBLIC_NAVIGATION: NavigationItem[] = [
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
];

export const LOGIN_NAVIGATION: AuthNavigationItem[] = [
  {
    label: "Student",
    href: "/student/login",
  },
  {
    label: "Teacher",
    href: "/teacher/login",
  },
  {
    label: "Institution",
    href: "/institution/login",
  },
];

export const REGISTER_NAVIGATION: AuthNavigationItem[] = [
  {
    label: "Student",
    href: "/student/signup",
  },
  {
    label: "Teacher",
    href: "/teacher/signup",
  },
];