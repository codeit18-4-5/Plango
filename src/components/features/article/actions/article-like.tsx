"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import postArticleLike from "@/api/article/post-article-like";
import deleteArticleLike from "@/api/article/delete-article-like";
import { ArticleLikeProps, ArticleDetail } from "@/types/article";
import { LikeButton } from "@/components/ui";
import { ArticleConfirmModal } from "../layout";

export default function ArticleLike({
  isLogin,
  isLiked,
  articleId,
  likeCount,
  className,
}: ArticleLikeProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (userAction: "unlike" | "like") => {
      if (userAction === "like") {
        await postArticleLike(articleId);
      } else {
        await deleteArticleLike(articleId);
      }
    },
    onMutate: async userAction => {
      await queryClient.cancelQueries({ queryKey: ["getArticleDetail", articleId] });

      const prevData = queryClient.getQueryData(["getArticleDetail", articleId]);

      queryClient.setQueryData(["getArticleDetail", articleId], (prev: ArticleDetail) => ({
        ...prev,
        likeCount: userAction === "like" ? prev.likeCount + 1 : prev.likeCount - 1,
        isLiked: userAction === "like",
      }));

      return { prevData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["getArticleDetail", articleId], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
      queryClient.invalidateQueries({ queryKey: ["getArticles"] });
    },
  });

  const handleLikeClick = (userAction: "unlike" | "like") => {
    if (!isLogin) {
      setShowLoginModal(true);
    } else {
      mutate(userAction);
    }
  };

  return (
    <>
      <LikeButton
        liked={isLiked}
        likeCount={likeCount}
        onClick={() => handleLikeClick(isLiked ? "unlike" : "like")}
        className={className}
      />
      {showLoginModal && (
        <ArticleConfirmModal
          title="로그인이 필요합니다."
          message="로그인 후 이용이 가능합니다."
          confirmButtonTitle="로그인"
          handleClose={() => setShowLoginModal(false)}
          onClick={() => {
            setShowLoginModal(false);
            router.replace(`/login?redirect=${encodeURIComponent(`/article/${articleId}`)}`);
          }}
        />
      )}
    </>
  );
}
