"use client";

import { useEffect, useState } from "react";
import { layoutStyle } from "../index.styles";
import { usePathname } from "next/navigation";
import useModalStore from "@/store/modal.store";
import { createPortal } from "react-dom";

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
        <div className="h-full w-full">{children}</div>

        {isOpenDetailModal &&
          createPortal(<div className={layoutStyle}>{detail}</div>, document.body)}
      </div>
    </>
  );
}
