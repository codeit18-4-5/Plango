"use client";

import { useEffect, useState } from "react";
import { layoutStyle } from "../index.styles";
import { usePathname } from "next/navigation";

interface CommonProps {
  children: React.ReactNode;
  detail: React.ReactNode;
}

export default function LayoutContent({ children, detail }: CommonProps) {
  const pathname = usePathname();

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

  useEffect(() => {
    const checkModal = () => {
      const isClose = sessionStorage.getItem("closeDetailModal");
      const isOpen = sessionStorage.getItem("openDetailModal");

      if (isOpen) {
        setIsOpenDetailModal(true);
        sessionStorage.removeItem("openDetailModal");
      } else if (isClose) {
        setIsOpenDetailModal(false);
        sessionStorage.removeItem("closeDetailModal");
      }
    };

    checkModal();
  }, [pathname]);

  return (
    <>
      <div className="relative h-[calc(100vh-72px)] overflow-hidden">
        <div className="scroll-bar h-full w-full overflow-y-auto">{children}</div>

        {isOpenDetailModal && <div className={layoutStyle}>{detail}</div>}
      </div>
    </>
  );
}
