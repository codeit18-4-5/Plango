/**
 * Article 관련 타입 정의
 * @author yeonsu
 */

export interface Writer {
  nickname: string;
  id: number;
}
export interface CreateArticleData {
  title: string;
  content: string;
  image: string | null;
}

export type Article = CreateArticleData & {
  id: number;
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
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
  as?: "h2" | "h3" | "h4";
  children?: React.ReactNode;
};
