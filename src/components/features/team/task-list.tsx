import Link from "next/link";
import cn from "@/lib/cn";
import Badge from "./badge";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import { Dropdown } from "@/components/ui";
import { TodoListProps } from "@/types/group";
import { todoListStyle, TODO_COLORS } from "./team.styles";

export default function TodoList({ groupId, taskList = [] }: TodoListProps) {
  if (!taskList) return null;

  const colorChanger = (id: number) => {
    let colorIndex = id % TODO_COLORS.length;
    return TODO_COLORS[colorIndex];
  };

  const handleSetSession = (id: number, e: React.MouseEvent) => {
    handleEventPrevent(e);
    sessionStorage.setItem("taskListId", String(id));
  };

  const handleEventPrevent = (e: React.MouseEvent) => {
    const isDropdown = (e.target as HTMLElement).closest("[data-dropdown-trigger]");
    if (isDropdown) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="mb-[48px] desktop:mb-[64px]">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <h3 className="inline-block text-[16px]">할 일 목록</h3>
          <span className="text-[16px] text-gray-500">({taskList.length}개)</span>
        </div>
        <Link href="/" className="text-sm text-pink-400">
          + 새로운 목록 추가하기
        </Link>
      </div>
      {taskList &&
        taskList.map(task => (
          <Link
            href={`/team/${groupId}/tasklist/`}
            key={task.id}
            onClick={(e: React.MouseEvent) => handleSetSession(task.id, e)}
          >
            <div className={cn(todoListStyle, colorChanger(task.id))}>
              <span className="text-sm">{task.name}</span>
              <div className="flex items-center">
                <Badge tasks={task.tasks} />
                <div data-dropdown-trigger onClick={(e: React.MouseEvent) => handleEventPrevent(e)}>
                  <Dropdown intent="icon">
                    <Dropdown.TriggerIcon>
                      <IcKebab className="h-4 w-4 text-gray-400" />
                    </Dropdown.TriggerIcon>
                    <Dropdown.Menu size="md" data-dropdown-trigger>
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
            </div>
          </Link>
        ))}
    </section>
  );
}
