"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectIsAuthenticated, selectIsInitializing } from "@/store/features/auth/authSelectors";
import { getDashboardPathForRole } from "@/lib/auth/roleUtils";
import type { AppRole } from "@/types/role";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitializing = useAppSelector(selectIsInitializing);

  React.useEffect(() => {
    if (!isInitializing) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (user && allowedRoles && allowedRoles.length > 0) {
        const isAllowed = allowedRoles.includes(user.role);
        if (!isAllowed) {
          router.replace(getDashboardPathForRole(user.role));
        }
      }
    }
  }, [isInitializing, isAuthenticated, user, allowedRoles, router]);

  if (isInitializing) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (user && allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
