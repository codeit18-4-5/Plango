"use client";

import Header from "@/components/layout/header/header";
import { useSelectedLayoutSegment } from "next/navigation";
import { memo } from "react";

interface CommonProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const LayoutContent = memo<CommonProps>(({ children, modal }) => {
  const detailSegment = useSelectedLayoutSegment("modal");
  const hasDetail = !!detailSegment;

  return (
    <>
      <Header isLoginPage />
      <div className="relative h-[calc(100vh-72px)]">
        <div className={hasDetail ? "h-full w-full" : "h-full w-full"}>{children}</div>

        {hasDetail && (
          <div className="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto bg-gray-800 sm:w-[60%] lg:w-[779px]">
            {modal}
          </div>
        )}
      </div>
    </>
  );
});

LayoutContent.displayName = "LayoutContent";

export default function Layout({ children, modal }: CommonProps) {
  return <LayoutContent children={children} modal={modal} />;
}
