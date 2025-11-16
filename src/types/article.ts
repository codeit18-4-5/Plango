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

/**
 * 자유게시판 리스트 페이지 관련 타입 정의
 * @author yeonsu
 */

export type ListSectionHeaderProps = {
  title: string;
  moreHref?: string;
};

export type ListSectionContentProps = {
  gridType?: "all" | "best" | "none";
  children: React.ReactNode;
};

export type OrderByType = "recent" | "like";

export type ArticleSortOption = {
  label: string;
  value: OrderByType;
};

export type ArticleEmptyProps = {
  children?: React.ReactNode;
  className?: string;
};
