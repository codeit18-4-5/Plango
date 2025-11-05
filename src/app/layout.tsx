import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";
import "../styles/fonts.css";
import "../styles/globals.css";

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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
