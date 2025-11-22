"use client";
import { Header } from "@/components/layout";

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header isLoginPage={false} />
      {children}
    </>
  );
}
