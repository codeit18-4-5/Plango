import { Container } from "@/components/layout";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container as="main" className="flex min-h-dvh max-w-[460px] flex-col tablet:justify-center">
      <div>{children}</div>
    </Container>
  );
}
