"use client";

import { useEffect, useState } from "react";
import { layoutStyle } from "./index.styles";
import { usePathname } from "next/navigation";

interface CommonProps {
  children: React.ReactNode;
  detail: React.ReactNode;
}

export default function LayoutContent({ children, detail }: CommonProps) {
  const pathname = usePathname();

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

  useEffect(() => {
    const isClose = sessionStorage.getItem("closeDetailModal");
    const isModal = sessionStorage.getItem("openDetailModal");

    if (isModal) {
      setIsOpenDetailModal(true);
      sessionStorage.removeItem("openDetailModal");
    } else if (isClose) {
      setIsOpenDetailModal(false);
      sessionStorage.removeItem("closeDetailModal");
    }
  }, [pathname]);

  return (
    <>
      <div className="relative h-[calc(100vh-72px)]">
        <div className="h-full w-full">{children}</div>

        {isOpenDetailModal && <div className={layoutStyle}>{detail}</div>}
      </div>
    </>
  );
}
