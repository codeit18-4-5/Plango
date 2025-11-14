/**
 * Article 관련 타입 정의
 * @author yeonsu
 */

export interface Writer {
  nickname: string;
  id: number;
  image?: string | null;
}

export interface Article {
  id: number;
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image?: string;
  title: string;
}
export interface ArticleListResponse {
  totalCount: number;
  list: Article[];
}
