import { useState } from "react";
import { Input, Dropdown } from "@/components/ui";
import { DropdownOption } from "@/types/option";
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
    <div>
      <h3>{title}</h3>
      {moreHref && <a href={moreHref}>더보기</a>}
    </div>
  );
}

export function ArticleSearchBar() {
  return (
    <section>
      <Input id="search">
        <Input.Label label="게시글 검색" hidden />
        <Input.Search placeholder="검색어를 입력해주세요" />
      </Input>
    </section>
  );
}

export function ArticleSortDropdown({ options, selected, onChange }: ArticleSortDropdownProps) {
  return (
    <Dropdown size="md">
      <Dropdown.TriggerSelect isIcon intent="select" selectedLabel={selected.label}>
        <IcDropdown className="w-[24px]" />
      </Dropdown.TriggerSelect>
      <Dropdown.Menu>
        {options.map(option => (
          <Dropdown.Option key={option.value} option={option} onClick={() => onChange(option)}>
            {option.label}
          </Dropdown.Option>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function BestArticlesSection() {
  return (
    <section>
      <SectionHeader title="베스트 게시글" moreHref="/article/best" />
      <div>
        <div></div>
      </div>
    </section>
  );
}

export function ArticleListSection({ options }: { options: DropdownOption[] }) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <section>
      <div>
        <SectionHeader title="게시글" />
        <ArticleSortDropdown options={options} selected={selected} onChange={setSelected} />
      </div>
      <div>
        <div></div>
      </div>
    </section>
  );
}
