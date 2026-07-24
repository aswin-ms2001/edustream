import AppShell from "@/components/app/layout/AppShell";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["INSTITUTION_ADMIN"]}>
      <AppShell role="institution">
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
