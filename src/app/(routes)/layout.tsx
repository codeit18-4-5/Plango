"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Header } from "@/components/layout";

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);

  const user = useAuthStore(state => state.user);
  const initialized = useAuthStore(state => state.initialized);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [initialized, user]);

  return (
    <>
      <Header isLoginPage={false} user={user} isLogin={isLogin} />
      {children}
    </>
  );
}
