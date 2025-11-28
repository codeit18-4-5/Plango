"use client";

import {
  modalOverlayStyle,
  modalContainerStyle,
  headerWrapperStyle,
  titleStyle,
  bodyStyle,
  floatingButtonWrapperStyle,
} from "./modal.style";
import Button from "../button/button";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import CloseIcon from "@/assets/icons/ic-cancel.svg";
import { Container as ModalLayoutContainer } from "@/components/layout";
import { createPortal } from "react-dom";

interface ModalContextType {
  onClose: () => void;
}

interface ModalBodyProps {
  children: ReactNode;
}

interface ModalProps extends ModalContextType, ModalBodyProps {
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal Context Error");
  }
  return context;
};

const HeaderWithOnlyTitle = ({ title }: { title: string }) => {
  return (
    <div className={headerWrapperStyle({ type: "titleOnly" })}>
      <h3 className={titleStyle()}>{title}</h3>
    </div>
  );
};

const HeaderWithClose = ({ title }: { title: string }) => {
  const { onClose } = useModalContext();

  return (
    <div className={headerWrapperStyle()}>
      <h3 className={titleStyle({ type: "closeAreaTitle" })}>{title}</h3>
      <span className="ml-auto block h-[24px] w-[24px] cursor-pointer" onClick={onClose}>
        <CloseIcon />
      </span>
    </div>
  );
};

const Body = ({ children }: ModalBodyProps) => {
  return <div className={bodyStyle}>{children}</div>;
};

const FooterWithOnlyConfirm = ({
  confirmButtonTitle,
  onConfirm,
  isSubmit = false,
  disabled = false,
}: {
  confirmButtonTitle: string;
  onConfirm?: () => void;
  isSubmit?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div className="relative">
      <div className={floatingButtonWrapperStyle}>
        <Button
          className="mb-[24px] w-[100%]"
          onClick={!isSubmit ? onConfirm : undefined}
          type={isSubmit ? `submit` : `button`}
          disabled={disabled}
        >
          {confirmButtonTitle}
        </Button>
      </div>
    </div>
  );
};

const FooterWithButtons = ({
  confirmButtonTitle,
  onConfirm,
  isSubmit = false,
  disabled = false,
}: {
  confirmButtonTitle: string;
  onConfirm?: () => void;
  isSubmit?: boolean;
  disabled?: boolean;
}) => {
  const { onClose } = useModalContext();

  return (
    <div className="flex justify-center gap-[8px]">
      <Button className="w-[136px]" intent="secondary" onClick={onClose}>
        닫기
      </Button>
      <Button
        className="w-[136px]"
        onClick={!isSubmit ? onConfirm : undefined}
        type={isSubmit ? `submit` : `button`}
        disabled={disabled}
      >
        {confirmButtonTitle}
      </Button>
    </div>
  );
};

function Modal({ children, isOpen, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <dialog ref={dialogRef} className={modalOverlayStyle}>
        <ModalLayoutContainer className={modalContainerStyle}>{children}</ModalLayoutContainer>
      </dialog>
    </ModalContext.Provider>,
    document.body,
  );
}

Modal.HeaderWithOnlyTitle = HeaderWithOnlyTitle;
Modal.HeaderWithClose = HeaderWithClose;
Modal.Body = Body;
Modal.FooterWithOnlyConfirm = FooterWithOnlyConfirm;
Modal.FooterWithButtons = FooterWithButtons;

export default Modal;
