import { ArticleEmptyProps } from "@/types/article";
import { ARTICLE_LIST_EMPTY_STYLES } from "../index.styles";

export default function ArticleListEmpty({ children, className }: ArticleEmptyProps) {
  return (
    <div className={`${ARTICLE_LIST_EMPTY_STYLES.wrapper} ${className}`}>
      {children ?? "등록된 게시물이 없습니다."}
    </div>
  );
}
