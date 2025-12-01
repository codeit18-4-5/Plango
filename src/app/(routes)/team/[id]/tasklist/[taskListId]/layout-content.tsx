"use client";

import { useEffect, useState } from "react";
import { layoutStyle } from "../index.styles";
import { usePathname } from "next/navigation";
import useModalStore from "@/store/modal.store";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

interface CommonProps {
  children: React.ReactNode;
  detail: React.ReactNode;
}

export default function LayoutContent({ children, detail }: CommonProps) {
  const pathname = usePathname();
  const { isOpen, closeModal } = useModalStore();
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

  const checkModal = () => {
    if (isOpen) {
      setIsOpenDetailModal(true);
    } else {
      setIsOpenDetailModal(false);
    }
  };

  const regexOnlyList = /^\/team\/\d+\/tasklist\/\d+$/;

  useEffect(() => {
    if (regexOnlyList.test(pathname)) {
      closeModal();
    }
    checkModal();
  }, [pathname]);

  return (
    <>
      <div className="relative h-[calc(100vh-72px)] overflow-hidden">
        <div className="h-full w-full">{children}</div>

        {isOpenDetailModal &&
          createPortal(
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  key="modal"
                  className={layoutStyle}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 200,
                  }}
                >
                  {detail}
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </>
  );
}
