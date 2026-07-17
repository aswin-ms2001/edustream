"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated, selectIsInitializing } from "@/store/features/auth/authSelectors";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitializing = useAppSelector(selectIsInitializing);

  React.useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace("/student/dashboard");
    }
  }, [isInitializing, isAuthenticated, router]);

  if (isInitializing) {
    return null;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
