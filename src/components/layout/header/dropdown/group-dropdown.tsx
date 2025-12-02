import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Dropdown, Avatar } from "@/components/ui";
import { DropdownOption } from "@/types/option";
import IcArrow from "@/assets/icons/ic-arrow-down.svg";
import cn from "@/lib/cn";

interface dropdownProps {
  groups: DropdownOption[];
  className?: string;
}

export function GroupDropdown({ groups, className }: dropdownProps) {
  const pathname = usePathname();

  const [selectedGroup, setSelectedGroup] = useState<DropdownOption>({
    id: 0,
    name: "",
    image: "",
  });

  useEffect(() => {
    if (groups.length !== 0) {
      let groupIdString: string | undefined;

      const pathSegments = pathname.split("/");

      if (pathSegments[1] === "team" && pathSegments[2]) {
        groupIdString = pathSegments[2];
      }

      let initialGroup = groups[0];

      if (groupIdString) {
        const foundGroup = groups.find(group => String(group.id) === groupIdString);

        if (foundGroup) {
          initialGroup = foundGroup;
        }
      }
      setSelectedGroup(prev => ({
        ...prev,
        id: initialGroup.id,
        image: initialGroup.image,
        name: initialGroup.name,
      }));
    }
  }, [groups, pathname]);

  const handleGroupSelect = ({ name, image }: DropdownOption) => {
    setSelectedGroup(prev => ({ ...prev, name: name, image: image }));
  };
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
        {groups.map(group => {
          return (
            <Dropdown.Option
              key={group.id}
              size="md"
              option={group}
              className="flex items-center gap-2 px-2"
              href={`/team/${group.id}`}
              as="a"
            >
              <Avatar image={group.image} shape="square" className="h-[20px] w-[20px] shrink-0" />
              <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap break-all">
                {group.name}
              </span>
            </Dropdown.Option>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
