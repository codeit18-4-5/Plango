import { UserSummary } from "@/types/user";

/**
 * ArticleComment 관련 타입 정의
 * @author yeonsu
 */

export interface ArticleComment {
  id: number;
  writer: UserSummary;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 댓글 목록 조회
export interface ArticleComments {
  nextCursor: number | null;
  list: ArticleComment[];
}

// 403/404
export interface ArticleCommentError {
  message: string;
}

// post 리퀘스트 바디(게시글 댓글 작성)
export interface CreateArticleComment {
  content: string;
}

// patch 리퀘스트 바디(댓글 수정)
export interface UpdateArticleComment {
  content: string;
}

// delete 리퀘스트 바디(댓글 삭제)
export interface DeleteArticleComment {
  id: number;
}
