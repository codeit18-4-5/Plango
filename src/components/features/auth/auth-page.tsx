import { ReactNode } from "react";
import cn from "@/lib/cn";
import Link from "next/link";
import { Input, Modal } from "@/components/ui";
import KakaoLogin from "./kakao-login";
type AuthLinkProps = {
  message: string;
  linkText: string;
  href: string;
};
type AuthFieldProps = {
  id: string;
  errorMsg?: string;
  label: string;
  children: ReactNode;
};

export function AuthTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-6 text-center text-heading-l tablet:mb-12">{children}</h2>;
}

export function AuthDivider() {
  return (
    <div
      className={cn(
        "mb-4 text-center tablet:mt-6",
        "before:block before:translate-y-3 before:border before:border-gray-600 before:content-['']",
      )}
    >
      <span className="relative inline-block bg-black px-6 text-base">OR</span>
    </div>
  );
}

export function AuthLink({ message, linkText, href }: AuthLinkProps) {
  return (
    <div className="flex justify-center gap-3 py-6 text-base">
      <span className="text-white">{message}</span>
      <Link href={href} className="text-pink-400 underline">
        {linkText}
      </Link>
    </div>
  );
}

export function AuthField({ id, label, errorMsg, children }: AuthFieldProps) {
  return (
    <Input id={id} errorMsg={errorMsg}>
      <Input.Label label={label} />
      {children}
      <Input.Error />
    </Input>
  );
}

export function SocialAuthButton({ title }: { title: string }) {
  return (
    <div className="flex flex-nowrap items-center justify-between text-base">
      간편 {title}하기
      <KakaoLogin />
    </div>
  );
}

export function AuthErrorModal({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <Modal.HeaderWithClose title="" />
      <Modal.Body>
        <p className="text-center text-base">
          {message} <br />
          다시 시도해주세요.
        </p>
      </Modal.Body>
      <Modal.FooterWithOnlyConfirm confirmButtonTitle="확인" onConfirm={onClose} />
    </Modal>
  );
}
