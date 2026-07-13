import AppShell from "@/components/app/layout/AppShell";

import { STUDENT_NAVIGATION } from "@/constants/navigation/student";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell navigation={STUDENT_NAVIGATION}>
      {children}
    </AppShell>
  );
}