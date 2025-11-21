import { useAuthStore } from "@/store/auth.store";

export const logoutDirect = async () => {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } finally {
    useAuthStore.getState().actions.clearAuth();
  }
};
