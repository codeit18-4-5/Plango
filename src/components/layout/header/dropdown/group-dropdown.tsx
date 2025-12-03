"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Dropdown, Avatar } from "@/components/ui";
import { DropdownOption } from "@/types/option";
import { useQuery } from "@tanstack/react-query";
import getUser from "@/api/user/get-user";
import IcArrow from "@/assets/icons/ic-arrow-down.svg";
import cn from "@/lib/cn";

interface dropdownProps {
  className?: string;
  isLogin: boolean;
}

export function GroupDropdown({ className, isLogin = false }: dropdownProps) {
  const pathname = usePathname();

  const { data: user } = useQuery({ queryKey: ["getUser"], queryFn: getUser });

  const [selectedGroup, setSelectedGroup] = useState<DropdownOption>({
    id: 0,
    name: "",
    image: "",
  });

  useEffect(() => {
    if (user?.memberships) {
      if (user.memberships.length !== 0) {
        {
          let groupIdString: string | undefined;

          const pathSegments = pathname.split("/");

          if (pathSegments[1] === "team" && pathSegments[2]) {
            groupIdString = pathSegments[2];
          }

          let initialGroup = user.memberships[0];

          if (groupIdString) {
            const foundGroup = user.memberships.find(mb => String(mb.group.id) === groupIdString);

            if (foundGroup) {
              initialGroup = foundGroup;
            }
          }

          setSelectedGroup(prev => ({
            ...prev,
            id: initialGroup.group.id,
            image: initialGroup.group.image,
            name: initialGroup.group.name,
          }));
        }
      }
    }
  }, [user, pathname]);

  const handleGroupSelect = ({ name, image }: DropdownOption) => {
    setSelectedGroup(prev => ({ ...prev, name: name, image: image }));
  };

  if (!isLogin) {
    return <></>;
  }

  return (
    <Dropdown onSelect={handleGroupSelect} className={cn(className, "w-[140px]")} size="md">
      <Dropdown.TriggerSelect
        size="md"
        intent="select"
        isIcon={true}
        className="w-[140px] gap-1 bg-gray-800 px-2"
      >
        <div className="inline-block flex w-[100px] items-center">
          <Avatar
            image={selectedGroup.image}
            shape="square"
            className="mr-1 h-[20px] w-[20px] shrink-0"
          />
          <span className="inline-block w-[80px] overflow-hidden text-ellipsis whitespace-nowrap break-all text-left">
            {selectedGroup.name}
          </span>
        </div>
        <IcArrow className="w-[24px]" />
      </Dropdown.TriggerSelect>
      <Dropdown.Menu className="w-[140px]" size="md">
        {user?.memberships &&
          user.memberships.map(mb => {
            return (
              <Dropdown.Option
                key={mb.group.id}
                size="md"
                option={mb.group}
                className="flex items-center gap-2 px-2"
                href={`/team/${mb.group.id}`}
                as="a"
              >
                <Avatar
                  image={mb.group.image}
                  shape="square"
                  className="h-[20px] w-[20px] shrink-0"
                />
                <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap break-all">
                  {mb.group.name}
                </span>
              </Dropdown.Option>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
