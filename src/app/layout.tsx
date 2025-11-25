import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";
import "../styles/fonts.css";
import "../styles/globals.css";
import "../styles/custom-react-datepicker.css";
import { AlertProvider } from "@/providers/alert-provider";
import AuthProvider from "@/providers/auth-provider";
import getSSRUser from "@/api/user/get-ssr-user";

export const metadata: Metadata = {
  title: "Plango",
  description: "Plango",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // 초기 유저 정보 조회
  const user = await getSSRUser();

  return (
    <html lang="ko">
      <body>
        <AuthProvider initialUser={user}>
          <QueryProvider>
            <AlertProvider>{children}</AlertProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
