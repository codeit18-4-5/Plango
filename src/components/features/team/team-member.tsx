import { Avatar } from "@/components/ui";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import { Dropdown } from "@/components/ui";
import cn from "@/lib/cn";

const gridStyle =
  "grid grid-cols-3 grid-rows-2 grid-cols-[24px_1fr_16px] tablet:grid-cols-[32px_1fr_16px] gap-x-2 tablet:gap-x-3";

export default function TeamMember() {
  return (
    <div className="rounded-2xl bg-gray-800 px-6 py-4 tablet:py-5">
      <div className={cn(gridStyle, "items-center")}>
        <Avatar className="cols-start-1 w-6 tablet:row-span-2 tablet:row-start-1 tablet:w-8" />
        <p className="text-sm text-white">김코드</p>
        {/* <IcKebab className="cols-start-3 row-span-2 w-4 text-gray-400" /> */}
        <Dropdown intent="icon" className="cols-start-3 row-span-2">
          <Dropdown.TriggerIcon>
            <IcKebab className="h-4 w-4 text-gray-400" />
          </Dropdown.TriggerIcon>
          <Dropdown.Menu size="md">
            <Dropdown.Option align="center" size="sm" as="a" href="/">
              내보내기
            </Dropdown.Option>
            <Dropdown.Option align="center" size="sm">
              나가기
            </Dropdown.Option>
          </Dropdown.Menu>
        </Dropdown>
        <p className="cols-span-2 cols-start-1 tablet:cols-start-2 tablet:cols-span-1 row-start-2 text-xs text-gray-400">
          user@email.com
        </p>
      </div>
    </div>
  );
}
