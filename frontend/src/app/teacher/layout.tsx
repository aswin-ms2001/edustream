import AppShell from "@/components/app/layout/AppShell";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["TEACHER"]}>
      <AppShell role="teacher">
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
