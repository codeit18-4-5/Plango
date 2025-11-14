"use client";

import { Container } from "@/components/layout";
import { Dropdown, Input } from "@/components/ui";
import { DropdownOption } from "@/types/option";
import IcDropdown from "@/assets/icons/ic-dropdown.svg";

export default function ArticlesPage() {
  const Options: DropdownOption[] = [
    { label: "최신순", value: "recent" },
    { label: "좋아요 많은순", value: "like" },
  ];
  return (
    <Container as="main">
      <h2>자유 게시판</h2>
      <section>
        <Input id="search">
          <Input.Label label="게시글 검색" hidden />
          <Input.Search placeholder="검색어를 입력해주세요" />
        </Input>
      </section>
      <section>
        <div>
          <h3>베스트 게시글</h3>
        </div>
        <div>
          <a href="">더보기</a>
        </div>
      </section>
      <section>
        <div>
          <h3>게시글</h3>
          <Dropdown size="md">
            <Dropdown.TriggerSelect isIcon={true} intent="select" selectedLabel={Options[0].label}>
              <IcDropdown className="w-[24px]" />
            </Dropdown.TriggerSelect>
            <Dropdown.Menu>
              {Options.map(option => (
                <Dropdown.Option key={option.value} option={option}>
                  {option.label}
                </Dropdown.Option>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div></div>
      </section>
    </Container>
  );
}
