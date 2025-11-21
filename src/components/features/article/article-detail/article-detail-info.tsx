import { getTimeAgo, formatDateToKorean } from "@/lib/utils";
import { Dropdown } from "@/components/ui";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import IcComment from "@/assets/icons/ic-comment.svg";
import IcHeart from "@/assets/icons/ic-heart.svg";

const DATE_TIME = "2025-11-21T21:12:57+09:00";

export default function ArticleDetailInfo() {
  return (
    <section>
      <div>
        <h4>안녕하세요</h4>
        <Dropdown>
          <Dropdown.TriggerIcon intent="icon">
            <IcKebab />
            <span className="visually-hidden">옵션 더보기</span>
          </Dropdown.TriggerIcon>
          <Dropdown.Menu size="sm">
            <Dropdown.Option align="center">수정하기</Dropdown.Option>
            <Dropdown.Option align="center">삭제하기</Dropdown.Option>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <div>
          <span>5팀</span>
          <time
            dateTime={DATE_TIME}
            title={formatDateToKorean(new Date(DATE_TIME))}
            aria-label={formatDateToKorean(new Date(DATE_TIME))}
          >
            {getTimeAgo(DATE_TIME)}
          </time>
        </div>
        <div>
          <span>
            <span>
              <IcComment />
            </span>
            <span className="visually-hidden">댓글</span> 1
          </span>
          <span>
            <span>
              <IcHeart />
            </span>
            <span className="visually-hidden">좋아요</span> 9
          </span>
        </div>
      </div>
      <div>내용 + 이미지</div>
    </section>
  );
}
