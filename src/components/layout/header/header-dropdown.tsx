import { useState, useEffect } from "react";
import { Dropdown, Avatar } from "@/components/ui";
import { DropdownOption } from "@/types/option";
import IcArrow from "@/assets/icons/ic-arrow-down.svg";

interface dropdownProps {
  groups: DropdownOption[];
  className?: string;
}

export function HeaderDropdown({ groups, className }: dropdownProps) {
  const [selectedGroup, setSelectedGroup] = useState<DropdownOption>({
    id: 0,
    name: "",
    image: "",
  });

  useEffect(() => {
    if (groups) {
      setSelectedGroup(prev => ({ ...prev, name: groups[0].name, image: groups[0].image }));
    }
  }, []);

  const handleGroupSelect = ({ name, image }: DropdownOption) => {
    setSelectedGroup(prev => ({ ...prev, name: name, image: image }));
  };
  return (
    <Dropdown onSelect={handleGroupSelect} className={className} size="md">
      <Dropdown.TriggerSelect
        size="md"
        intent="select"
        selectedLabel={selectedGroup.name}
        isIcon={true}
        className="bg-gray-900"
      >
        <IcArrow className="w-[24px]" />
      </Dropdown.TriggerSelect>
      <Dropdown.Menu size="md">
        {groups.map(group => {
          return (
            <Dropdown.Option key={group.id} size="md" option={group} className="flex items-center">
              <Avatar image={group.image} shape="square" className="mr-1 w-[24px]" />
              <span className="inline-block">{group.name}</span>
            </Dropdown.Option>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
