import { Writer } from "@/types/article";

/**
 * ArticleComment 관련 타입 정의
 * @author yeonsu
 */

export interface ArticleComment {
  id: number;
  writer: Writer;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 댓글 목록 조회
export interface ArticleComments {
  nextCursor: number | null;
  list: ArticleComment[];
}

export type GetArticleCommentParams = {
  articleId: number;
  limit: number;
  cursor?: number;
};

// 403/404
export interface ArticleCommentError {
  message: string;
}

// post 리퀘스트 바디(게시글 댓글 작성)
export interface PostArticleComment {
  content: string;
}

// patch 리퀘스트 바디(댓글 수정)
export interface PatchArticleComment {
  content: string;
}

// delete 리퀘스트 바디(댓글 삭제)
export interface DeleteArticleComment {
  id: number;
}
