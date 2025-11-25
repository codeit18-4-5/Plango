"use client";

import { ALERT_TYPE, AlertType } from "@/providers/alert-provider";
import {
  alertButtonStyle,
  alertContainerStyle,
  alertOverlayStyle,
  buttonContainerStyle,
  alertTextStyle,
  alertIcon,
  textContainer,
} from "./alert.styles";
import AlertIcon from "@/assets/icons/ic-alert.svg";
import { Button } from "..";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

interface AlertProps {
  isOpen: boolean;
  title?: string;
  descriptionMessage?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type: AlertType;
}

export default function Alert({
  isOpen,
  title,
  descriptionMessage,
  confirmText,
  onConfirm,
  onCancel,
  type,
}: AlertProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onCancel();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onCancel]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return createPortal(
    <dialog ref={dialogRef} className={alertOverlayStyle}>
      <div className={alertContainerStyle} onClick={e => e.stopPropagation()}>
        {type === ALERT_TYPE.Leave && <AlertIcon className={alertIcon} alt="Alert Icon" />}
        <div
          className={textContainer({ spacing: type === ALERT_TYPE.Leave ? "leave" : "default" })}
        >
          {title && (
            <p
              className={alertTextStyle({
                variant: "title",
              })}
            >
              {title}
            </p>
          )}
          {descriptionMessage && (
            <p
              className={alertTextStyle({ variant: "descriptionMessage" })}
              dangerouslySetInnerHTML={{ __html: descriptionMessage }}
            />
          )}
        </div>
        <div className={buttonContainerStyle}>
          {type !== ALERT_TYPE.Confirm && (
            <Button className={alertButtonStyle} intent="cancel" onClick={onCancel}>
              닫기
            </Button>
          )}
          <Button className={alertButtonStyle} intent="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
