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
 * Article 컴포넌트 관련 타입 정의
 */

export type ArticleOrderType = "recent" | "like";

export type ArticleSortOption = {
  label: string;
  value: ArticleOrderType;
};

type SortOption = {
  label: string;
  value: "recent" | "like";
};

export type SectionHeaderProps = {
  title: string;
  moreHref?: string;
};

export type ArticleSortDropdownProps = {
  options: SortOption[];
  selected: SortOption;
  onChange: (option: SortOption) => void;
};

export type ArticleListSectionProps = {
  articles: Article[];
  options: SortOption[];
  selected: SortOption;
  onChange: (option: SortOption) => void;
};
