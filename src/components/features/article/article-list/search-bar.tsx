import { Input } from "@/components/ui";
import { ARTICLE_LIST_STYLES } from "../index.styles";

export default function SearchBarSection() {
  return (
    <section className={ARTICLE_LIST_STYLES.section.wrapper}>
      <Input id="search">
        <Input.Label label="게시글 검색" hidden />
        <Input.Search placeholder="검색어를 입력해주세요" className="duration-200" />
      </Input>
    </section>
  );
}
