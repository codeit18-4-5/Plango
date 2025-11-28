"use client";
import { AuthErrorModal } from "@/components/features/auth";
import { Container, Header } from "@/components/layout";
import { useUIStore } from "@/store/auth.store";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { authError, setAuthError } = useUIStore();
  return (
    <>
      <Header isLoginPage={true} />
      <Container
        as="main"
        className="full-scroll-h flex max-w-[460px] flex-col pb-10 tablet:justify-center desktop:pb-20"
      >
        {children}
        {authError && <AuthErrorModal message={authError} onClose={() => setAuthError(null)} />}
      </Container>
    </>
  );
}
