import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";
import "../styles/fonts.css";
import "../styles/globals.css";
import "../styles/custom-react-datepicker.css";
import { AlertProvider } from "@/providers/alert-provider";
import AuthProvider from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "Plango",
  description: "Plango",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <QueryProvider>
            <AlertProvider>{children}</AlertProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
