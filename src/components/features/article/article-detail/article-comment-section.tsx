"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import getArticleDetail from "@/api/article/get-article-detail";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import getArticleComments from "@/api/article/comment/get-article-comments";
import postArticleComment from "@/api/article/comment/post-article-comment";
import deleteArticleComment from "@/api/article/comment/delete-article-comment";
import patchArticleComment from "@/api/article/comment/patch-article-comment";
import ArticleCommentList from "./article-comment-list";
import { useAuthStore } from "@/store/auth.store";
import { ArticleComments } from "@/types/article-comment";
import { useInfiniteObserver } from "@/hooks";
import { useAlert } from "@/providers/alert-provider";
import { ReplyInput } from "@/components/ui";
import { ArticleConfirmModal } from "../layout";
import { ARTICLE_COMMENT_STYLES } from "../index.styles";
import { NEXT_CURSOR } from "./article-comment-list";

export default function ArticleCommentSection({ articleId }: { articleId: number }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const currentUser = useAuthStore(state => state.user);
  const { showAlert } = useAlert();
  const [editingId, setEditingId] = useState<number | null>(null);
  const prevContentRef = useRef<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [comment, setComment] = useState("");

  const { data: articleDetail } = useQuery({
    queryKey: ["getArticleDetail", articleId],
    queryFn: () => getArticleDetail({ articleId }),
    enabled: !!articleId,
  });

  const handleRequireLogin = () => setShowLoginModal(true);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } =
    useInfiniteQuery<
      ArticleComments,
      Error,
      InfiniteData<ArticleComments>,
      [string, number],
      number | null
    >({
      queryKey: ["getArticleComments", articleId],
      queryFn: async ({ pageParam }) => {
        const params =
          pageParam != null
            ? { articleId, limit: NEXT_CURSOR, cursor: pageParam }
            : { articleId, limit: NEXT_CURSOR };
        return await getArticleComments(params);
      },
      initialPageParam: null,
      getNextPageParam: lastPage => (lastPage.nextCursor !== null ? lastPage.nextCursor : null),
      staleTime: 60000,
    });

  const comments = data?.pages.flatMap(page => page.list) ?? [];
  const ObserverRef = useInfiniteObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    isEnabled: !!hasNextPage && !isFetchingNextPage,
  });

  const invalidateAllQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["getArticleComments", articleId] });
    queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
  };

  const { mutate: createComment, isPending: isMutating } = useMutation({
    mutationFn: (payload: { content: string }) => postArticleComment(articleId, payload),
    onSuccess: invalidateAllQueries,
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      patchArticleComment(commentId, { content }),
    onMutate: ({ commentId }) => {
      const target = comments.find(current => current.id === commentId);
      prevContentRef.current = target ? target.content : null;
    },
    onSuccess: invalidateAllQueries,
  });

  const { mutate: removeComment } = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) => deleteArticleComment({ commentId }),
    onSuccess: invalidateAllQueries,
  });

  useEffect(() => {
    if (editingId !== null) {
      const editingComment = comments.find(comment => comment.id === editingId);
      if (
        editingComment &&
        prevContentRef.current !== null &&
        editingComment.content !== prevContentRef.current
      ) {
        setEditingId(null);
        prevContentRef.current = null;
      }
    }
  }, [comments, editingId]);

  const handleAddComment = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!comment.trim()) return;
      createComment({ content: comment });
      setComment("");
    },
    [comment, createComment],
  );

  const handleEditSave = useCallback(
    (commentId: number, updatedContent: string) => {
      updateComment({ commentId, content: updatedContent });
    },
    [updateComment],
  );

  const handleCancelEdit = useCallback(() => setEditingId(null), []);

  const handleDelete = useCallback(
    async (commentId: number) => {
      const confirmed = await showAlert({ type: "deleteComment" });
      if (confirmed) removeComment({ commentId });
    },
    [showAlert, removeComment],
  );

  if (isError)
    return (
      <section>
        <p className="text-gray-400">댓글을 불러올 수 없습니다.</p>
      </section>
    );

  return (
    <>
      <section>
        <h4 className={ARTICLE_COMMENT_STYLES.section.heading.title}>
          댓글 <b>{articleDetail?.commentCount ?? 0}</b>
        </h4>
        <form onSubmit={handleAddComment}>
          <ReplyInput
            value={comment}
            onChange={setComment}
            isLoggedIn={!!currentUser}
            isPending={isMutating}
            onRequireLogin={handleRequireLogin}
          />
        </form>
        <ArticleCommentList
          comments={comments}
          isPending={isPending}
          isFetchingNextPage={isFetchingNextPage}
          ObserverRef={ObserverRef}
          editingId={editingId}
          currentUser={currentUser}
          handleEditSave={handleEditSave}
          handleCancelEdit={handleCancelEdit}
          handleDelete={handleDelete}
          handleEditStart={setEditingId}
        />
      </section>
      {showLoginModal && (
        <ArticleConfirmModal
          title="로그인이 필요합니다."
          message="댓글을 작성하려면 로그인이 필요합니다."
          confirmButtonTitle="로그인"
          handleClose={() => setShowLoginModal(false)}
          onClick={() =>
            router.replace(`/login?redirect=${encodeURIComponent(`/article/${articleId}`)}`)
          }
        />
      )}
    </>
  );
}
