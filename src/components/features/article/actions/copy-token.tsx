"use client";

import cn from "@/lib/cn";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { ArticleConfirmModal } from "@/components/features/article/layout";
import { Button } from "@/components/ui";
import { isTokenExpire } from "@/lib/utils";
import { ARTICLE_FORM_STYLES } from "@/components/features/article/index.styles";

export default function CopyToken({ token }: { token: string }) {
  const isExpired = isTokenExpire(token);
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const handleInputClick = useCallback(() => {
    if (isExpired) {
      // TODO: 만료 토스트 추가 예정
      return;
    }
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowJoinModal(true);
  }, [isExpired, user]);

  // TODO: 복사 토스트 추가 예정
  const handleCopy = useCallback(() => {
    if (!isExpired) {
      navigator.clipboard.writeText(token ?? "");
    }
  }, [token, isExpired]);

  const handleJoin = useCallback(() => {
    router.replace(`/team/join?token=${encodeURIComponent(token)}`);
  }, [token, router]);

  const handleLogin = useCallback(() => {
    router.replace(`/team/join?token=${encodeURIComponent(token)}`);
  }, [router, token]);

  return (
    <>
      <p className="mb-[10px]">
        <b>팀 참여하기 </b>
        <span className="text-caption text-gray-500">토큰을 복사해 팀에 참여해보세요.</span>
      </p>
      <Button
        type="button"
        className={cn(ARTICLE_FORM_STYLES.form.field.copyToken)}
        onClick={() => {
          handleInputClick();
          handleCopy();
        }}
        disabled={isExpired}
      >
        {isExpired ? "토큰이 만료되었습니다" : "토큰 복사하기"}
      </Button>

      {showLoginModal && (
        <ArticleConfirmModal
          title="로그인이 필요합니다."
          message="로그인 후 이용이 가능합니다."
          confirmButtonTitle="로그인"
          handleClose={() => setShowLoginModal(false)}
          onClick={handleLogin}
        />
      )}
      {showJoinModal && (
        <ArticleConfirmModal
          title="팀 참여하기 페이지로 이동할까요?"
          message="복사한 토큰을 입력해 참여할 수 있어요."
          confirmButtonTitle="참여하기"
          handleClose={() => setShowJoinModal(false)}
          onClick={handleJoin}
        />
      )}
    </>
  );
}
