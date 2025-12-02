"use client";
import Link from "next/link";
import { HeaderSidebar } from "./header-sidebar";
import { useState } from "react";
import Logo from "@/assets/landing/logo-flat.svg";
import IcMenu from "@/assets/icons/ic-gnb-menu.svg";
import { GroupDropdown } from "./dropdown/group-dropdown";
import { UserDropdown } from "./dropdown/user-dropdown";
import { DropdownOption } from "@/types/option";
import { User } from "@/types/user";

interface HeaderProps {
  isLoginPage: boolean;
  groups?: DropdownOption[] | null;
  user?: User | null;
}

export default function Header({ isLoginPage, groups, user }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  if (isLoginPage) {
    return (
      <div className="sticky left-0 top-0 z-50 w-full border-b border-gray-600 bg-gray-800">
        <div className="mx-auto flex h-[60px] w-full max-w-[1248px] items-center justify-between px-4 py-3 tablet:px-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo className="h-[20px] w-[100px] tablet:mr-[32px] desktop:mr-[40px] desktop:h-[32px] desktop:w-[158px]" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky left-0 top-0 z-50 w-full border-b border-gray-600 bg-gray-800">
      {open && <HeaderSidebar groups={groups || null} onClick={handleMenuClick(false)} />}
      <div className="mx-auto flex h-[60px] w-full max-w-[1248px] items-center justify-between px-4 py-3 tablet:px-6">
        <div className="flex items-center justify-between">
          <IcMenu
            onClick={handleMenuClick(true)}
            className="mr-[16px] inline-block w-[24px] tablet:hidden"
          />
          <Link href="/">
            <Logo className="h-[20px] w-[100px] tablet:mr-[32px] desktop:mr-[40px] desktop:h-[32px] desktop:w-[158px]" />
          </Link>
          <div className="hidden w-[240px] tablet:block tablet:flex tablet:items-center tablet:justify-between">
            {groups?.length !== 0 && groups && <GroupDropdown groups={groups} />}
            <Link href="/article">자유게시판</Link>
          </div>
        </div>
        <div className="flex items-center">
          {user ? <UserDropdown user={user} /> : <Link href="/login">로그인</Link>}
        </div>
      </div>
    </div>
  );
}
