import { Dropdown } from "@/components/ui";
import Badge from "./badge";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import cn from "@/lib/cn";

const colorStyle =
  "before:absolute before:left-0 before:top-0 before:h-full before:w-3 before:rounded-l-xl before:bg-yellow-400 before:content-['']";

export default function TaskList() {
  return (
    <div
      className={cn(
        "relative mt-[16px] flex h-[40px] w-full items-center justify-between rounded-xl bg-gray-800 pl-6 pr-2",
        colorStyle,
      )}
    >
      <span className="text-sm">공부하기</span>
      <div className="flex items-center">
        <Badge />
        <Dropdown intent="icon">
          <Dropdown.TriggerIcon>
            <IcKebab className="h-4 w-4 text-gray-400" />
          </Dropdown.TriggerIcon>
          <Dropdown.Menu size="md">
            <Dropdown.Option align="center" size="sm" as="a" href="/">
              수정하기
            </Dropdown.Option>
            <Dropdown.Option align="center" size="sm">
              삭제하기
            </Dropdown.Option>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
