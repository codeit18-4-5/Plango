"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import getArticleComments from "@/api/article/comment/get-article-comments";
import postArticleComment from "@/api/article/comment/post-article-comment";
import deleteArticleComment from "@/api/article/comment/delete-article-comment";
import patchArticleComment from "@/api/article/comment/patch-article-comment";
import { useAuthStore } from "@/store/auth.store";
import { ArticleComments, ArticleComment } from "@/types/article-comment";
import { useInfiniteObserver } from "@/hooks";
import { useAlert } from "@/providers/alert-provider";
import { ReplyInput, Reply } from "@/components/ui";
import { ArticleConfirmModal } from "../layout";
import ReplySkeleton from "@/components/skeleton-ui/reply-skeleton";
import { ARTICLE_COMMENT_STYLES } from "../index.styles";

const PAGE_SIZE = 4;
const useCurrentUser = () => {
  return useAuthStore(state => state.user);
};

export default function ArticleCommentSection({ articleId }: { articleId: number }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const currentUser = useCurrentUser();
  const { showAlert } = useAlert();
  const [editingId, setEditingId] = useState<number | null>(null);
  const prevContentRef = useRef<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [comment, setComment] = useState("");

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
            ? { articleId, limit: PAGE_SIZE, cursor: pageParam }
            : { articleId, limit: PAGE_SIZE };
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

  const { mutate: createComment, isPending: isMutating } = useMutation({
    mutationFn: (payload: { content: string }) => postArticleComment(articleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticleComments", articleId] });
      queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      patchArticleComment(commentId, { content }),
    onMutate: ({ commentId }) => {
      const target = comments.find(current => current.id === commentId);
      prevContentRef.current = target ? target.content : null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticleComments", articleId] });
      queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
    },
  });

  const { mutate: removeComment } = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) => deleteArticleComment({ commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticleComments", articleId] });
      queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    createComment({ content: comment });
    setComment("");
  };

  const handleRequireLogin = () => setShowLoginModal(true);

  const handleEditSave = (commentId: number, updatedContent: string) => {
    updateComment({ commentId, content: updatedContent });
  };
  const handleCancelEdit = () => setEditingId(null);
  const handleDelete = async (commentId: number) => {
    const confirmed = await showAlert({ type: "deleteComment" });
    if (confirmed) removeComment({ commentId });
  };

  if (isPending)
    return (
      <div className={ARTICLE_COMMENT_STYLES.replyList}>
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <ReplySkeleton key={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <section>
        <p className="text-gray-400">댓글을 불러올 수 없습니다.</p>
      </section>
    );

  return (
    <section>
      <h4 className={ARTICLE_COMMENT_STYLES.section.heading.title}>
        댓글 <b>{comments.length}</b>
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
      <ul className={ARTICLE_COMMENT_STYLES.replyList}>
        {comments.map((comment: ArticleComment) => {
          const replyComment = {
            ...comment,
            user: {
              ...comment.writer,
              image: comment.writer.image ?? null,
            },
          };
          return (
            <li key={comment.id}>
              <Reply
                comment={replyComment}
                isEditing={editingId === comment.id}
                onSaveEdit={updatedContent => handleEditSave(comment.id, updatedContent)}
                onCancelEdit={handleCancelEdit}
                isAuthor={comment.writer.id === currentUser?.id}
                actions={
                  comment.writer.id === currentUser?.id
                    ? [
                        { label: "수정하기", onClick: () => setEditingId(comment.id) },
                        { label: "삭제하기", onClick: () => handleDelete(comment.id) },
                      ]
                    : []
                }
              />
            </li>
          );
        })}
        {isFetchingNextPage &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <li key={`skeleton-${i}`}>
              <ReplySkeleton />
            </li>
          ))}
      </ul>
      <div ref={ObserverRef} className="infinite-scroll-trigger" />

      {showLoginModal && (
        <ArticleConfirmModal
          title="로그인이 필요합니다."
          message="댓글을 작성하려면 로그인이 필요합니다."
          confirmButtonTitle="로그인"
          handleClose={() => setShowLoginModal(false)}
          onClick={() => router.replace("/login")}
        />
      )}
    </section>
  );
}
