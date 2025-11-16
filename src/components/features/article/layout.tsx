import Link from "next/link";
import { ListSectionHeaderProps, ListSectionContentProps } from "@/types/article";
import { ARTICLE_COMMON_STYLES, ARTICLE_LIST_STYLES } from "./index.styles";

export function ListSectionHeader({ title, moreHref }: ListSectionHeaderProps) {
  return (
    <div className={ARTICLE_LIST_STYLES.section.heading.wrapper}>
      <h3 className={ARTICLE_LIST_STYLES.section.heading.title}>{title}</h3>
      {moreHref && (
        <Link href={moreHref} className={ARTICLE_LIST_STYLES.section.heading.moreHref}>
          더보기
        </Link>
      )}
    </div>
  );
}

export function ListSectionContent({ gridType = "none", children }: ListSectionContentProps) {
  return (
    <div className={ARTICLE_COMMON_STYLES.section.contents}>
      <div className={ARTICLE_LIST_STYLES.section.grid[gridType]}>{children}</div>
    </div>
  );
}
