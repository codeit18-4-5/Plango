"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import Alert from "@/components/ui/alert/alert";

export const ALERT_TYPE = {
  Leave: "leave",
  Logout: "logout",
  Confirm: "confirm",
} as const;

export type AlertType = (typeof ALERT_TYPE)[keyof typeof ALERT_TYPE];

export interface AlertOptions {
  descriptionMessage?: string;
  type?: AlertType;
}

export interface AlertEssentialProps extends AlertOptions {
  isOpen: boolean;
  title?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

interface AlertContextType {
  alert: AlertEssentialProps;
  showAlert: (messageOrOptions?: string | AlertOptions, options?: AlertOptions) => Promise<boolean>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const ALERT_PRESETS: Record<AlertType, Partial<AlertEssentialProps>> = {
  [ALERT_TYPE.Logout]: {
    title: "로그아웃 하시겠어요?",
    confirmText: "로그아웃",
  },
  [ALERT_TYPE.Leave]: {
    title: "회원 탈퇴를 진행하시겠어요?",
    descriptionMessage: "그룹장으로 있는 그룹은 자동으로 삭제되고, </br> 모든 그룹에서 나가집니다.",
    confirmText: "회원 탈퇴",
  },
  [ALERT_TYPE.Confirm]: {
    title: "",
    confirmText: "확인",
  },
};

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertEssentialProps>({
    isOpen: false,
    title: "",
    confirmText: "",
    type: ALERT_TYPE.Confirm,
    onCancel: () => {},
    onConfirm: () => {},
  });
  const [alertResolver, setAlertResolver] = useState<((value: boolean) => void) | null>(null);

  const showAlert = useCallback(
    (messageOrOptions?: string | AlertOptions, options?: AlertOptions): Promise<boolean> => {
      return new Promise(resolve => {
        let title: string | undefined;
        let opts: AlertOptions;

        if (typeof messageOrOptions === "string") {
          title = messageOrOptions;
          opts = options ?? {};
        } else {
          opts = messageOrOptions ?? {};
        }

        const type = opts.type ?? ALERT_TYPE.Confirm;
        const preset = ALERT_PRESETS[type];

        const mergedAlert: AlertEssentialProps = {
          isOpen: true,
          title: title ?? preset?.title ?? "",
          descriptionMessage: opts.descriptionMessage ?? preset?.descriptionMessage ?? "",
          confirmText: preset?.confirmText ?? "확인",
          type,
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false),
        };

        setAlert(mergedAlert);
        setAlertResolver(() => resolve);
      });
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    alert.onConfirm?.();
    if (alertResolver) {
      alertResolver(true);
      setAlertResolver(null);
    }
    setAlert(prev => ({ ...prev, isOpen: false }));
  }, [alert, alertResolver]);

  const handleCancel = useCallback(() => {
    alert.onCancel?.();
    if (alertResolver) {
      alertResolver(false);
      setAlertResolver(null);
    }
    setAlert(prev => ({ ...prev, isOpen: false }));
  }, [alert, alertResolver]);

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
      <Alert
        isOpen={alert.isOpen}
        title={alert.title ?? ""}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText={alert.confirmText}
        descriptionMessage={alert.descriptionMessage}
        type={alert.type ?? ALERT_TYPE.Confirm}
      />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("alert context error");
  }
  return context;
}
