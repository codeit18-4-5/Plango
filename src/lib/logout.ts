import { useAuthStore } from "@/store/auth.store";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const logoutDirect = async () => {
  try {
    await fetch(`${APP_URL}/api/auth/logout`, { method: "POST" });
  } finally {
    useAuthStore.getState().actions.clearAuth();
  }
};
