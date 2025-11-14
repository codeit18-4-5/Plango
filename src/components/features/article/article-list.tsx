import { useState } from "react";
import { Input, Dropdown } from "@/components/ui";
import { DropdownOption } from "@/types/option";
import { ARTICLE_STYLES } from "./article.styles";
import IcDropdown from "@/assets/icons/ic-dropdown.svg";

type SectionHeaderProps = {
  title: string;
  moreHref?: string;
};

type ArticleSortDropdownProps = {
  options: DropdownOption[];
  selected: DropdownOption;
  onChange: (option: DropdownOption) => void;
};

export function SectionHeader({ title, moreHref }: SectionHeaderProps) {
  return (
    <div className={ARTICLE_STYLES.section.heading.wrapper}>
      <h3 className={ARTICLE_STYLES.section.heading.title}>{title}</h3>
      {moreHref && (
        <a href={moreHref} className={ARTICLE_STYLES.section.heading.moreHref}>
          더보기
        </a>
      )}
    </div>
  );
}

export function ArticleSearchBar() {
  return (
    <section className={ARTICLE_STYLES.section.wrapper}>
      <Input id="search">
        <Input.Label label="게시글 검색" hidden />
        <Input.Search placeholder="검색어를 입력해주세요" />
      </Input>
    </section>
  );
}

export function ArticleSortDropdown({ options, selected, onChange }: ArticleSortDropdownProps) {
  return (
    <Dropdown size="sm" className={ARTICLE_STYLES.dropdown.wrapper}>
      <Dropdown.TriggerSelect
        isIcon
        intent="select"
        selectedLabel={selected.label}
        className={ARTICLE_STYLES.dropdown.trigger}
      >
        <IcDropdown className={ARTICLE_STYLES.dropdown.icon} />
      </Dropdown.TriggerSelect>
      <Dropdown.Menu>
        {options.map(option => (
          <Dropdown.Option
            key={option.value}
            option={option}
            onClick={() => onChange(option)}
            className={ARTICLE_STYLES.dropdown.option}
          >
            {option.label}
          </Dropdown.Option>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function BestArticlesSection() {
  return (
    <section className={ARTICLE_STYLES.section.wrapper}>
      <SectionHeader title="베스트 게시글" moreHref="/article/best" />
      <div className={ARTICLE_STYLES.section.contents}>
        <div className={ARTICLE_STYLES.section.grid}></div>
      </div>
    </section>
  );
}

export function ArticleListSection({ options }: { options: DropdownOption[] }) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <section className={ARTICLE_STYLES.section.wrapper}>
      <div className={ARTICLE_STYLES.section.heading.wrapper}>
        <SectionHeader title="게시글" />
        <ArticleSortDropdown options={options} selected={selected} onChange={setSelected} />
      </div>
      <div className={ARTICLE_STYLES.section.contents}>
        <div className={ARTICLE_STYLES.section.grid}></div>
      </div>
    </section>
  );
}
