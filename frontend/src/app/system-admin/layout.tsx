import AppShell from "@/components/app/layout/AppShell";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SystemAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
      <AppShell role="system-admin">
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
