import Image from "next/image";
import { getTimeAgo, formatDateToKorean } from "@/lib/utils";
import { ArticleDetail } from "@/types/article";
import { DISPLAY_LIMITS } from "@/constants/display";
import { Dropdown, Button } from "@/components/ui";
import { ARTICLE_DETAIL_STYLES } from "../index.styles";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import IcComment from "@/assets/icons/ic-comment.svg";
import IcHeart from "@/assets/icons/ic-heart.svg";
import IcLiked from "@/assets/icons/ic-heart-color.svg";

const DATE_TIME = "2025-11-21T21:12:57+09:00";
const mockComment: ArticleDetail = {
  id: 1,
  writer: {
    id: 123,
    nickname: "5팀",
  },
  title: "안녕하세요",
  content: "내용 + 이미지",
  createdAt: DATE_TIME,
  updatedAt: DATE_TIME,
  commentCount: 10000,
  likeCount: 5,
  isLiked: false,
  image: "/assets/images/img-test.jpeg",
};

export default function ArticleDetailInfo() {
  return (
    <section>
      <h3 className="visually-hidden">게시글 상세 정보</h3>
      <div className={ARTICLE_DETAIL_STYLES.heading.wrapper}>
        <h4 className={ARTICLE_DETAIL_STYLES.heading.title}>{mockComment.title}</h4>
        <Dropdown className={ARTICLE_DETAIL_STYLES.heading.kebab}>
          <Dropdown.TriggerIcon
            intent="icon"
            className="duration-200 hover:text-gray-400 focus:text-gray-200 active:text-gray-300"
            aria-label="옵션 더보기"
          >
            <IcKebab />
          </Dropdown.TriggerIcon>
          <Dropdown.Menu size="md">
            <Dropdown.Option align="center">수정하기</Dropdown.Option>
            <Dropdown.Option align="center">삭제하기</Dropdown.Option>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={ARTICLE_DETAIL_STYLES.meta.wrapper}>
        <div className={ARTICLE_DETAIL_STYLES.meta.authorInfo}>
          <span className="visually-hidden">작성자</span>
          <span>{mockComment.writer.nickname}</span>
          <time
            dateTime={DATE_TIME}
            title={formatDateToKorean(new Date(DATE_TIME))}
            aria-label={formatDateToKorean(new Date(DATE_TIME))}
            className={ARTICLE_DETAIL_STYLES.meta.timeStamp}
          >
            {getTimeAgo(DATE_TIME)}
          </time>
        </div>
        <div className={ARTICLE_DETAIL_STYLES.meta.stats}>
          <span>
            <IcComment className={ARTICLE_DETAIL_STYLES.meta.icon} />
            <span className="visually-hidden">댓글</span>
            {mockComment.commentCount > DISPLAY_LIMITS.MAX_COMMENT_COUNT
              ? DISPLAY_LIMITS.MAX_COMMENT_COUNT_TEXT
              : mockComment.commentCount}
          </span>
          <span>
            <IcHeart className={ARTICLE_DETAIL_STYLES.meta.icon} />
            <span className="visually-hidden">좋아요</span>
            {mockComment.likeCount > DISPLAY_LIMITS.MAX_LIKE_COUNT
              ? DISPLAY_LIMITS.MAX_LIKE_COUNT_TEXT
              : mockComment.likeCount}
          </span>
        </div>
      </div>
      <div className={ARTICLE_DETAIL_STYLES.content}>
        {mockComment.content}
        {mockComment.image && (
          <span className="relative mt-4 block max-w-[80%]">
            <Image
              src={mockComment.image}
              alt="게시글 첨부 이미지"
              width={600}
              height={600}
              draggable={false}
              priority
            />
          </span>
        )}
      </div>
      <div className={ARTICLE_DETAIL_STYLES.actions.wrapper}>
        <div className={ARTICLE_DETAIL_STYLES.actions.like}>
          <Button
            size="icon"
            className="hover:text-pink-400"
            aria-label={mockComment.isLiked ? "좋아요 취소" : "좋아요"}
          >
            <IcLiked />
          </Button>
          <span>
            {mockComment.likeCount > DISPLAY_LIMITS.MAX_LIKE_COUNT
              ? DISPLAY_LIMITS.MAX_LIKE_COUNT_TEXT
              : mockComment.likeCount}
          </span>
        </div>
        <Button
          as="a"
          href="/article"
          size="sm"
          intent="tertiary"
          className={ARTICLE_DETAIL_STYLES.actions.backToList}
        >
          목록으로
        </Button>
      </div>
    </section>
  );
}
