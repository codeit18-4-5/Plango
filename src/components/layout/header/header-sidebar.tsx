"use client";

import Link from "next/link";
import IcCancel from "@/assets/icons/ic-cancel.svg";
import IcBoard from "@/assets/icons/ic-board.svg";
import Logo from "@/assets/landing/logo-flat.svg";
import { Avatar } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import getUser from "@/api/user/get-user";

interface sidebarProps {
  onClick: (open: boolean) => void;
  isLogin: boolean;
}

export function HeaderSidebar({ onClick, isLogin = false }: sidebarProps) {
  const { data: user } = useQuery({ queryKey: ["getUser"], queryFn: getUser });

  return (
    <div className="absolute top-0 z-40 h-screen w-full bg-modal-dimmed">
      <div className="h-full w-[204px] translate-x-0 bg-gray-800">
        <div className="p-[16px]">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-block w-[100px]">
              <Logo />
            </Link>
            <IcCancel onClick={onClick} className="inline-block w-[24px]" />
          </div>
          <div className="pt-[24px]">
            {isLogin ? (
              user?.memberships &&
              user.memberships.map(mb => (
                <div className="rounded-xl px-1 py-3 hover:bg-gray-700" key={mb.group.id}>
                  <Link href={`/team/${mb.group.id}`}>
                    <div className="flex items-center">
                      <Avatar
                        image={mb.group.image}
                        shape="square"
                        className="mr-1 h-[20px] w-[20px] shrink-0"
                      />
                      <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap break-all">
                        {mb.group.name}
                      </span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <></>
            )}
            <Link
              href="/article"
              className="flex items-center rounded-xl px-1 py-3 hover:bg-gray-700"
            >
              <IcBoard className="mr-1 inline-block w-[24px]" /> 자유게시판
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
