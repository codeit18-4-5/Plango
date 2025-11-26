"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import postArticleLike from "@/api/article/post-article-like";
import deleteArticleLike from "@/api/article/delete-article-like";
import { ArticleDetail } from "@/types/article";
import { useAuthStore } from "@/store/auth.store";
import { LikeButton } from "@/components/ui";
import { ArticleConfirmModal } from "../layout";
import getArticleDetail from "@/api/article/get-article-detail";

export default function ArticleLike({
  articleId,
  className,
}: {
  articleId: number;
  className?: string;
}) {
  const currentUser = useAuthStore(state => state.user);
  const isLogin = !!currentUser;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery<ArticleDetail, Error>({
    queryKey: ["getArticleDetail", articleId],
    queryFn: () => getArticleDetail({ articleId }),
  });

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
        likeCount: userAction === "like" ? prev.likeCount + 1 : Math.max(0, prev.likeCount - 1),
        isLiked: userAction === "like",
      }));
      return { prevData };
    },
    onError: (_err, _userAction, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["getArticleDetail", articleId], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
      queryClient.invalidateQueries({ queryKey: ["getArticles"] });
    },
  });

  const handleLikeClick = () => {
    if (!isLogin) {
      setShowLoginModal(true);
    } else {
      mutate(data && data.isLiked ? "unlike" : "like");
    }
  };

  return (
    <>
      <LikeButton
        liked={data?.isLiked}
        likeCount={data?.likeCount ?? 0}
        onClick={handleLikeClick}
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
