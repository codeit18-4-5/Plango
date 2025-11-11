import { ReactNode } from "react";
import cn from "@/lib/cn";
import IcKakao from "@/assets/icons/ic-kakao.svg";

export function AuthTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-6 text-center text-heading-l tablet:mb-12">{children}</h2>;
}
export function AuthDivider() {
  return (
    <div
      className={cn(
        "mb-4 mt-6 text-center tablet:mt-12",
        "before:block before:translate-y-3 before:border before:border-gray-600 before:content-['']",
      )}
    >
      <span className="relative inline-block bg-black px-6 text-base">OR</span>
    </div>
  );
}

export function SocialAuthButton({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <div className="flex flex-nowrap items-center justify-between text-base">
      간편 {title}하기
      <button type="button" onClick={onClick} className="h-11 w-11">
        <IcKakao />
      </button>
    </div>
  );
}
