/**
 * Article 관련 타입 정의
 * @author yeonsu
 */
export interface Writer {
  nickname: string;
  id: number;
  image?: string | null;
}

export interface CreateArticleData {
  title: string;
  content: string;
  image: string | null;
}

export type EditArticleData = CreateArticleData;

export type Article = CreateArticleData & {
  id: number;
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
};

export interface ArticleListResponse {
  totalCount: number;
  list: Article[];
}

export interface ArticleDetail extends Article {
  commentCount: number;
  isLiked: boolean;
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

export type GetArticlesParams = {
  page?: number;
  pageSize?: number;
  orderBy?: OrderByType;
  keyword?: string;
};

export type ArticleEmptyProps = {
  children?: React.ReactNode;
  className?: string;
};

/**
 * 자유게시판 작성/수정 페이지 관련 타입 정의
 * @author yeonsu
 */

export type ArticleFormFieldsProps = {
  type?: "create" | "edit";
};

export type ArticleEditFormProps = {
  articleId: number;
};

export type ArticleFormFieldProps = {
  id: string;
  label: string;
  errorMsg?: string;
  caption?: string;
  required?: boolean;
  children: React.ReactNode;
};

export type CreateSectionHeaderProps = {
  title: string;
  as?: "h2" | "h3";
  className?: string;
  children?: React.ReactNode;
};
