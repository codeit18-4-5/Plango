"use client";

import { useEffect, useState } from "react";
import { layoutStyle } from "../index.styles";
import { usePathname } from "next/navigation";
import useModalStore from "@/store/modal.store";

interface CommonProps {
  children: React.ReactNode;
  detail: React.ReactNode;
}

export default function LayoutContent({ children, detail }: CommonProps) {
  const pathname = usePathname();
  const { isOpen } = useModalStore();

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

  useEffect(() => {
    const checkModal = () => {
      if (isOpen) {
        setIsOpenDetailModal(true);
      } else {
        setIsOpenDetailModal(false);
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
