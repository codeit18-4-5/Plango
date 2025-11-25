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
  if (!isOpen) return null;

  return (
    <div className={alertOverlayStyle} onClick={onCancel}>
      <div className={alertContainerStyle()} onClick={e => e.stopPropagation()}>
        {(type === ALERT_TYPE.Leave ||
          type === ALERT_TYPE.DeleteComment ||
          type === ALERT_TYPE.DeleteArticle) && (
          <AlertIcon className={alertIcon} alt="Alert Icon" />
        )}
        <div
          className={textContainer({
            spacing:
              type === ALERT_TYPE.Leave ||
              type === ALERT_TYPE.DeleteComment ||
              type === ALERT_TYPE.DeleteArticle
                ? "leave"
                : "default",
          })}
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
    </div>
  );
}
