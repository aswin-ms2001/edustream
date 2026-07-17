import AppShell from "@/components/app/layout/AppShell";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { STUDENT_NAVIGATION } from "@/constants/navigation/student";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AppShell role="student">
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}