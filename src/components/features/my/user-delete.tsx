"use client";

import { ALERT_TYPE, useAlert } from "@/providers/alert-provider";
import IcLeave from "@/assets/icons/ic-leave.svg";
import { useUserDelete } from "@/hooks/user/use-userQuery";

export function UserDelete({ email }: { email?: string }) {
  const { mutate, isPending } = useUserDelete();
  const { showAlert } = useAlert();

  const handleConfirm = async () => {
    const confirmed = await showAlert({ type: ALERT_TYPE.Leave });
    if (!confirmed) return;
    mutate();
  };

  const isKakaoUser = email?.toLowerCase().endsWith("@kakao.com");

  return (
    <>
      {!isKakaoUser && (
        <button
          onClick={handleConfirm}
          className="flex gap-2 text-base text-red-400"
          disabled={isPending}
        >
          <IcLeave className="h-6 w-6" /> 회원 탈퇴하기
        </button>
      )}
    </>
  );
}
