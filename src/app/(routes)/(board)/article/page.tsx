"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/providers/toast-provider";
import { Container } from "@/components/layout";
import { SearchBar, BestArticleSection, AllArticleSection } from "@/components/features/article";
import { Floating, ScrollTopButton, CircleButton } from "@/components/ui";
import CardSkeleton from "@/components/skeleton-ui/card-skeleton";
import InputFieldSkeleton from "@/components/skeleton-ui/input-field-skeleton";
import { ArticleConfirmModal } from "@/components/features/article/layout";
import {
  ARTICLE_COMMON_STYLES,
  ARTICLE_LIST_STYLES,
} from "@/components/features/article/index.styles";
import IcEdit from "@/assets/icons/ic-pencil.svg";

export default function ArticlesPage() {
  const currentUser = useAuthStore(state => state.user);
  const router = useRouter();
  const isLogin = !!currentUser;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      const deleteToastMsg = sessionStorage.getItem("articleDeleteToast");
      if (deleteToastMsg) {
        sessionStorage.removeItem("articleDeleteToast");
        showToast(deleteToastMsg, "success");
      }
      const createToastMsg = sessionStorage.getItem("articleCreateToast");
      if (createToastMsg) {
        sessionStorage.removeItem("articleCreateToast");
        showToast(createToastMsg, "success");
      }
    }, 120);
  }, [showToast]);

  const handleWriteClick = () => {
    if (!isLogin) {
      setShowLoginModal(true);
    } else {
      router.push("/article/create");
    }
  };

  return (
    <Container as="main" className={ARTICLE_COMMON_STYLES.main.wrapper}>
      <h2 className={ARTICLE_COMMON_STYLES.main.title}>자유게시판</h2>
      <Suspense fallback={<InputFieldSkeleton />}>
        <SearchBar />
      </Suspense>
      <BestArticleSection />
      <Suspense
        fallback={
          <div className={ARTICLE_LIST_STYLES.section.grid.all}>
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <AllArticleSection />
      </Suspense>
      <Floating className="z-20">
        <ScrollTopButton />
        <CircleButton onClick={handleWriteClick}>
          <IcEdit className="h-6 w-6" />
          <span className="visually-hidden">글쓰기</span>
        </CircleButton>
      </Floating>
      {showLoginModal && (
        <ArticleConfirmModal
          title="로그인이 필요합니다."
          message="게시글을 작성하려면 로그인이 필요합니다."
          confirmButtonTitle="로그인"
          handleClose={() => setShowLoginModal(false)}
          onClick={() => {
            setShowLoginModal(false);
            router.replace(`/login?redirect=${encodeURIComponent(`/article/create`)}`);
          }}
        />
      )}
    </Container>
  );
}
