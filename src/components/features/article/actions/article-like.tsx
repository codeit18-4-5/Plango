"use client";

import postArticleLike from "@/api/article/post-article-like";
import deleteArticleLike from "@/api/article/delete-article-like";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import useArticleDetail from "@/hooks/article/use-article-detail";
import { LikeButton } from "@/components/ui";
import { ArticleConfirmModal } from "../layout";
import { ArticleDetail, ArticleLikeProps } from "@/types/article";

export default function ArticleLike({ articleId, className, initialData }: ArticleLikeProps) {
  const currentUser = useAuthStore(state => state.user);
  const isLogin = !!currentUser;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useArticleDetail(articleId, initialData);

  const { mutate } = useMutation<
    void,
    unknown,
    "unlike" | "like",
    { prevData: ArticleDetail | undefined }
  >({
    mutationFn: async userAction => {
      if (userAction === "like") {
        await postArticleLike(articleId);
      } else {
        await deleteArticleLike(articleId);
      }
    },
    onMutate: async userAction => {
      await queryClient.cancelQueries({ queryKey: ["getArticleDetail", articleId] });
      const prevData = queryClient.getQueryData<ArticleDetail>(["getArticleDetail", articleId]);
      if (prevData) {
        queryClient.setQueryData<ArticleDetail>(["getArticleDetail", articleId], {
          ...prevData,
          likeCount:
            userAction === "like" ? prevData.likeCount + 1 : Math.max(0, prevData.likeCount - 1),
          isLiked: userAction === "like",
        });
      }
      return { prevData };
    },
    onError: (_err, _userAction, context) => {
      if (context?.prevData) {
        queryClient.setQueryData<ArticleDetail>(["getArticleDetail", articleId], context.prevData);
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
