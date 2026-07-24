import type { AppRole } from "@/types/role";

export function getDashboardPathForRole(role?: AppRole | string): string {
  if (!role) return "/student/dashboard";
  
  const normalized = role.toUpperCase().replace("-", "_");
  
  switch (normalized) {
    case "SYSTEM_ADMIN":
      return "/system-admin/dashboard";
    case "INSTITUTION_ADMIN":
    case "INSTITUTION":
      return "/institution/dashboard";
    case "TEACHER":
      return "/teacher/dashboard";
    case "STUDENT":
    default:
      return "/student/dashboard";
  }
}
