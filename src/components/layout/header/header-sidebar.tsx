"use client";

import Link from "next/link";
import IcCancel from "@/assets/icons/ic-cancel.svg";
import IcBoard from "@/assets/icons/ic-board.svg";
import Logo from "@/assets/icons/ic-logo.svg";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import { Avatar } from "@/components/ui";
import { Dropdown } from "@/components/ui";
import { DropdownOption } from "@/types/option";

interface sidebarProps {
  groups: DropdownOption[];
  onClick: (open: boolean) => void;
}

export function HeaderSidebar({ groups, onClick }: sidebarProps) {
  return (
    <div className="absolute top-0 z-40 h-screen w-full bg-modal-dimmed">
      <div className="h-full w-[204px] translate-x-0 bg-gray-800">
        <div className="p-[16px]">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-block h-[32px] w-[130px]">
              <Logo />
            </Link>
            <IcCancel onClick={onClick} className="inline-block w-[24px]" />
          </div>
          <div className="pt-[24px]">
            {groups &&
              groups.map(group => (
                <Link href="/" key={group.id} className="block pb-[24px]">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Avatar image={group.image} shape="square" className="mr-1 w-[24px]" />
                      <span className="inline-block">{group.name}</span>
                    </div>
                    <div>
                      <Dropdown>
                        <Dropdown.TriggerIcon intent="icon">
                          <IcKebab className="w-[24px]" />
                        </Dropdown.TriggerIcon>
                        <Dropdown.Menu size="md">
                          <Dropdown.Option align="center" size="sm">
                            수정하기
                          </Dropdown.Option>
                          <Dropdown.Option align="center" size="sm">
                            삭제하기
                          </Dropdown.Option>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </Link>
              ))}
            <Link href="/" className="flex items-center">
              <IcBoard className="mr-1 inline-block w-[24px]" /> 자유게시판
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
