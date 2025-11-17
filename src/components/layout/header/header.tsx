"use client";

import Link from "next/link";
import { HeaderSidebar } from "./header-sidebar";
import { useState } from "react";
import Logo from "@/assets/icons/ic-logo.svg";
import IcMenu from "@/assets/icons/ic-gnb-menu.svg";
import IcUser from "@/assets/icons/ic-user.svg";
import { Dropdown } from "@/components/ui";
import { HeaderDropdown } from "./header-dropdown";
import { userOptions } from "./header.props";
import { DropdownOption } from "@/types/option";

interface HeaderProps {
  isLoginPage: boolean;
  isUser?: boolean;
  isGroup?: boolean;
  groups?: DropdownOption[];
}

const groups: DropdownOption[] = [
  {
    id: 1,
    name: "test1",
    image: "",
  },
  {
    id: 2,
    name: "test2",
    image: "",
  },
];

export default function Header({ isLoginPage, isUser, isGroup }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  if (isLoginPage) {
    return (
      <div className="relative">
        <div className="mx-auto w-full max-w-[1248px] items-center justify-between px-[16px] py-[18px] tablet:px-[24px] tablet:py-[20px]">
          <div className="flex items-center justify-between">
            <Logo className="h-[20px] w-[100px] tablet:mr-[32px] desktop:mr-[40px] desktop:h-[32px] desktop:w-[158px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {open && <HeaderSidebar groups={groups} onClick={handleMenuClick(false)} />}
      <div className="mx-auto flex w-full max-w-[1248px] items-center justify-between px-[16px] py-[18px] tablet:px-[24px] tablet:py-[20px]">
        <div className="flex items-center justify-between">
          <IcMenu
            onClick={handleMenuClick(true)}
            className="mr-[16px] inline-block w-[24px] tablet:hidden"
          />
          <Logo className="h-[20px] w-[100px] tablet:mr-[32px] desktop:mr-[40px] desktop:h-[32px] desktop:w-[158px]" />
          <div className="hidden w-[200px] tablet:block tablet:flex tablet:items-center tablet:justify-between">
            {isGroup && <HeaderDropdown groups={groups} />}
            <Link href="/">자유게시판</Link>
          </div>
        </div>
        <div>
          {isUser ? (
            <Dropdown>
              <Dropdown.TriggerIcon>
                <IcUser className="w-[24px]" />
                <span className="hidden tablet:inline tablet:pl-[8px]">사용자이름</span>
              </Dropdown.TriggerIcon>
              <Dropdown.Menu size="md">
                {userOptions.map((option, index) => {
                  return (
                    <Dropdown.Option size="md" align="center" as="a" href={option.url} key={index}>
                      {option.menuName}
                    </Dropdown.Option>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link href="/signin" className="hidden">
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
