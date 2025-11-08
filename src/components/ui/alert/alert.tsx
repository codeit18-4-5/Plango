import { ALERT_TYPE, AlertType } from "@/providers/alert-provider";
import {
  alertButtonStyle,
  alertContainerStyle,
  alertOverlayStyle,
  buttonContainerStyle,
  alertTextStyle,
  alertIcon,
} from "./alert.styles";
import AlertIcon from "@/assets/icons/ic-alert.svg";
import { Button } from "..";

interface AlertProps {
  isOpen: boolean;
  title?: string;
  descriptionMessage?: string;
  confirmText?: string;
  cancelText?: string;
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
    <div className={alertOverlayStyle()}>
      <div className={alertContainerStyle()} onClick={e => e.stopPropagation()}>
        {type === ALERT_TYPE.Leave && <AlertIcon className={alertIcon()} alt="Alert Icon" />}
        {title && (
          <span
            className={alertTextStyle({
              variant: "title",
              spacing: type === ALERT_TYPE.Leave ? "leave" : "default",
            })}
          >
            {title}
          </span>
        )}
        {descriptionMessage && (
          <span
            className={alertTextStyle({ variant: "descriptionMessage" })}
            dangerouslySetInnerHTML={{ __html: descriptionMessage }}
          />
        )}
        <div className={buttonContainerStyle()}>
          {type !== ALERT_TYPE.Confirm && (
            <Button
              className={alertButtonStyle({ variant: "cancel" })}
              intent="secondary"
              onClick={onCancel}
            >
              닫기
            </Button>
          )}
          <Button
            className={alertButtonStyle({ variant: "confirm" })}
            intent="danger"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
