import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";
import "../styles/fonts.css";
import "../styles/globals.css";
import "../styles/custom-react-datepicker.css";
import { AlertProvider } from "@/providers/alert-provider";
import AuthProvider from "@/providers/auth-provider";
import { cookies } from "next/headers";
import getSSRUser from "@/api/user/get-ssr-user";
import getNewAccessToken from "@/api/auth/get-new-access-token";

export const metadata: Metadata = {
  title: "Plango",
  description: "Plango",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // 초기 유저 정보 조회
  const user = await getSSRUser();
  const accessToken = await getNewAccessToken(refreshToken);

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
