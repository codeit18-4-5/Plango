"use client";

import { Form, Modal } from "@/components/ui";
import { SendEmailFormField } from "./form-fields";
import { sendEmailSchema, SendEmailSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSendResetPasswordEmail } from "@/types/user";
import { useUIStore } from "@/store/auth.store";
import postSendResetPasswordEmail from "@/api/user/post-send-reset-password-email";
import { sendEmailErrorHandler } from "@/lib/error";

type ForgotPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
};
const PASSWORD_REDIRECT_URL = process.env.NEXT_PUBLIC_PASSWORD_REDIRECT_URL;

export default function ForgotPassword({ isOpen, onClose }: ForgotPasswordProps) {
  const setAuthError = useUIStore(state => state.setAuthError);

  const handleEmailSubmit = async (data: SendEmailSchema) => {
    if (!PASSWORD_REDIRECT_URL) {
      if (process.env.NODE_ENV === "development") {
        console.error("PASSWORD_REDIRECT_URL을 설정해주세요");
      }
      return;
    }

    const payload: UserSendResetPasswordEmail = {
      email: data.sendEmail,
      redirectUrl: PASSWORD_REDIRECT_URL,
    };

    await postSendResetPasswordEmail(payload);
    // @TODO toast로 대체할 예정
    setAuthError("이메일이 발송되었습니다.");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mt-4 flex flex-col gap-6">
        <div className="text-center">
          <p className="mb-2 text-base">비밀번호 재설정</p>
          <p className="text-sm text-gray-300">비밀번호 재설정 링크를 보내드립니다.</p>
        </div>
        <Form<SendEmailSchema>
          onSubmit={handleEmailSubmit}
          resolver={zodResolver(sendEmailSchema)}
          onServerError={sendEmailErrorHandler}
          mode="onSubmit"
          reValidateMode="onSubmit"
        >
          <SendEmailFormField onClose={onClose} />
        </Form>
      </div>
    </Modal>
  );
}
