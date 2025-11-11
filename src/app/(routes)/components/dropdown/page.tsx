"use client";

import { Container } from "@/components/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DropdownOption } from "@/types/option";
import Dropdown from "@/components/ui/dropdown/dropdown";
import IcDropdown from "@/assets/icons/ic-dropdown.svg";
import IcKebab from "@/assets/icons/ic-kebab.svg";

function DropdownDemo() {
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();

  const options: DropdownOption[] = [
    { label: "option A", value: "A" },
    { label: "option B", value: "B" },
    { label: "option C", value: "C" },
  ];

  useEffect(() => {
    setSelectedLabel(options[0].label);
  }, []);

  const handleSelectValue = ({ value, label }: DropdownOption) => {
    setSelectedLabel(label ?? "");
    setSelectedValue(value);
  };

  return (
    <>
      <div>
        <p className="my-[20px]">
          custom option + 아이콘이 있는 경우 ex. 헤더, 자유게시판 정렬, 할일의 반복주기 생성
        </p>
        <Dropdown size="md" onSelect={handleSelectValue} className="z-20">
          <Dropdown.TriggerSelect isIcon={true} intent="select" selectedLabel={selectedLabel}>
            <span className="w-[24px]">
              <IcDropdown />
            </span>
          </Dropdown.TriggerSelect>
          <Dropdown.Menu>
            {options.map(option => (
              <Dropdown.Option
                onClick={() => router.push("/")}
                key={option.value}
                value={selectedValue}
                // selectedValue 사용을 안하면 lint에 걸려서 저렇게 작성하게 되었습니다.
                label={option.label}
              >
                {option.label}
              </Dropdown.Option>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <p className="my-[20px]">icon 혹은 icon + 글자 조합 ex. 케밥아이콘, 헤더의 마이페이지 등</p>
        <Dropdown size="sm" className="z-10">
          <Dropdown.TriggerIcon intent="icon">
            <span className="w-[24px]">
              <IcKebab />
            </span>
          </Dropdown.TriggerIcon>
          <Dropdown.Menu>
            <Dropdown.Option align="center">수정하기</Dropdown.Option>
            <Dropdown.Option align="center">삭제하기</Dropdown.Option>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default function Components() {
  return (
    <Container>
      <DropdownDemo />
    </Container>
  );
}
