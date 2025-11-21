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

export function DetailSection() {
  return (
    <div>
      <div>
        <h3>게시글 제목</h3>
        <div>
          내가 작성한 글일 때 케밥 메뉴 노출 부분(수정/삭제).추후 드롭다운 컴포넌트 적용 예정
        </div>
      </div>
      <div>
        <div>
          <div>작성자 닉네임</div>
          <div>작성일</div>
        </div>
        <div>
          <div>
            댓글 수 <span>1234</span>
          </div>
          <div>
            좋아요 수 <span>1234</span>
          </div>
        </div>
      </div>
      <div>게시글 내용과 이미지 영역</div>
    </div>
  );
}

export function CommentsSection() {
  return (
    <div>
      <div>댓글달기</div>
      <div>댓글작성영역. 추후 댓글 컴포넌트(작성창 + 등록버튼)적용 예정</div>
      <div>댓글 리스트 영역</div>
    </div>
  );
}
