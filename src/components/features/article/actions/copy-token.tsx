import cn from "@/lib/cn";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { ArticleConfirmModal } from "@/components/features/article/layout";
import { Input } from "@/components/ui";
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
      <Input id="team-token">
        <Input.Label
          label="팀 참여 토큰"
          caption={isExpired ? "만료된 토큰입니다." : "토큰을 복사해 팀에 참여해보세요."}
          size="md"
        />
        <Input.Field
          value={token}
          readOnly
          aria-label="팀 참여 토큰 복사하기"
          role="button"
          title="팀 참여 토큰 복사하기"
          tabIndex={0}
          onClick={() => {
            handleInputClick();
            handleCopy();
          }}
          className={cn(
            ARTICLE_FORM_STYLES.form.field.copyToken,
            isExpired ? "cursor-not-allowed text-gray-500 line-through" : "hover:text-pink-400",
          )}
        />
      </Input>
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
