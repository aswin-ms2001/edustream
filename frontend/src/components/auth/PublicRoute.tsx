"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectIsAuthenticated, selectIsInitializing } from "@/store/features/auth/authSelectors";
import { getDashboardPathForRole } from "@/lib/auth/roleUtils";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitializing = useAppSelector(selectIsInitializing);

  React.useEffect(() => {
    if (!isInitializing && isAuthenticated && user) {
      router.replace(getDashboardPathForRole(user.role));
    }
  }, [isInitializing, isAuthenticated, user, router]);

  if (isInitializing) {
    return null;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
