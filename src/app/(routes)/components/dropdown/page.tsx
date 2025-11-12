"use client";

import { Container } from "@/components/layout";
import { useState, useEffect } from "react";
//import { useRouter } from "next/navigation";
import { DropdownOption } from "@/types/option";
import Dropdown from "@/components/ui/dropdown/dropdown";
import IcDropdown from "@/assets/icons/ic-dropdown.svg";
import IcKebab from "@/assets/icons/ic-kebab.svg";

interface TodoList {
  title: string;
  memo: string;
  date: Date;
  quantity: DropdownOption;
}

function DropdownDemo() {
  const [listForm, setListForm] = useState<TodoList>({
    title: "",
    memo: "",
    date: new Date(),
    quantity: { label: "", value: "" },
  });
  //const router = useRouter();

  const selectOptions: DropdownOption[] = [
    { label: "option A", value: "A" },
    { label: "option B", value: "B" },
    { label: "option C", value: "C" },
  ];

  const handleSelectValue = (option: DropdownOption) => {
    setListForm(prev => ({
      ...prev,
      quantity: option,
    }));
  };

  useEffect(() => {
    setListForm(prev => ({
      ...prev,
      quantity: selectOptions[0],
    }));
  }, []);

  return (
    <>
      <div>
        <p className="my-[20px]">
          custom option + 아이콘이 있는 경우 ex. 헤더, 자유게시판 정렬, 할일의 반복주기 생성
        </p>
        <Dropdown size="md" onSelect={handleSelectValue}>
          <Dropdown.TriggerSelect
            isIcon={true}
            intent="select"
            selectedLabel={listForm.quantity.label}
          >
            <span className="w-[24px]">
              <IcDropdown />
            </span>
          </Dropdown.TriggerSelect>
          <Dropdown.Menu>
            {selectOptions.map(option => (
              <Dropdown.Option
                //onClick={() => router.push("/")}
                key={option.value}
                option={option}
              >
                {option.label}
              </Dropdown.Option>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <p className="my-[20px]">icon 혹은 icon + 글자 조합 ex. 케밥아이콘, 헤더의 마이페이지 등</p>
        <Dropdown size="sm">
          <Dropdown.TriggerIcon intent="icon">
            <span className="w-[24px]">
              <IcKebab />
            </span>
          </Dropdown.TriggerIcon>
          <Dropdown.Menu>
            <Dropdown.Option as="a" href="/" align="center">
              수정하기
            </Dropdown.Option>
            <Dropdown.Option as="a" align="center">
              삭제하기
            </Dropdown.Option>
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
