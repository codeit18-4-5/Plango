import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";
import "../styles/fonts.css";
import "../styles/globals.css";
import "../styles/custom-react-datepicker.css";
import { AlertProvider } from "@/providers/alert-provider";
import AuthProvider from "@/providers/auth-provider";
import { cookies } from "next/headers";
import getUserFromRefresh from "@/api/auth/get-user-from-refresh";

export const metadata: Metadata = {
  title: "Plango",
  description: "Plango",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // 서버에서 바로 유저 정보 조회
  const { user, accessToken } = await getUserFromRefresh(refreshToken);
  return (
    <html lang="ko">
      <body>
        <AuthProvider initialUser={user} initialAccessToken={accessToken}>
          <QueryProvider>
            <AlertProvider>{children}</AlertProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
