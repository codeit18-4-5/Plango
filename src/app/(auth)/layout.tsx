"use client";
import { AuthErrorModal } from "@/components/features/auth";
import { Container } from "@/components/layout";
import { useUIStore } from "@/store/auth.store";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { authError, setAuthError } = useUIStore();
  return (
    <Container as="main" className="flex min-h-dvh max-w-[460px] flex-col tablet:justify-center">
      <div>{children}</div>
      {authError && <AuthErrorModal message={authError} onClose={() => setAuthError(null)} />}
    </Container>
  );
}
