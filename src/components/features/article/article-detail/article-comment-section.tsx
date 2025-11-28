"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import getArticleComments from "@/api/article/comment/get-article-comments";
import postArticleComment from "@/api/article/comment/post-article-comment";
import deleteArticleComment from "@/api/article/comment/delete-article-comment";
import patchArticleComment from "@/api/article/comment/patch-article-comment";
import { useAuthStore } from "@/store/auth.store";
import ArticleCommentList from "./article-comment-list";
import { ArticleComments } from "@/types/article-comment";
import { useInfiniteObserver } from "@/hooks";
import useArticleDetail from "@/hooks/article/use-article-detail";
import { useAlert } from "@/providers/alert-provider";
import { useToast } from "@/providers/toast-provider";
import { ReplyInput } from "@/components/ui";
import { ArticleConfirmModal } from "../layout";
import { ARTICLE_COMMENT_STYLES } from "../index.styles";
import { NEXT_CURSOR } from "./article-comment-list";

const singleLineBreaks = (str: string) => str.replace(/\n{2,}/g, "\n");

export default function ArticleCommentSection({ articleId }: { articleId: number }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const currentUser = useAuthStore(state => state.user);
  const prevContentRef = useRef<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [comment, setComment] = useState("");
  const { showAlert } = useAlert();
  const { showToast } = useToast();

  const { data: article } = useArticleDetail(articleId);

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
    queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
    queryClient.invalidateQueries({ queryKey: ["getArticleComments", articleId] });
    queryClient.invalidateQueries({ queryKey: ["getArticles"] });
  };

  const { mutate: createComment, isPending: isMutating } = useMutation({
    mutationFn: (payload: { content: string }) => postArticleComment(articleId, payload),
    onSuccess: () => {
      invalidateAllQueries();
      setComment("");
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      patchArticleComment(commentId, { content }),
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["getArticleComments", articleId] });
      const previousData = queryClient.getQueryData(["getArticleComments", articleId]);
      queryClient.setQueryData(
        ["getArticleComments", articleId],
        (oldData?: InfiniteData<ArticleComments>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              list: page.list.map(comment =>
                comment.id === commentId
                  ? { ...comment, content: singleLineBreaks(content) }
                  : comment,
              ),
            })),
          };
        },
      );
      return { previousData };
    },
    onSuccess: () => {
      invalidateAllQueries();
      showToast("댓글이 수정되었습니다.", "success");
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["getArticleComments", articleId], context.previousData);
      }
      showToast("댓글 수정에 실패했습니다.", "error");
    },
  });

  const { mutate: removeComment } = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) => deleteArticleComment({ commentId }),
    onSuccess: () => {
      invalidateAllQueries();
      showToast("댓글이 삭제되었습니다.", "success");
    },
    onError: () => {
      showToast("댓글 삭제에 실패했습니다.", "error");
    },
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

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    const normalized = singleLineBreaks(comment).trim();
    if (!normalized) return;
    createComment({ content: normalized });
  }

  const handleEditSave = useCallback(
    (commentId: number, updatedContent: string) => {
      const normalized = singleLineBreaks(updatedContent).trim();
      if (!normalized) return;
      updateComment({ commentId, content: normalized });
      setEditingId(null);
    },
    [updateComment],
  );

  function handleCancelEdit() {
    setEditingId(null);
  }

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
          댓글 <b>{article?.commentCount ?? 0}</b>
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
